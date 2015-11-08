"use strict";

var LatexPanel = React.createClass({
  displayName: 'LatexPanel',
  render: function render() {
    return React.createElement(
      "div",
      { className: "panel panel-default" },
      React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
          "h3",
          { className: "panel-title" },
          "LaTeX"
        )
      ),
      React.createElement(
        "div",
        { className: "panel-body" },
        React.createElement("div", { id: "latex-editor", style: { height: 190 + "px" } })
      )
    );
  },
  componentDidMount: function componentDidMount() {
    var ace = require('brace');
    require('brace/mode/latex');
    require('brace/theme/katzenmilch');

    var latexEditor = ace.edit('latex-editor');

    var les = latexEditor.getSession();
    les.setMode('ace/mode/latex');
    latexEditor.setTheme('ace/theme/katzenmilch');
    // latexEditor.setPrintMarginColumn(20);
    les.setUseWrapMode(true);
    les.setTabSize(2);
    les.setUseSoftTabs(true);
    latexEditor.$blockScrolling = Infinity;

    latexEditor.insert(this.props.string);
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var latexEditor = ace.edit('latex-editor');
    latexEditor.setValue('');
    latexEditor.insert(this.props.string);
  }

});

module.exports = LatexPanel;