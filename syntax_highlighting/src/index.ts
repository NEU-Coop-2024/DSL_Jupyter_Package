import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the syntax_highlighting extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'syntax_highlighting:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension syntax_highlighting is activated!');
  }
};

export default plugin;
