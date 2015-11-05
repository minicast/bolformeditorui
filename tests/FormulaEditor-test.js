// // Create a fake global `window` and `document` object:
// require('./testdom')('<html><body></body></html>');
//
// // Replace BigComplicatedComponent.js with a stub component.
// // global.reactModulesToStub = [
//   // 'BigComplicatedComponent.js'
//   // , 'FormulaEditor.js'
//   // , 'CheckboxWithLabel.js'
// // ];
//
// var assert = require('assert');
//
// describe('FormulaEditor', function() {
//   it('displays Formula after initial render', function() {
//     var tea = 'cup of chai';
//     assert.equal(tea, 'cup of chai');
//     //
//     // // var CheckboxWithLabel = require('../src/CheckboxWithLabel');
//     var FormulaEditor = require('../src/FormulaEditor');
//     // // // var React = require('react/addons');
//     var React = require('react');
//     // // // var TestUtils = React.addons.TestUtils;
//     var TestUtils = require('react-addons-test-utils');
//
//
//     //
//     // // Render a checkbox with label in the document
//     // var checkbox = TestUtils.renderIntoDocument(
//       // <CheckboxWithLabel labelOn="On" labelOff="Off" />
//     // );
//     //
//     //
//     // Render a editor with name prop in the document
//     var editor = TestUtils.renderIntoDocument(
//       React.createElement('FormulaEditor', )
//     );
//       // <FormulaEditor name="Editor"/>
//     //   // <FormulaEditor name="Editor"/>
//     //
//     // // Verify that the name is Editor (by default)
//     // var h2 = TestUtils.findRenderedDOMComponentWithTag(
//     var h2 = TestUtils.findAllInRenderedTree(
//     // var h2 = TestUtils.scryRenderedDOMComponentsWithTag(
//       // checkbox, 'h2');
//       editor, 'h2');
//     // // var h1 = h2[0];
//     // // assert.equal(formula.getDOMNode().textContent, 'Off');
//     // // assert.equal(h2[0].textContent, 'Formula');
//     // assert.equal(h2.textContent, 'Formula');
//     // // assert.isDefined(editor);
//
//
//     // // Simulate a click and verify that it is now On
//     // var input = TestUtils.findRenderedDOMComponentWithTag(
//     //   editor, 'input');
//     // TestUtils.Simulate.change(input);
//     // // assert.equal(formula.getDOMNode().textContent, 'On');
//     // assert.equal(formula.textContent, 'On');
//   });
// });
