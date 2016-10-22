var React =  require('react');
var ReactDOM = require('react-dom');
var Display = require('./parts/display');
var SpeakerJoin = require('./parts/speakerJoin');
var Attendance = require('./parts/attendance');
var Questions = require('./parts/questions')


class speaker extends React.Component
{
	render()
	{
		return(
		
			<div>
				<Display if={this.props.status === 'connected'}>
				
						
					
					<Display if={this.props.member.name && this.props.member.type === 'speaker'}>
						<Questions emit={this.props.emit} questions={this.props.questions} />
						<Attendance audience={this.props.audience} />
					</Display>

					<Display if={!this.props.member.name}>
						<h2>Start The Presentation</h2>
						<SpeakerJoin emit={this.props.emit}/>
					</Display>
				</Display>


			</div>
			
			

			);
	}
}

module.exports = speaker;
