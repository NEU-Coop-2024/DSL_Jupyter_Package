// import { EditorState, Extension } from '@codemirror/state';
import { INotebookTracker } from '@jupyterlab/notebook';
import { Hypl } from 'hypl_syntax';
// import {select} from 'd3';
/**
 * Initialization data for the myextension extension.
 */
const plugin = {
    id: 'myextension:plugin',
    description: 'A JupyterLab extension.',
    autoStart: true,
    requires: [INotebookTracker],
    activate: (app, tracker) => {
        console.log('JupyterLab extension myextension is activated!');
        console.log(Hypl);
        // Don't know how many cells; need to be able to attach syntax
        // highlighting to new cells.
        tracker.widgetAdded.connect((sender, panel) => {
            console.log('doing stuff!!!');
            panel.content.widgets.forEach((cell) => {
                //cell.addClass('hypl');
                console.log(`cell.hasClass('hypl') -> ${cell.hasClass('hypl')}`);
            });
        });
    }
};
export default plugin;
//# sourceMappingURL=index.js.map