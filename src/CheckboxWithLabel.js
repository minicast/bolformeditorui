// var React = require('react/addons');
var React = require('react');
var BigComplicatedComponent = require('./BigComplicatedComponent.js');
// var FormulaEditor = require('./FormulaEditor.js');

var CheckboxWithLabel = React.createClass({
  getInitialState: function() {
    return { isChecked: false };
  },
  onChange: function() {
    this.setState({isChecked: !this.state.isChecked});
  },
  render: function() {
    return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={this.state.isChecked}
          onChange={this.onChange}
        />
        {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
        <BigComplicatedComponent />
      </label>
    </div>
    );
  }
});
      // <FormulaEditor  name="Editor"/>

module.exports = CheckboxWithLabel;
