var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var io = require('socket.io-client');
var colors = require('colors');
var Header = require('./parts/header');



class app extends React.Component
{
	constructor()
	{
		super();
		console.log("%cCalled contructor", "color:magenta");
		this.connect = this.connect.bind(this);
		this.disconnect = this.disconnect.bind(this);
		this.syncAppState = this.syncAppState.bind(this);
		this.emit = this.emit.bind(this);
		this.joined = this.joined.bind(this);
		this.updateAudience = this.updateAudience.bind(this);
		this.start = this.start.bind(this);
		this.ask = this.ask.bind(this);
		this.updateResults = this.updateResults.bind(this);

		this.state = {
			status : 'connected',
			title : '',
			member : {},
			audience : [],
			speakerName : "",
			questions: [],
			currentQuestion: false,
			answer: false,
			results: []
		};

	}


	componentDidMount()
	{
		console.log("%cCalled componentDidMount...", "color:magenta");
		this.socket = io('http://localhost:3000');
		this.socket.on('connect', this.connect);
		this.socket.on('disconnect', this.disconnect);
		this.socket.on('welcome', this.syncAppState);
		this.socket.on('joined', this.joined);
		this.socket.on('refreshAudience', this.updateAudience);
		this.socket.on('start', this.start);
		this.socket.on('syncAppState', this.syncAppState);
		this.socket.on('end', this.syncAppState);
		this.socket.on('ask', this.ask);
		this.socket.on('results', this.updateResults);
	}
	ask(questionState)
	{
		debugger;
		console.log("%cAsk Method Called", "color:magenta");
		console.log("%cOBJECT QUESTION: "+JSON.stringify(questionState), "color:red");
		this.setState(questionState);
		console.log("%cCURRENT QUESTION (state): "+JSON.stringify(this.state.currentQuestion.q), "color:darkorange");
		sessionStorage.answer = "";



	}

	emit(eventType, payload)
	{
		
		console.log("eventType from app: %s, payload: %s",eventType, JSON.stringify(payload));
		this.socket.emit(eventType, payload);
	}
	updateResults(resultsData)
	{
		// console.log("updateResults: "+resultsDat.toString));
		this.setState({results: resultsData});
	}


	updateAudience(refreshedAudience)
	{
		this.setState({audience : refreshedAudience});
	}


	joined(currentMember)
	{
		
		sessionStorage.member = JSON.stringify(currentMember);
		this.setState({member : currentMember });
		
	}

	connect()
	{
		
		
		console.log("%cCalled connect...", "color:magenta");
		this.setState({status : 'connected'});
		var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
		console.log("member from connect-clientSide: "+JSON.stringify(member));

		
		if(member && member.type == "audience")
		{
			this.emit('join', member);
		}
		else if(member && member.type == "speaker")
		{
			this.emit('start', {name: member.name, title: sessionStorage.title});
		}
		
	}

	disconnect()
	{
		this.setState({status : 'disconnected',
						title : 'Server Disconnected',
						speakerName : ''}
					 );
	}	

	syncAppState(serverState)
	{
		debugger;
		console.log("syncAppState: "+JSON.stringify(serverState));
		this.setState(serverState);
		console.log("state after setState: "+JSON.stringify(this.state));
	}
	start(presentation)
	{

		console.log("start() presentation method client-Side: "+JSON.stringify(presentation));
		console.log(JSON.stringify(this.state));
		if(this.state.member.type == "speaker")
		{
			sessionStorage.title = presentation.title;
		}			

	}

	
	render()
	{
		debugger;
		console.log("%cCalled render...", "color:magenta");
		return(
				<div>
				
				<Header {...this.state}/>
				<RouteHandler emit={this.emit} {...this.state} />
				</div>
			);
	}	
}


module.exports = app;