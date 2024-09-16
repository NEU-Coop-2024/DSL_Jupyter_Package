import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { Hypl } from 'hypl_syntax';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { EditorView, basicSetup } from 'codemirror';
//import { CodeEditor } from '@jupyterlab/codeeditor';

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

    // Attach syntax highlighting to new cells
    tracker.widgetAdded.connect((sender: INotebookTracker, panel: NotebookPanel) => {
      console.log('doing stuff!!!');

      panel.content.widgets.forEach((cell) => {
        console.log("test");
        // const ceEditor: CodeEditor.IEditor | null = cell.editor;
        // if (!ceEditor) {
        //   console.log('No editor found for this cell.');
        //   return;
        // }

        // Ensure the editor host exists before attaching a new EditorView
        const cellEditorHost = document.querySelector(".cm-line");
        if (cellEditorHost) {
          // Create a new EditorView for the cell, using the Hypl syntax highlighting
          new EditorView({
            doc: "",
            extensions: [basicSetup, Hypl()],
            parent: cellEditorHost
          });

          cell.addClass('hypl');
          console.log(`cell.hasClass('hypl') -> ${cell.hasClass('hypl')}`);
          console.log('Added class hypl and attached new EditorView!');
        } else {
          console.log('No cell editor host found.');
        }
      });
    });
  }
};

export default plugin;

// import {
//   JupyterFrontEnd,
//   JupyterFrontEndPlugin
// } from '@jupyterlab/application';
// import { EditorView } from 'codemirror';
// import { ILSPDocumentConnectionManager, ILSPFeatureManager, IWidgetLSPAdapterTracker } from '@jupyterlab/lsp';
// import { EditorAdapter } from '@jupyterlab/lsp';
// //import { Hypl } from 'hypl_syntax';
// import { CodeEditor } from '@jupyterlab/codeeditor';
// import { EditorExtensionRegistry } from '@jupyterlab/codemirror';

// const renamePlugin: JupyterFrontEndPlugin<void> = {
//   id: 'rename-plugin',
//   autoStart: true,
//   requires: [ILSPDocumentConnectionManager, ILSPFeatureManager, IWidgetLSPAdapterTracker],
//   activate: (app: JupyterFrontEnd, connectionManager: ILSPDocumentConnectionManager, featureManager: ILSPFeatureManager, tracker: IWidgetLSPAdapterTracker) => {
//     const FEATURE_ID = "rename_symbol";
//     const extensionFactory: EditorAdapter.ILSPEditorExtensionFactory = {
//       name: FEATURE_ID,
//       factory: (options) => {
//         const { editor, widgetAdapter } = options;

//         // Check if the editor instance belongs to a notebook cell
//         if (widgetAdapter.widget.node.classList.contains('jp-Notebook')) {
//           console.log('Notebook cell editor instance detected.');
//         } else {
//           console.log('Not a notebook cell editor.');
//         }

//         // Get the editor
//         const ceEditor: CodeEditor.IEditor | null = editor.getEditor();
//         if (!ceEditor) {
//           console.log('No CodeEditor instance found.');
//           return null;
//         }

//         // Log to verify the editor instance
//         console.log('CodeMirror instance found:', ceEditor);

//         // Get the associated virtual document of the opened document
//         if (!widgetAdapter.virtualDocument) {
//           console.log('No virtual document associated with this widget.');
//           return null;
//         }

//         // Get the LSP connection of the virtual document.
//         const connection = connectionManager.connections.get(widgetAdapter.virtualDocument.uri);
//         if (!connection || !connection.provides('renameProvider')) {
//           console.log('LSP connection or rename provider not available.');
//           return null;
//         }

//         // Create a CodeMirror extension that listens for double click, gets the
//         // selected code, and makes an LSP request to rename it and prints the results.
//         const ext = EditorView.domEventHandlers({
//           dblclick: (e, view) => {
//             const range = ceEditor.getSelection();
//             const res = connection.clientRequests['textDocument/rename'].request({
//               newName: "test",
//               position: { line: range.start.line, character: range.start.column },
//               textDocument: { uri: widgetAdapter.virtualDocument!.uri }
//             });

//             res.then(value => {
//               console.debug('Rename result:', value);
//             }).catch(e => console.error('Rename request failed:', e));
//           }
//         });

//         // Wrap the CodeMirror extension in the extension registry object.
//         return EditorExtensionRegistry.createImmutableExtension(ext);
//       }
//     }

//     // Register the extension with the LSP feature
//     featureManager.register({
//       id: FEATURE_ID,
//       extensionFactory
//     });
//   }
// };

// export default renamePlugin;


