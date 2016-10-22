var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;

class join extends React.Component
{
	constructor()
	{
		super();
		this.join = this.join.bind(this);
	}

	join()
	{
		var memberName = React.findDOMNode(this.refs.name).value;
		debugger;
		this.props.emit('join', {name : memberName});
		

	}
	render()
	{
		return(
				
				<form action='javascript:void(0)' onSubmit={this.join}>
					<label>Full Name</label>
					<input ref='name' className='form-control'
					placeholder='enter your full name...'
					required />
					<button className='btn btn-primary'>Join</button>
					<Link to="/speaker">Join as speaker</Link>
					<Link to="/board">Visit The Board</Link>
				</form>
			);
	}
}

module.exports = join;