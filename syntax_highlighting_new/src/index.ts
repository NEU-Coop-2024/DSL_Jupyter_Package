import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
// import { EditorState, Extension } from '@codemirror/state';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { Hypl } from 'hypl_syntax';
// import {select} from 'd3';

/**
 * Initialization data for the myextension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'myextension:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    console.log('JupyterLab extension myextension is activated!');
    console.log(Hypl);
    // Don't know how many cells; need to be able to attach syntax
    // highlighting to new cells.
    tracker.widgetAdded.connect((sender : INotebookTracker, panel: NotebookPanel) => {
      console.log('doing stuff!!!');
      panel.content.widgets.forEach((cell) => cell.addClass('hypl'));
      return true;
    });
  }
}

export default plugin;
