from IPython.core.magic import Magics, magics_class, cell_magic
from IPython import get_ipython
import graphviz
import datetime
from IPython.display import Image, display
from parsimonious import Grammar

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
        
        # Create DOT format
        dot_string = "digraph G {\n"

        node_labels = {node: [] for node in graph_data['nodes']}

        for edge in graph_data['edges']:
            node_labels[edge[0]].append(edge[2])  

        for node, labels in node_labels.items():
            combined_label = f"{node} ({', '.join(labels)})" if labels else node
            dot_string += f'    "{node}" [label="{combined_label}"];\n'

        for edge in graph_data['edges']:
            dot_string += f'    "{edge[0]}" -> "{edge[1]}";\n'

        dot_string += "}"
        
        # Use graphviz to render the DOT string
        dot = graphviz.Source(dot_string)
        output_filename = dot.render(filename=f'graph', format='png')
        
        # Display the graph image
        display(Image(filename=output_filename))
        print(f"Graph data: {graph_data}")

# Load the magic into the IPython environment
def load_ipython_extension(ipython):
    ipython.register_magics(EchoMagics)
