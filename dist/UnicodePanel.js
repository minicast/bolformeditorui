"use strict";

var UnicodePanel = React.createClass({
  displayName: 'UnicodePanel',
  render: function render() {
    return React.createElement(
      "div",
      { className: "panel panel-default output-scroll", style: { marginTop: 3 + "px" } },
      React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
          "h3",
          { className: "panel-title" },
          "Unicode"
        )
      ),
      React.createElement(
        "div",
        { className: "panel-body", style: { paddingTop: 10 + "px", paddingBottom: 10 + "px", paddingLeft: 5 + "px" } },
        React.createElement("div", { id: "unicode" })
      )
    );
  },
  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    // const unicodeElement = document.getElementById("unicode");
    var unicodeElement = ReactDOM.findDOMNode(this, 'unicode');
    unicodeElement.innerHTML = "";
    unicodeElement.innerHTML = this.props.string;
  },
  componentDidMount: function componentDidMount() {
    var unicodeElement = ReactDOM.findDOMNode(this, 'unicode');
    unicodeElement.innerHTML = "";
    unicodeElement.innerHTML = this.props.string;
  }
});

module.exports = UnicodePanel;