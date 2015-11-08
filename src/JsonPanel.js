const JsonPanel = React.createClass({
  displayName: 'JsonPanel',
  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            JSON
          </h3>
        </div>
        <div className="panel-body">
          <div id="json-editor" style={{height: 190 + "px"}}></div>
        </div>
      </div>
    )
  },
  componentDidMount() {
    const ace = require('brace');
    require('brace/mode/json');
    require('brace/theme/tomorrow');

    const jsonEditor = ace.edit('json-editor');
    let jes = jsonEditor.getSession()
    jes.setMode('ace/mode/json');
    jsonEditor.setTheme('ace/theme/tomorrow');
    jes.setUseWrapMode(true);
    jes.setTabSize(2);
    jes.setUseSoftTabs(true);
    jsonEditor.$blockScrolling = Infinity;

    jsonEditor.insert(this.props.string);
  },
  componentDidUpdate: function(prevProps, prevState) {
    const jsonEditor = ace.edit('json-editor');
    jsonEditor.setValue('');
    jsonEditor.insert(this.props.string);
  }
});

module.exports = JsonPanel;
