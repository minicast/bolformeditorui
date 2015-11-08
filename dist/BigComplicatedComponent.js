// This "complicated" module shouldn't be transitively included in tests --
// it should be replaced with a stub. See tests/CheckboxWithLabel-test.js.
'use strict';

var React = require('react');

var BigComplicatedComponent = React.createClass({
  displayName: 'BigComplicatedComponent',

  render: function render() {
    console.log('Thinking really hard!');
    return React.createElement(
      'div',
      null,
      '42'
    );
  }
});

module.exports = BigComplicatedComponent;