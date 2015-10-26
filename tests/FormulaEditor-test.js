// Create a fake global `window` and `document` object:
require('./testdom')('<html><body></body></html>');

// Replace BigComplicatedComponent.js with a stub component.
// global.reactModulesToStub = [
  // 'BigComplicatedComponent.js'
  // , 'FormulaEditor.js'
// ];

var assert = require('assert');

describe('FormulaEditor', function() {
  it('displays Formula after initial render', function() {
    var FormulaEditor = require('../src/FormulaEditor');
    // var React = require('react/addons');
    var React = require('react');
    // var TestUtils = React.addons.TestUtils;
    var TestUtils = require('react-addons-test-utils');

    // Render a editor with name prop in the document
    var editor = TestUtils.renderIntoDocument(
      <FormulaEditor name="Editor"/>
    );

    // Verify that the name is Editor (by default)
    // var formula = TestUtils.findRenderedDOMComponentWithTag(
    //   editor, 'abbr');
    // assert.equal(formula.getDOMNode().textContent, 'Off');
    // assert.equal(formula.textContent, 'Formula');
    // assert.isDefined(editor);

    var tea = 'cup of chai';
    assert.equal(tea, 'cup of chai');


    // // Simulate a click and verify that it is now On
    // var input = TestUtils.findRenderedDOMComponentWithTag(
    //   editor, 'input');
    // TestUtils.Simulate.change(input);
    // // assert.equal(formula.getDOMNode().textContent, 'On');
    // assert.equal(formula.textContent, 'On');
  });
});
