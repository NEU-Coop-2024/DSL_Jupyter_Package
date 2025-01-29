from IPython.core.magic import Magics, magics_class, cell_magic
from IPython import get_ipython

@magics_class
class CellMagics(Magics):
    def __init__(self, *args, **kwargs):
        self.echo_string = ""
        super().__init__(*args, **kwargs)

    @cell_magic
    def cell_magic(self, line, cell):
        print("hello world")
                

# Load the magic into the IPython environment
def load_ipython_extension(ipython):
    ipython.register_magics(CellMagics)
    






