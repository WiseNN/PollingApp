var React = require('react');
var ReactDOM = require('react-dom');
var scope;
class questions extends React.Component
{
	constructor()
	{
		super();
		// this.askQuestion = this.askQuestion.bind(this);
		scope = this;
	}

	 askQuestion(question){
	 	console.log("ask QUestion was called");
		this.props.emit('ask', question);
	}
	
	createQuestions(question, i)
	{
		return(
				<div key={i} className='col-xs-12 col-sm-6 col-md-3'>
					<span onClick={scope.askQuestion.bind(scope, question)}>{question.q}</span>
				</div>
			);
	}

	render()
	{
		return(
				<div className='row' id='questions'>
					<h2>Questions</h2>

					{this.props.questions.map(this.createQuestions)}
				</div>
			);
	}


}

module.exports = questions;
