var React = require('react');
var Display = require('./display');


class speakerJoin extends React.Component
{
	constructor()
	{
		super();
		this.start = this.start.bind(this);
	}

	start()
	{
		console.log("speakerJoin start event emitted");
		var memberName = React.findDOMNode(this.refs.name).value;
		var presentationTitle = React.findDOMNode(this.refs.title).value;
		debugger;
		this.props.emit('start', {name : memberName, title:  presentationTitle});
		

	}
	render()
	{
		return(
				
				<form action='javascript:void(0)' onSubmit={this.start}>
					<label>Full Name</label>
					<input ref='name' className='form-control'
					placeholder='Please enter your full name...'
					required />

					<label>Presentation Title</label>
					<input ref='title' className='form-control'
					placeholder='Please enter your presentation title...'
					required />
					<button className='btn btn-primary'>Join</button>
				</form>
			);
	}
}

module.exports = speakerJoin;