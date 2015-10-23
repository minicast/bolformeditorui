"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var React = require("react");
var ReactDOM = require("react-dom");
var d3 = require("d3");

// avoid running the testwithout 'document' (for now)
try {
  var availableDom = document;
} catch (err) {
  console.log(err);
}

if (availableDom) {

  var FormulaEditor = React.createClass({
    displayName: "FormulaEditor",

    render: function render() {
      return React.createElement(
        "div",
        null,
        "Formula ",
        this.props.name
      );
    }
  });

  ReactDOM.render(React.createElement(FormulaEditor, { name: "Editor" }),
  // assumes 'index.html' has a <div id="container"></div> (inside <body>)
  document.getElementById("container"));

  // var App = React.createClass({
  //   render() {
  //     console.log("browser");
  //     return <h1>Hello world!</h1>;
  //   },
  // });
  //
  // React.render(<App/>, document.getElementById('example'));

  var ace = require('brace');
  // keyboardEditor
  require('brace/mode/livescript');
  require('brace/theme/solarized_light');
  // latexEditor
  require('brace/mode/latex');
  require('brace/theme/katzenmilch');
  // jsonEditor
  require('brace/mode/json');
  require('brace/theme/tomorrow');

  var katex = require('katex');
  var bolformula = require("bolformula");

  var keyboardEditor = ace.edit('keyboard-editor');
  var kes = keyboardEditor.getSession();
  kes.setMode('ace/mode/livescript');
  keyboardEditor.setTheme('ace/theme/solarized_light');
  kes.setUseWrapMode(true);
  kes.setTabSize(2);
  kes.setUseSoftTabs(true);
  keyboardEditor.setShowPrintMargin(true);
  keyboardEditor.$blockScrolling = Infinity;
  keyboardEditor.getSession().on('change', function (e) {
    // console.log(e);
    // e.type, etc
    var keyString = keyboardEditor.getValue();
    try {
      var keyParsed = bolformula.parser.parse(keyString);
    } catch (err) {
      var pnl = document.querySelector('.panel');
      pnl.classList.remove('panel-default');
      pnl.classList.add('panel-danger');
      // el.classList.toggle('nav--active');
      console.log(err);
    }

    if (keyParsed) {
      var update = function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse();
        var links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) {
          d.y = d.depth * 70;
        });

        // Declare the nodes…
        var node = svg.selectAll("g.node").data(nodes, function (d) {
          return d.id || (d.id = ++i);
        });

        // Enter the nodes.
        var nodeEnter = node.enter().append("g").attr("class", "node").attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

        // nodeEnter.append("circle")
        //   .attr("r", 10)
        //   .style("stroke", "steelblue")
        //   .style("stroke-width", "3px")
        //   .style("fill", "#fff");

        nodeEnter.append("text").attr("y", function (d) {
          // return d.children || d._children ? -18 : 18;
          return 0;
        }).attr("dy", ".35em").attr("text-anchor", "middle").text(function (d) {
          return d.content;
        }).style("fill-opacity", 1).style("font", "12px sans-serif");

        // Declare the links…
        var link = svg.selectAll("path.link").data(links, function (d) {
          return d.target.id;
        });

        // node.transition().duration(1000).remove();
        node.exit().remove();

        // Enter the links.
        link.enter().insert("path", "g").attr("class", "link").attr("d", diagonal).style("fill", "none").style("stroke", "#ccc").style("stroke-width", "2px");

        // link.transition().duration(1000).remove();
        link.exit().remove();
      }

      // componentWillUpdate: function(nextProps) {
      //         var el = this.getDOMNode(); // This is de div we are rendering
      //         d3.select(el.svg).selectAll("*").remove();
      //         this.updateTree(nextProps);
      //     },

      // getDefaultProps: function() {
      //     return {
      //         width: 340,
      //         height: 280
      //     };
      // },

      // render: function() {
      //     return (
      //         <div className="tree"></div>
      //     );
      // }

      ;

      var pnl = document.querySelector('.panel');
      pnl.classList.remove('panel-danger');
      pnl.classList.add('panel-success');

      var katexElement = document.getElementById("katex");
      var stringPriorityOperators = bolformula.getString(keyParsed);
      var latexString = bolformula.getLatex(stringPriorityOperators).replace(/\\/g, ' \\').replace(/\{\}/g, ' ');

      // this assumes the KaTeX css file is available on the page
      // katex.render(latexString, katexElement);
      var htmlKatex = katex.renderToString(latexString);
      katexElement.innerHTML = htmlKatex;
      // returns <span class="katex"> ... result ... </span>

      var unicodeString = bolformula.getUnicode(stringPriorityOperators).replace(/\(/g, ' (').replace(/\)/g, ') ');
      var unicodeElement = document.getElementById("unicode");
      unicodeElement.innerHTML = "";
      unicodeElement.innerHTML = unicodeString;

      latexEditor.setValue('');
      latexEditor.insert(latexString);

      var jsonString = JSON.stringify(keyParsed, null, 2);
      jsonEditor.setValue('');
      jsonEditor.insert(jsonString);

      var d3json = bolformula.getD3(keyParsed);
      // var tree = d3json || "{}";
      // console.log(JSON.parse(tree));
      // Session.set("tree", [tree]);

      // console.log(d3json);

      var treeData = [d3json];
      // var treeData = props.data;
      // console.log(treeData);

      // componentDidMount: function() {
      // var el = this.getDOMNode(); // This is de div we are rendering
      var el = document.getElementById("d3");

      var svg = d3.select(el).insert("svg")
      // .attr("width", this.props.width )
      .attr("width", 1200)
      // .attr("height", this.props.height );
      .attr("height", 1200);

      // this.updateTree(this.props);
      // this.updateTree(this.props);
      // },

      var margin = { top: 5, right: 5, bottom: 5, left: 5 };
      var width = 1200 - margin.right - margin.left; // this.props.width - margin.right - margin.left;
      var height = 1200 - margin.top - margin.bottom; //this.props.height - margin.top - margin.bottom;

      // ************** Generate the tree diagram	 *****************
      var i = 0;

      var tree = d3.layout.tree().size([width, height]);

      var diagonal = d3.svg.diagonal().projection(function (d) {
        return [d.x, d.y];
      });

      d3.select("svg").selectAll("*").remove();

      var svg = d3.select("svg")
      // .append("g")
      .insert("g").attr("width", width).attr("height", height).attr("transform", "translate(" + (margin.left + margin.left) + "," + (margin.top + margin.bottom + 15) + ")");

      var root = treeData[0];

      update(root);
    }
  });

  var latexEditor = ace.edit('latex-editor');
  latexEditor.getSession().setMode('ace/mode/latex');
  latexEditor.setTheme('ace/theme/katzenmilch');
  // latexEditor.setPrintMarginColumn(20);
  latexEditor.getSession().setUseWrapMode(true);
  latexEditor.getSession().setTabSize(2);
  latexEditor.getSession().setUseSoftTabs(true);
  latexEditor.$blockScrolling = Infinity;
  //   latexEditor.insert(
  // `(
  //   (p \\land q)
  //   \\to
  //   (p \\lor q)
  // )`);

  var jsonEditor = ace.edit('json-editor');
  jsonEditor.getSession().setMode('ace/mode/json');
  jsonEditor.setTheme('ace/theme/tomorrow');
  jsonEditor.getSession().setUseWrapMode(true);
  jsonEditor.getSession().setTabSize(2);
  jsonEditor.getSession().setUseSoftTabs(true);
  jsonEditor.$blockScrolling = Infinity;
  //   jsonEditor.insert(
  // `{
  //   "junctor": "&",
  //   "left": "p",
  //   "right": "q"
  // }`);
  // keyboardEditor.session._emit('change');
  // keyboardEditor.getSession()._emit('change');
  keyboardEditor.insert("(\n  (p & q & r & s) > (p | q | r | s) > (p ^ q ^ r ^ s)\n  >\n  (p > q > r > s) & (p & q & r & s) | (p | q | r | s)\n  &\n  (~p > q > r > s) & (p & ~q & r & s) | (p & q & ~r & s)\n  |\n  ~(p > q > r > ~s) & ~~(p & q & ~r & s) | ~~~(p & q & r & ~s)\n)");
} // else !document