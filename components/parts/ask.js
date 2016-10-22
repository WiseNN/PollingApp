var React = require('react');
var ReactDOM = require('react-dom');
var Display = require('./display');
var scope;
class ask extends React.Component
{
	
	constructor()
	{
		super();

		// this.setupChoices = this.setupChoices.bind(this);
		this.addChoiceButton = this.addChoiceButton.bind(this);
		scope=this;
		// this.state = {
		// 	answer: false;
		// };
		
	}

	componentWillMount()
	{
		console.log("called will mount");

		if(sessionStorage.answer && sessionStorage.answer != "")
		{
			const ans = sessionStorage.answer;

			scope.select(ans);
			return;
		}
	}


	select(choice)
	{
		console.log("SELECE HAS BEEN CALLED: "+choice);

		// scope.setState({answer:choice});

		sessionStorage.answer = choice;
		console.log(" sessionStorage.answer: "+sessionStorage.answer);
		scope.props.emit('answer', {
			question : scope.props.question,
			choice: choice
		});
	}


	addChoiceButton(choice, i)
	{
		console.log('%caddChoiceButton', "color:red");
		const buttonTypes = ['primary', 'success', 'warning', 'danger'];
		const buttonStyleClass = 'col-xs-12 col-sm-6 btn btn-'+buttonTypes[i];

		return( <button key={i} className={buttonStyleClass} onClick={scope.select.bind(scope, choice)}> {choice} : {this.props.question[choice]}</button> );
	}

	render()
	{
		var choices = Object.keys(this.props.question);
		choices.shift();
	

		return(
		<div id='currentQuestion'>
			<Display if={this.props.answer}>
					<h3>You answered: {this.props.answer}</h3>
					<p>{this.props.question[this.props.answer]}</p>
			</Display>

			<Display if={!this.props.answer}>
				<h2>{this.props.question.q}</h2>
				<div className='row'>
					{choices.map(this.addChoiceButton)}
				</div>
			</Display>
		</div>			
			);
	}
}



module.exports = ask;