import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { Hypl } from 'hypl_syntax';
// import {select} from 'd3';

/**
 * Initialization data for the myextension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'myextension:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension myextension is activated!');
    console.log(Hypl);
  }
};

export default plugin;
