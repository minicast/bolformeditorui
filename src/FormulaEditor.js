var React = require("react");
var ReactDOM = require("react-dom");
var d3 = require("d3");
const KeyboardPanel = require('./KeyboardPanel');
const LatexPanel = require('./LatexPanel');
const JsonPanel = require('./JsonPanel');
const DtreePanel = require('./DtreePanel');
const UnicodePanel = require('./UnicodePanel');
const bolformula = require("bolformula");
const katex = require('katex');

const TreeKatexStatsPanel = React.createClass({
  displayName: 'TreeKatexStatsPanel',
  render() {
    return (
      <div className="panel panel-default output-scroll">
        <div className="panel-body output-scroll" style={{paddingTop: 10 + "px", paddingBottom: 10 + "px", paddingLeft: 5 + "px"}}>
          <div id="katex"></div>
          <div id="statistics" style={{fontSize: 11 + "px", float: "left"}}></div>
          <div id="d3" style={{float: "left"}}></div>
        </div>
      </div>
    )
  }
});

var FormulaEditor = React.createClass({
  displayName: 'FormulaEditor',
  getInitialState() {
    return {
      keyboard:
`(
  ( p > q ^ ~(p & ~q) )
  ^
  ~( ( p > q) ^ (~p | q) )
  >
  (p & q & r & s) > (p | q | r | s) > (p ^ q ^ r ^ s)
)`,
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
    }
  },
  render: function() {
      // <!-- <span style={{color:"blue"}}>Formula {this.props.name}</span> -->
    return (<div>
      <div className="container">
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4">
            <KeyboardPanel string={this.state.keyboard} />
          </div>
          <div className="col-xs-4 col-sm-4col-md-4">
            <LatexPanel string={this.state.latex} />
          </div>
          <div className="col-xs-4 col-sm-4col-md-4">
            <JsonPanel string={this.state.parsed} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-4 col-sm-4col-md-4">
            <DtreePanel string={this.state.dtree} />
            <UnicodePanel string={this.state.unicode} />
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8">
            <TreeKatexStatsPanel />
          </div>
        </div>
      </div>
    </div>
    )
  },
  componentDidMount() {
    'use strict';
    const parsed = bolformula.parser.parse(this.state.keyboard);
    const stringPriorityOperators = bolformula.getString(parsed);
    const latexString = bolformula.getLatex(stringPriorityOperators)
      .replace(/\\/g,' \\')
      .replace(/\{\}/g,' ');
    const unicodeString = bolformula.getUnicode(stringPriorityOperators)
      .replace(/\(/g,'( ')
      .replace(/\)/g,' )');
    const jsonString = JSON.stringify(parsed, null, 2);
    const htmlKatex = katex.renderToString(latexString);
    const d3json = bolformula.getD3(parsed);
    const d3String = JSON.stringify(d3json, null, 2);
    const treeDepth = bolformula.getD3depth(parsed);
    const treeLeafs = bolformula.getD3leafs(parsed);
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
