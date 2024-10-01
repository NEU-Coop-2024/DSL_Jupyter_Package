from IPython.core.magic import Magics, magics_class, cell_magic
from IPython import get_ipython
import graphviz
import datetime
from IPython.display import Image, display


@magics_class
class EchoMagics(Magics):
    def __init__(self, *args, **kwargs):
        self.echo_string = ""
        super().__init__(*args, **kwargs)

    @cell_magic
    def echo_append(self, line, cell):

        dot = graphviz.Source(cell)
        output_filename = dot.render(filename=f'graph_{datetime.datetime.now().strftime("%Y%m%d_%H%M%S")}', format='png')
        
        display(Image(filename=output_filename))
        print("Success!")
        


def load_ipython_extension(ipython):
    ipython.register_magics(EchoMagics)




