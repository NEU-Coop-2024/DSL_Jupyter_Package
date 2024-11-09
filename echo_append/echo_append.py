from IPython.core.magic import Magics, magics_class, cell_magic
from IPython import get_ipython
import graphviz
import datetime
from IPython.display import Image, display
from parsimonious import Grammar
from helical import init
import sys
sys.path.insert(0, '/home/kyang/syntax_highlighting/.venv/src')
from helical.hypl import parser
from helical.hypl.parser import HyPLVisitor
from helical import cgm

init('sqlite', ':memory:', create_db=True)

@magics_class
class EchoMagics(Magics):
    def __init__(self, *args, **kwargs):
        self.echo_string = ""
        super().__init__(*args, **kwargs)

    @cell_magic
    def echo_append(self, line, cell):
        parsed = parser.grammar.parse(cell.strip())
        ast = HyPLVisitor().visit(parsed)

        model = cgm.Model(ast)

        # Create DOT format
        dot_string = "digraph G {\n"

        for node, labels in model.reps.items():
            if labels:
                combined_label = f"{node.to_concrete_syntax()} ({', '.join(labels)})" 
            else :
                combined_label = node
            dot_string += f'    "{node.to_concrete_syntax()}" [label="{combined_label}"];\n'

        for edge in model.edges:
            assert isinstance(edge, cgm.DirectCause)
            dot_string += f'    "{edge.cause}" -> "{edge.effect}";\n'

        dot_string += "}"
        
        # Use graphviz to render the DOT string
        dot = graphviz.Source(dot_string)
        output_filename = dot.render(filename=f'graph', format='png')
        
        # Display the graph image
        display(Image(filename=output_filename))

# Load the magic into the IPython environment
def load_ipython_extension(ipython):
    ipython.register_magics(EchoMagics)
