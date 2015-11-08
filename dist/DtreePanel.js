"use strict";

var DtreePanel = React.createClass({
  displayName: 'DtreePanel',
  render: function render() {
    return React.createElement(
      "div",
      { className: "panel panel-info" },
      React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
          "h3",
          { className: "panel-title" },
          "D3 Tree Data"
        )
      ),
      React.createElement(
        "div",
        { className: "panel-body" },
        React.createElement("div", { id: "d3-editor", style: { height: 190 + "px" } })
      )
    );
  },
  componentDidMount: function componentDidMount() {
    var ace = require('brace');
    require('brace/mode/json');
    require('brace/theme/tomorrow');

    var d3Editor = ace.edit('d3-editor');
    var des = d3Editor.getSession();
    des.setMode('ace/mode/json');
    d3Editor.setTheme('ace/theme/tomorrow');
    des.setUseWrapMode(true);
    des.setTabSize(2);
    des.setUseSoftTabs(true);
    d3Editor.$blockScrolling = Infinity;

    d3Editor.insert(this.props.string);
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var d3Editor = ace.edit('d3-editor');
    d3Editor.setValue('');
    d3Editor.insert(this.props.string);
  }
});

module.exports = DtreePanel;