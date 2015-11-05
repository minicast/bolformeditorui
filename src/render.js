// var CheckboxWithLabel = require('./CheckboxWithLabel.js');
var FormulaEditor = require('./FormulaEditor.js');

// assumes react-dom is included in the index.html as a <script> (e.g., from cdn)
ReactDOM.render(
  <FormulaEditor name="Editor"/>,
  document.getElementById('container')
);
  // <CheckboxWithLabel/>,
