"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var d3 = require("d3");
var KeyboardPanel = require('./KeyboardPanel');
var LatexPanel = require('./LatexPanel');
var JsonPanel = require('./JsonPanel');
var DtreePanel = require('./DtreePanel');
var UnicodePanel = require('./UnicodePanel');
var bolformula = require("bolformula");
var katex = require('katex');

var TreeKatexStatsPanel = React.createClass({
  displayName: 'TreeKatexStatsPanel',
  render: function render() {
    return React.createElement(
      "div",
      { className: "panel panel-default output-scroll" },
      React.createElement(
        "div",
        { className: "panel-body output-scroll", style: { paddingTop: 10 + "px", paddingBottom: 10 + "px", paddingLeft: 5 + "px" } },
        React.createElement("div", { id: "katex" }),
        React.createElement("div", { id: "statistics", style: { fontSize: 11 + "px", float: "left" } }),
        React.createElement("div", { id: "d3", style: { float: "left" } })
      )
    );
  }
});

var FormulaEditor = React.createClass({
  displayName: 'FormulaEditor',
  getInitialState: function getInitialState() {
    return {
      keyboard: "(\n  ( p > q ^ ~(p & ~q) )\n  ^\n  ~( ( p > q) ^ (~p | q) )\n  >\n  (p & q & r & s) > (p | q | r | s) > (p ^ q ^ r ^ s)\n)",
      // >
      // (p > q > r > s) & (p & q & r & s) | (p | q | r | s)
      // &
      // (~p > q > r > s) & (p & ~q & r & s) | (p & q & ~r & s)
      // |
      // ~(p > q > r > ~s) & ~~(p & q & ~r & s) | ~~~(p & q & r & ~s),
      latex: "latex",
      parsed: "parsed json",
      unicode: "unicode",
      katex: "katex",
      dtree: "dtree",
      depth: "depth",
      branching: "branching"
    };
  },
  render: function render() {
    // <!-- <span style={{color:"blue"}}>Formula {this.props.name}</span> -->
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-xs-4 col-sm-4 col-md-4" },
            React.createElement(KeyboardPanel, { string: this.state.keyboard })
          ),
          React.createElement(
            "div",
            { className: "col-xs-4 col-sm-4col-md-4" },
            React.createElement(LatexPanel, { string: this.state.latex })
          ),
          React.createElement(
            "div",
            { className: "col-xs-4 col-sm-4col-md-4" },
            React.createElement(JsonPanel, { string: this.state.parsed })
          )
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-xs-4 col-sm-4col-md-4" },
            React.createElement(DtreePanel, { string: this.state.dtree }),
            React.createElement(UnicodePanel, { string: this.state.unicode })
          ),
          React.createElement(
            "div",
            { className: "col-xs-8 col-sm-8 col-md-8" },
            React.createElement(TreeKatexStatsPanel, null)
          )
        )
      )
    );
  },
  componentDidMount: function componentDidMount() {
    'use strict';
    var parsed = bolformula.parser.parse(this.state.keyboard);
    var stringPriorityOperators = bolformula.getString(parsed);
    var latexString = bolformula.getLatex(stringPriorityOperators).replace(/\\/g, ' \\').replace(/\{\}/g, ' ');
    var unicodeString = bolformula.getUnicode(stringPriorityOperators).replace(/\(/g, '( ').replace(/\)/g, ' )');
    var jsonString = JSON.stringify(parsed, null, 2);
    var htmlKatex = katex.renderToString(latexString);
    var d3json = bolformula.getD3(parsed);
    var d3String = JSON.stringify(d3json, null, 2);
    var treeDepth = bolformula.getD3depth(parsed);
    var treeLeafs = bolformula.getD3leafs(parsed);
    this.setState({
      unicode: unicodeString,
      latex: latexString,
      parsed: jsonString,
      katex: htmlKatex,
      dtree: d3String,
      depth: treeDepth,
      branching: treeLeafs
    });

    // // latexEditor
    // require('brace/mode/latex');
    // require('brace/theme/katzenmilch');
    // jsonEditor
    // require('brace/mode/json');
    // require('brace/theme/tomorrow');

    // keyboardEditor.session._emit('change');
    // keyboardEditor.getSession()._emit('change');

    // var d3Editor = ace.edit('d3-editor');
    // d3Editor.getSession().setMode('ace/mode/json');
    // d3Editor.setTheme('ace/theme/tomorrow');
    // d3Editor.getSession().setUseWrapMode(true);
    // d3Editor.getSession().setTabSize(2);
    // d3Editor.getSession().setUseSoftTabs(true);
    // d3Editor.$blockScrolling = Infinity;

    // var latexEditor = ace.edit('latex-editor');
    // latexEditor.getSession().setMode('ace/mode/latex');
    // latexEditor.setTheme('ace/theme/katzenmilch');
    // // latexEditor.setPrintMarginColumn(20);
    // latexEditor.getSession().setUseWrapMode(true);
    // latexEditor.getSession().setTabSize(2);
    // latexEditor.getSession().setUseSoftTabs(true);
    // latexEditor.$blockScrolling = Infinity;
    //     latexEditor.insert(
    // `(
    //   (p \\land q)
    //   \\to
    //   (p \\lor q)
    // )`);
  }
});

module.exports = FormulaEditor;

// // avoid running the testwithout 'document' (for now)
// try {
//   var availableDom = document;
// } catch (err) {
//   console.log(err);
// }
// if (availableDom) {
//
// } // if(availableDom)

// var App = React.createClass({
//   render() {
//     console.log("browser");
//     return <h1>Hello world!</h1>;
//   },
// });

// React.render(<App/>, document.getElementById('example'));

// ReactDOM.render(
// 	<FormulaEditor name="Editor" />,
//     // assumes 'index.html' has a <div id="container"></div> (inside <body>)
//     document.getElementById("container")
// );