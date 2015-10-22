var React = require("react");
var ReactDOM = require("react-dom");

var FormulaEditor = React.createClass({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});

ReactDOM.render(
	<FormulaEditor name="World" />,
    // assumes 'index.html' has a <div id="container"></div> (inside <body>)
    document.getElementById("container")
);


// var App = React.createClass({
//   render() {
//     console.log("browser");
//     return <h1>Hello world!</h1>;
//   },
// });
//
// React.render(<App/>, document.getElementById('example'));
