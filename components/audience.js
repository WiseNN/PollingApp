var React =  require('react');
var ReactDOM = require('react-dom');
var Display = require('./parts/display');
var Join = require('./parts/join');
var Ask = require('./parts/ask');

class audience extends React.Component
{
	constructor()
	{
		debugger;
		super();
	}
	render()
	{
		return(

				<div>
					<Display if={this.props.status === 'connected'} >
					
						<Display if={this.props.member.name} >

							<Display if={!this.props.currentQuestion}>
									<h1>Welcome {this.props.member.name}!</h1>
									<p>{this.props.audience.length} audience members tuned in</p>
									<h4>Questions will appear here shortly</h4>
							</Display>

							<Display if={this.props.currentQuestion}>
								<Ask question={this.props.currentQuestion} emit={this.props.emit} answer={this.props.answer}/>
							</Display>
									
						</Display>

						<Display if={!this.props.member.name} >
							<h1>Join the session</h1>
							<Join emit={this.props.emit} />	
						</Display>	

					</Display>

					

					<Display if={this.props.status === 'disconnected'} >
						<h1>Please come back later, the session will start shortly...thanks!</h1>
					</Display>
				</div>
			);
	}
}

module.exports = audience;