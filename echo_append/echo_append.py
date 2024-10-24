from IPython.core.magic import Magics, magics_class, cell_magic
from parsimonious import Grammar
from IPython import get_ipython

grammar = Grammar("""
prog = decl+ hyp+
decl = var whitespace ":" whitespace "num" whitespace
htype = "(" whitespace ~r"[a-z]+[0-9a-zA-Z_]*" whitespace ")" whitespace
causal = var whitespace "<-" whitespace var whitespace 
hyp = htype causal
var = ~r"[A-Z]+[0-9a-zA-Z_]*"

whitespace = ~r"\s*"
""")

def get_graph(obj):
    graph = {'nodes' : [], 'edges' : []}
    for child in obj.children:
        if child.expr_name == "hyp":
            htype = child.children[0].text
            causal = child.children[1]
            lhs, tos, froms = True, [], []

            for kid in causal.children:
                if kid.text == "<-":
                    lhs = False 
                    continue
                if lhs and kid.expr_name == "var":
                    tos.append(kid.text)
                if not lhs and kid.expr_name == "var":
                    froms.append(kid.text)
            
            for from_node in froms:
                for to_node in tos:
                    graph['edges'].append((from_node, to_node, htype))
        elif child.expr_name == "var":
            graph['nodes'].append(child.text)
        else:
            g = get_graph(child)
            graph['nodes'].extend(g['nodes'])
            graph['edges'].extend(g['edges'])
    return graph

@magics_class
class EchoMagics(Magics):
    def __init__(self, *args, **kwargs):
        self.echo_string = ""
        super().__init__(*args, **kwargs)

    @cell_magic
    def echo_append(self, line, cell):
        parsed = grammar.parse(cell.strip())
        graph_data = get_graph(parsed)

        tikz_code = """\\usetikzlibrary{positioning, fit}\n\\begin{tikzpicture}[>=stealth] """
        
        #create first node
        if graph_data['nodes']:
            first_node = graph_data['nodes'][0]
            tikz_code += f'  \\node[draw, circle] ({first_node}) {{{first_node}}};\n'

            #place all other nodes
            if len(graph_data['nodes']) > 1:
                second_node = graph_data['nodes'][1]
                tikz_code += f'  \\node[draw, circle, below=of {first_node}] ({second_node}) {{{second_node}}};\n'

            for i in range(2, len(graph_data['nodes'])):
                previous_node = graph_data['nodes'][i - 1]
                current_node = graph_data['nodes'][i]
                tikz_code += f'  \\node[draw, circle, right=of {previous_node}] ({current_node}) {{{current_node}}};\n'

        #edges added
        for edge in graph_data['edges']:
            from_node, to_node, htype = edge
            tikz_code += f'  \\draw[->] ({from_node}) -- ({to_node});\n'

        tikz_code += "\\end{tikzpicture}\n\\end{document}"

        #write code to tex file
        tex_filename = "graph_diagram.tex"
        with open(tex_filename, 'w') as tex_file:
            tex_file.write(tikz_code)
        
        #read tex file
        with open(tex_filename, 'r') as tex_file:
            tex_contents = tex_file.read()

        #create new cell and exec code
        new_cell_code = f"%%tikz\n{tex_contents}"
        get_ipython().run_cell(new_cell_code)

# Load the magic into the IPython environment
def load_ipython_extension(ipython):
    ipython.register_magics(EchoMagics)
