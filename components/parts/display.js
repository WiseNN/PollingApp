var React = require('react');

class display extends React.Component
{
	render()
	{
		return(this.props.if) ? <div>{this.props.children}</div> : null;
	}
}

module.exports = display;

