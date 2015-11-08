const DtreePanel = React.createClass({
  displayName: 'DtreePanel',
  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <h3 className="panel-title">
            D3 Tree Data
          </h3>
        </div>
        <div className="panel-body">
          <div id="d3-editor" style={{height: 190 + "px"}}></div>
        </div>
      </div>
    )
  },
  componentDidMount() {
    const ace = require('brace');
    require('brace/mode/json');
    require('brace/theme/tomorrow');

    const d3Editor = ace.edit('d3-editor');
    let des = d3Editor.getSession();
    des.setMode('ace/mode/json');
    d3Editor.setTheme('ace/theme/tomorrow');
    des.setUseWrapMode(true);
    des.setTabSize(2);
    des.setUseSoftTabs(true);
    d3Editor.$blockScrolling = Infinity;

    d3Editor.insert(this.props.string);
  },
  componentDidUpdate: function(prevProps, prevState) {
    const d3Editor = ace.edit('d3-editor');
    d3Editor.setValue('');
    d3Editor.insert(this.props.string);
  }
});

module.exports = DtreePanel;
