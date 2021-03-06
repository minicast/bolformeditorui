const KeyboardPanel = React.createClass({
  displayName: 'KeyboardPanel',
  render() {
    return (
      <div className="panel panel-default" id="panel">
        <div className="panel-heading">
          <h3 className="panel-title">
            Keyboard
          </h3>
        </div>
        <div className="panel-body">
          <div id="keyboard-editor" style={{height: 190 + "px"}}></div>
        </div>
      </div>
    )
  },
  componentDidMount: function() {
    var ace = require('brace');
    require('brace/mode/livescript');
    require('brace/theme/solarized_light');

    var katex = require('katex');
    var bolformula = require("bolformula");

    var keyboardEditor = ace.edit('keyboard-editor');
    let kes = keyboardEditor.getSession();
    kes.setMode('ace/mode/livescript');
    keyboardEditor.setTheme('ace/theme/solarized_light');
    kes.setUseWrapMode(true);
    kes.setTabSize(2);
    kes.setUseSoftTabs(true);
    keyboardEditor.setShowPrintMargin(true);
    keyboardEditor.$blockScrolling = Infinity;


    keyboardEditor.getSession().on('change', function(e) {
      // console.log(e);
      // e.type, etc
      var keyString = keyboardEditor.getValue();
      try {
        var keyParsed = bolformula.parser.parse(keyString);
      } catch (err) {
        // const pnl = ReactDOM.findDOMNode('KeyboardPanel', 'panel');
        var pnl = document.querySelector('.panel');
        pnl.classList.remove('panel-default');
        pnl.classList.add('panel-danger');
        // el.classList.toggle('nav--active');
        console.log(err);
      }

      if (keyParsed) {

        var pnl = document.querySelector('.panel');
        pnl.classList.remove('panel-danger');
        pnl.classList.add('panel-success');


        // const katexElement = ReactDOM.findDOMNode(this, 'katex');
        var katexElement = document.getElementById("katex");
        var stringPriorityOperators = bolformula.getString(keyParsed);
        var latexString = bolformula.getLatex(stringPriorityOperators)
          .replace(/\\/g,' \\')
          .replace(/\{\}/g,' ');

        // this assumes the KaTeX css file is available on the page
        // katex.render(latexString, katexElement);
        var htmlKatex = katex.renderToString(latexString);
        katexElement.innerHTML = htmlKatex;
        // returns <span className="katex"> ... result ... </span>


        var unicodeString = bolformula.getUnicode(stringPriorityOperators)
          .replace(/\(/g,'( ')
          .replace(/\)/g,' )')
        // var unicodeElement = document.getElementById("unicode");
        // unicodeElement.innerHTML = "";
        // unicodeElement.innerHTML = unicodeString;
        // this.setState({unicode: unicodeString});



        // latexEditor.setValue('');
        // latexEditor.insert(latexString);
        // this.state.latex = latexString;

        var jsonString = JSON.stringify(keyParsed, null, 2);
        // jsonEditor.setValue('');
        // jsonEditor.insert(jsonString);



        var d3json = bolformula.getD3(keyParsed);
        // var tree = d3json || "{}";
        // console.log(JSON.parse(tree));
        // Session.set("tree", [tree]);

        var d3String = JSON.stringify(d3json, null, 2);
        // d3Editor.setValue('');
        // d3Editor.insert(d3String);

        // console.log(d3json);

        var treeData = d3json;
        // var treeData = props.data;
        // console.log(treeData);

        var treeLeafs = bolformula.getD3leafs(keyParsed);
        var leafWidth = 40;
        var svgWidth = treeLeafs * leafWidth;

        var treeDepth = bolformula.getD3depth(keyParsed);
        var edgeDepth = 40;
        var svgHeight = treeDepth * edgeDepth;

        var el = document.getElementById("statistics");
        el.innerHTML = 'syntax tree depth: ' + treeDepth + ' &nbsp; &nbsp; ' + 'syntax tree branching factor: ' + treeLeafs;

      // componentDidMount: function() {
        // var el = this.getDOMNode(); // This is de div we are rendering
        var el = document.getElementById("d3");

        // d3.select("svg").selectAll("*").remove();
        d3.select("svg").remove();

        var svg = d3.select(el)
            .insert("svg")
            // .attr("width", this.props.width )
            .attr("width", svgWidth) // 500
            // .attr("height", this.props.height );
            .attr("height", svgHeight ); // 350

            // this.updateTree(this.props);
            // this.updateTree(this.props);
      // },

        var margin = { top: 5, right: 5, bottom: 5, left: 5 };
        var width = svgWidth - margin.right - margin.left; // this.props.width - margin.right - margin.left;
        var height = svgHeight - margin.top - margin.bottom; //this.props.height - margin.top - margin.bottom;

        // ************** Generate the tree diagram	 *****************
        var i = 0;

        var tree = d3.layout.tree()
          .size([width, height]);

        var diagonal = d3.svg
          .diagonal()
          .projection(function(d) {
            return [d.x, d.y];
          });

        var svg = d3.select("svg")
          // .append("g")
          .insert("g")
          .attr("width", width )
          .attr("height", height )
          .attr("transform",
            `translate(${margin.left + margin.left},${margin.top + margin.bottom + 10})`
          );

        var root = treeData[0];

        update(root);

        function update(source) {

          // Compute the new tree layout.
          var nodes = tree.nodes(root).reverse();
          var links = tree.links(nodes);

          // Normalize for fixed-depth.
          nodes.forEach(function(d) {
            // d.y = d.depth * 50;
            d.y = d.depth * edgeDepth;
          });

          // Declare the nodes…
          var node = svg
            .selectAll("g.node")
            .data(nodes, function(d) {
              return d.id || (d.id = ++i);
            });

          // Enter the nodes.
          var nodeEnter = node.enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
              return "translate(" + d.x + "," + d.y + ")";
            });

          // nodeEnter.append("circle")
          //   .attr("r", 10)
          //   .style("stroke", "steelblue")
          //   .style("stroke-width", "3px")
          //   .style("fill", "#fff");

          nodeEnter
            .append("text")
            .attr("y", function(d) {
              // return d.children || d._children ? -18 : 18;
              return 0;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function(d) {
              return d.content;
            })
            .style("fill-opacity", 1)
            .style("font", "12px sans-serif");


          nodeEnter
            .append("rect")
            .attr("width", function(d) {
              if (this.previousElementSibling.clientWidth) {
                return this.previousElementSibling.clientWidth + 10;
              } else { //firefox (gecko-based browsers) & edge (all ie-brosers) have clientWidth 0
                return this.previousElementSibling.childNodes[0].length * 5 + 10;
              }
            })
            .attr('height', function() {
              if (this.previousElementSibling.clientWidth) {
                return this.previousElementSibling.clientHeight + 8;
              } else {
                return 20;
              }
            })
            .attr('rx', 10).attr('ry', 10)
            .style("fill", function(d) {
              if (d.children) {
                return 'DarkSeaGreen';
              } else {
                return 'CadetBlue';
              }
            })
            .style('opacity', '0.5')
            .attr('transform', function(d){
                var xdev, ydev;
                if (this.previousElementSibling.clientWidth) {
                  xdev = (this.previousElementSibling.clientWidth+10)/2;
                  ydev = (this.previousElementSibling.clientHeight+8)/2;
                } else {
                  xdev = (this.previousElementSibling.childNodes[0].length * 5 + 10)/2;
                  ydev = 10;
                }
                return "translate("+ -xdev + ',' + -ydev + ')';
            });


          // Declare the links…
          var link = svg
            .selectAll("path.link")
            .data(links, function(d) {
              return d.target.id;
            });

          // node.transition().duration(1000).remove();
          node.exit().remove();

          // Enter the links.
          link.enter()
            .insert("path", "g")
            .attr("class", "link")
            .attr("d", diagonal)
            .style("fill", "none")
            .style("stroke", "#ccc")
            .style("stroke-width", "2px");

          // link.transition().duration(1000).remove();
          link.exit().remove();
        }


      // componentWillUpdate: function(nextProps) {
      //         var el = this.getDOMNode(); // This is de div we are rendering
      //         d3.select(el.svg).selectAll("*").remove();
      //         this.updateTree(nextProps);
      //     },

      // getDefaultProps: function() {
      //     return {
      //         width: 340,
      //         height: 280
      //     };
      // },

      // var d3StringPlus = JSON.stringify(treeData, null, 2);
      // d3Editor.setValue('');
      // d3Editor.insert(d3StringPlus);

      }
    });

    keyboardEditor.insert(this.props.string);

  },
});

module.exports = KeyboardPanel;
