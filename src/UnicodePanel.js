const UnicodePanel = React.createClass({
  displayName: 'UnicodePanel',
  render() {
    return (
      <div className="panel panel-default output-scroll" style={{marginTop: 3 +"px"}}>
        <div className="panel-heading">
          <h3 className="panel-title">
            Unicode
          </h3>
        </div>
        <div className="panel-body" style={{paddingTop: 10 +"px", paddingBottom: 10 + "px", paddingLeft: 5 +"px"}}>
          <div id="unicode"></div>
        </div>
      </div>
    )
  },
  componentDidUpdate: function(prevProps, prevState) {
    // const unicodeElement = document.getElementById("unicode");
    const unicodeElement = ReactDOM.findDOMNode(this, 'unicode');
    unicodeElement.innerHTML = "";
    unicodeElement.innerHTML = this.props.string;
  },
  componentDidMount: function() {
    const unicodeElement = ReactDOM.findDOMNode(this, 'unicode');
    unicodeElement.innerHTML = "";
    unicodeElement.innerHTML = this.props.string;
  },
});

module.exports = UnicodePanel;
