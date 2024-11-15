import { Hypl } from 'hypl_syntax';
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  EditorExtensionRegistry,
  IEditorExtensionRegistry
} from '@jupyterlab/codemirror';


/**
 * Initialization data for the @jupyterlab-examples/codemirror-extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@jupyterlab-examples/codemirror-extension:plugin',
  description: 'A minimal JupyterLab extension adding a CodeMirror extension.',
  autoStart: true,
  requires: [IEditorExtensionRegistry],
  activate: (app: JupyterFrontEnd, extensions: IEditorExtensionRegistry) => {
    // Register a new editor configurable extension
    extensions.addExtension(
      Object.freeze({
        name: 'hypl_syntax',
        factory: () =>
          // The factory will be called for every new CodeMirror editor
          EditorExtensionRegistry.createConfigurableExtension(() =>
            Hypl()
          ),
      })
    );
  }
};

export default plugin;






