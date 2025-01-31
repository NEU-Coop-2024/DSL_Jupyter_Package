import { HighlightStyle, LRLanguage, indentNodeProp, delimitedIndent, foldNodeProp, foldInside, LanguageSupport, syntaxHighlighting } from '@codemirror/language';
import { styleTags, tags } from '@lezer/highlight';
import { parser } from './parser.js'

const langHighlight = styleTags({
    Identifier: tags.variableName,
    String: tags.string,
    Boolean: tags.bool,
    "( )": tags.paren,
    LineComment: tags.lineComment
});

const langHighlightStyle = HighlightStyle.define([
    { tag: tags.variableName, color: "#2689C7" },
    { tag: tags.string, color: "#d90cfe" },
    { tag: tags.bool, color: "#ff8c00" },
    { tag: tags.paren, color: "#ff4500" },
    { tag: tags.lineComment, color: "#808080", fontStyle: 'italic' },
]);

const MyLanguage = LRLanguage.define({
    parser: parser.configure({
        props: [
            indentNodeProp.add({
                Application: delimitedIndent({ closing: ")", align: false }),
            }),
            foldNodeProp.add({
                Application: foldInside,
            }),
            langHighlight,
        ],
    }),
    languageData: {
        commentTokens: { line: ";" },
    },
});

function Lang() {
    return new LanguageSupport(MyLanguage, syntaxHighlighting(langHighlightStyle));
}

export { Lang, MyLanguage };