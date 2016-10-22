var React =  require('react');
var ReactDOM = require('react-dom');
var Display = require('./parts/display');
var d3 = require('d3');
var BarChart = require('react-d3-components').BarChart;
var scope;
class board extends React.Component
{
	constructor()
	{
		super()
		
		scope=this;


	}


	

	render()
	{
			console.log("BAR CHART?? "+BarChart);
			var data = [{
	    label: 'Answer',
	    values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
	}];
		debugger;
		console.log(JSON.stringify(this.props.results));
		return(
				<div id='scoreboard'>

					<Display if={this.props.status === 'connected' && this.props.currentQuestion.q}>
					// <BarChart data={this.props.results} title={this.props.currentQuestion.q} height={window.innerHeight * 0.6} width={window.innerWidth * 0.9}/>
					 <BarChart
   							 data={data}
   							 width={400}
    						height={400}
    						title="Answer Results"
    						xScale={1}
    						yScale={1}
    						margin={{top: 10, bottom: 50, left: 50, right: 10}} />
				 	</Display>

					<Display if={this.props.status === 'connected' && !this.props.currentQuestion.q}>
					<h3>Awaiting a Question...</h3>
					</Display>


				</div>
			);
	}
}

module.exports = board;




