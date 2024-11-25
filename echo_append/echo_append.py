from IPython.core.magic import Magics, magics_class, cell_magic
from IPython import get_ipython
import graphviz
import datetime
from IPython.display import Image, display
from helical.hypl import parser
from helical import cgm, init, hypl

init('sqlite', ':memory:', create_db=True)

@magics_class
class EchoMagics(Magics):
    def __init__(self, *args, **kwargs):
        self.echo_string = ""
        super().__init__(*args, **kwargs)

    @cell_magic
    def echo_append(self, line, cell):
        parsed = parser.grammar.parse(cell.strip())
        program = parser.HyPLVisitor().visit(parsed)
        model = cgm.Model(program)
                
        # Create DOT format
        dot_string = "digraph G {\n"

        
        for node, labels in model.reps.items():
            combined_label = f"{node.to_concrete_syntax()} ({', '.join([l.to_concrete_syntax() for l in labels])})" if labels else node
            dot_string += f'    "{node.to_concrete_syntax()}" [label="{combined_label}"];\n'

        for edge in model.edges:
            dot_string += f'    "{edge.effect.to_concrete_syntax()}" -> "{edge.cause.to_concrete_syntax()}";\n'

        dot_string += "}"
        
        # Use graphviz to render the DOT string
        dot = graphviz.Source(dot_string)
        output_filename = dot.render(filename=f'graph', format='png')
        
        # Display the graph image
        display(Image(filename=output_filename))
        print(f"Graph data: {model}")

# Load the magic into the IPython environment
def load_ipython_extension(ipython):
    ipython.register_magics(EchoMagics)
    






