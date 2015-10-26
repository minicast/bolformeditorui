// Create a fake global `window` and `document` object:
require('./testdom')('<html><body></body></html>');

// Replace BigComplicatedComponent.js with a stub component.
global.reactModulesToStub = [
  'BigComplicatedComponent.js',
  'FormulaEditor.js'
];

var assert = require('assert');

describe('CheckboxWithLabel', function() {
  it('changes the text after click', function() {
    var CheckboxWithLabel = require('../src/CheckboxWithLabel');
    // var React = require('react/addons');
    var React = require('react');
    // var TestUtils = React.addons.TestUtils;
    var TestUtils = require('react-addons-test-utils');

    // Render a checkbox with label in the document
    var checkbox = TestUtils.renderIntoDocument(
      <CheckboxWithLabel labelOn="On" labelOff="Off" />
    );

    // Verify that it's Off by default
    var label = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'label');
    // assert.equal(label.getDOMNode().textContent, 'Off');
    assert.equal(label.textContent, 'Off');

    // Simulate a click and verify that it is now On
    var input = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'input');
    TestUtils.Simulate.change(input);
    // assert.equal(label.getDOMNode().textContent, 'On');
    assert.equal(label.textContent, 'On');
  });
});
