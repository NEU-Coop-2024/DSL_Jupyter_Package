import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { hypl_syntax } from 'hypl_syntax';
import { EditorState, Extension } from '@codemirror/state';
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { select, selectAll } from "d3";

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-syntax-highlight',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    tracker.widgetAdded.connect((sender, panel: NotebookPanel) => {
      panel.content.model?.cells.changed.connect(() => {
        panel.content.widgets.forEach((cell) => {
          const editor = cell.editor;

          if (editor) {
            const extensions: Extension[] = [
              //yourSyntaxHighlighting(),
              syntaxHighlighting(HighlightStyle.default)
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
