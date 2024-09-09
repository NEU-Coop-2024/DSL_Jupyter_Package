import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { EditorState, Extension } from '@codemirror/state';
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
    tracker.widgetAdded.connect((sender, panel: NotebookPanel) => {
      panel.content.model?.cells.changed.connect(() => {
        panel.content.widgets.forEach((cell) => {
          const editor = cell.editor;

          if (editor) {
            const extensions: Extension[] = [
              Hypl.syntaxHighlighting,
              Hypl.HyplLanguage
            ];

            const state = EditorState.create({
              doc: editor.model.value.text,
              extensions
            });

            editor.state = state;
          }
        });
      });
    });
  }
};

export default plugin;
