"use strict";

var JsonPanel = React.createClass({
  displayName: 'JsonPanel',
  render: function render() {
    return React.createElement(
      "div",
      { className: "panel panel-warning" },
      React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
          "h3",
          { className: "panel-title" },
          "JSON"
        )
      ),
      React.createElement(
        "div",
        { className: "panel-body" },
        React.createElement("div", { id: "json-editor", style: { height: 190 + "px" } })
      )
    );
  },
  componentDidMount: function componentDidMount() {
    var ace = require('brace');
    require('brace/mode/json');
    require('brace/theme/tomorrow');

    var jsonEditor = ace.edit('json-editor');
    var jes = jsonEditor.getSession();
    jes.setMode('ace/mode/json');
    jsonEditor.setTheme('ace/theme/tomorrow');
    jes.setUseWrapMode(true);
    jes.setTabSize(2);
    jes.setUseSoftTabs(true);
    jsonEditor.$blockScrolling = Infinity;

    jsonEditor.insert(this.props.string);
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var jsonEditor = ace.edit('json-editor');
    jsonEditor.setValue('');
    jsonEditor.insert(this.props.string);
  }
});

module.exports = JsonPanel;