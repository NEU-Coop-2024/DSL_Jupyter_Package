import { Extension, Compartment } from "@codemirror/state";
import { JupyterFrontEnd, JupyterFrontEndPlugin } from "@jupyterlab/application";
import { EditorExtensionRegistry, IEditorExtensionRegistry } from "@jupyterlab/codemirror";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { Hypl } from "hypl_syntax";

const languageConf = new Compartment();

const autoLanguage = EditorState.transactionExtender.of((tr) => {
  if (!tr.docChanged) return null;
  const docIsHypl = /^\s*%%echo_append/.test(tr.newDoc.sliceString(0, 100)); // checking for magic
  return {
    effects: languageConf.reconfigure(docIsHypl ? Hypl() : python()), // choose hypl or python based on cell magic
  };
});


function hyplSyntaxExtension(): Extension {
  return [languageConf.of(python()), autoLanguage];
}

/**
 * Initialization data for the @jupyterlab-examples/codemirror-extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: "@jupyterlab-examples/codemirror-extension:plugin",
  description: "A JupyterLab extension adding Hypl syntax highlighting.",
  autoStart: true,
  requires: [IEditorExtensionRegistry],
  activate: (app: JupyterFrontEnd, extensions: IEditorExtensionRegistry) => {
    // Register the editor extension
    extensions.addExtension(
      Object.freeze({
        name: "hypl_syntax",
        factory: () =>
          // The factory is called for every new CodeMirror editor
          EditorExtensionRegistry.createConfigurableExtension(() => hyplSyntaxExtension())
      })
    );
  },
};

export default plugin;
