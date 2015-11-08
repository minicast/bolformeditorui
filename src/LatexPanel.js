const LatexPanel = React.createClass({
  displayName: 'LatexPanel',
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            LaTeX
          </h3>
        </div>
        <div className="panel-body">
          <div id="latex-editor" style={{height: 190 + "px"}}></div>
        </div>
      </div>
    )
  },
  componentDidMount() {
    const ace = require('brace');
    require('brace/mode/latex');
    require('brace/theme/katzenmilch');

    const latexEditor = ace.edit('latex-editor');

    let les = latexEditor.getSession();
    les.setMode('ace/mode/latex');
    latexEditor.setTheme('ace/theme/katzenmilch');
    // latexEditor.setPrintMarginColumn(20);
    les.setUseWrapMode(true);
    les.setTabSize(2);
    les.setUseSoftTabs(true);
    latexEditor.$blockScrolling = Infinity;

    latexEditor.insert(this.props.string);
  },
  componentDidUpdate: function(prevProps, prevState) {
    const latexEditor = ace.edit('latex-editor');
    latexEditor.setValue('');
    latexEditor.insert(this.props.string);
  }

});

module.exports = LatexPanel;
