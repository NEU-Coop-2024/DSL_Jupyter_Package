import { HighlightStyle, LRLanguage, indentNodeProp, delimitedIndent, foldNodeProp, foldInside, LanguageSupport, syntaxHighlighting } from '@codemirror/language';
import { styleTags, tags } from '@lezer/highlight';
import { LRParser } from "@lezer/lr"

export const parser = LRParser.deserialize({
    version: 14,
    states: "!WQYQPOOOhQPO'#CdOOQO'#Ci'#CiOOQO'#Ce'#CeQYQPOOOOQO,59O,59OOyQPO,59OOOQO-E6c-E6cOOQO1G.j1G.j",
    stateData: "![~O[OSPOS~ORQOSQOTQOVPO~ORQOSQOTQOUTOVPO~ORQOSQOTQOUWOVPO~O",
    goto: "u^PPPPPPPP_ePPPoXQOPSUQSOQUPTVSUXROPSU",
    nodeNames: "⚠ LineComment Program Identifier String Boolean ) ( Application",
    maxTerm: 13,
    nodeProps: [
        ["openedBy", 6, "("],
        ["closedBy", 7, ")"]
    ],
    skippedNodes: [0, 1],
    repeatNodeCount: 1,
    tokenData: "%c~R^XY}YZ}]^}pq}rs!`st#|xy$[yz$a}!O$f!Q![$f!]!^$z!c!}$f#R#S$f#T#o$f~!SS[~XY}YZ}]^}pq}~!cVOr!`rs!xs#O!`#O#P!}#P;'S!`;'S;=`#v<%lO!`~!}OS~~#QRO;'S!`;'S;=`#Z;=`O!`~#^WOr!`rs!xs#O!`#O#P!}#P;'S!`;'S;=`#v;=`<%l!`<%lO!`~#yP;=`<%l!`~$PQ#Y#Z$V#h#i$V~$[OT~~$aOV~~$fOU~~$kTR~}!O$f!Q![$f!c!}$f#R#S$f#T#o$f~%PSP~OY$zZ;'S$z;'S;=`%]<%lO$z~%`P;=`<%l$z",
    tokenizers: [0],
    topRules: { "Program": [0, 2] },
    tokenPrec: 0
})

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