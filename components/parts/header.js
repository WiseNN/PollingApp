var React = require('react');

class header extends React.Component
{
	constructor()
	{
		super();

	}

	render()
	{
		debugger;
		return(
				<header className='row'>
					<div className='col-xs-10'>
						<h1>{this.props.title}</h1>
						<h5>{this.props.speakerName}</h5>
					</div>	

					<div className='col-xs-2'>

						<span id='connection-status' className={this.props.status}></span>
					</div>
					
				</header>
			);
	}
}



header.propTypes = {
	title : React.PropTypes.string.isRequired
	
};
header.DefaultsProps = {
	status : 'disconnected'
};

module.exports = header;