"use strict";
(self["webpackChunkmyextension"] = self["webpackChunkmyextension"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var hypl_syntax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hypl_syntax */ "webpack/sharing/consume/default/hypl_syntax/hypl_syntax");
/* harmony import */ var hypl_syntax__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hypl_syntax__WEBPACK_IMPORTED_MODULE_1__);
// import { EditorState, Extension } from '@codemirror/state';


// import {select} from 'd3';
/**
 * Initialization data for the myextension extension.
 */
const plugin = {
    id: 'myextension:plugin',
    description: 'A JupyterLab extension.',
    autoStart: true,
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.INotebookTracker],
    activate: (app, tracker) => {
        console.log('JupyterLab extension myextension is activated!');
        console.log(hypl_syntax__WEBPACK_IMPORTED_MODULE_1__.Hypl);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.68a3f59ff0b281806293.js.map