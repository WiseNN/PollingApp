var express = require('express');
var app = express();
var _ = require('underscore');
var colors = require('colors');
var connections = [];
var title = 'Untitled Presentation';
var audience = [];
var speaker = {};
var questions = require('./appQuestions');
var currentQuestion = "";
var results = [0,0,0,0];
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	

	socket.once('disconnect', function(){

		
		var member = _.findWhere(audience, {id:this.id});
		
		if(member)
		{
		
			audience.splice(audience.indexOf(member), 1);
			io.sockets.emit('refreshAudience', audience);
			console.log('user: '+member.name+" has signed-off");
		}
		else if(speaker.id === this.id)
		{
			console.log("Speaker %s has left the room. The %s presentation is over".bgBlack.cyan, speaker.name,title);
			speaker = {};
			title = 'Untitled Presentation';
			io.sockets.emit('end', {speakerName:"", title:title});


		}
		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
		console.log("DISCONNECTED SOCKET..."+connections.length+" connections remaining");


	});
	
	socket.on('join', function(payload){
		//writing 'this' inside of a socket, will refer to the specifi socket.
		//each socket comes with an id. When writing 'this.id' inside of
		//the socket, you can request the specific socket id.
		console.log("join inbound payload: "+JSON.stringify(payload));
		var isType = payload.type === 'speaker' ? 'speaker' : 'audience'
		var member = {
			id: this.id,
			name: payload.name,
			type : isType
		};

		socket.emit('joined', member);
		console.log("(Object from join event listener: "+JSON.stringify(member).bgBlack.green);

		if(isType === 'audience')
		{
			audience.push(member);
			io.sockets.emit('refreshAudience', audience);		
		}
		
	});

	socket.on('ask', function(question){

		currentQuestion = question;
		results = [0,0,0,0];
		io.sockets.emit('ask', {currentQuestion: currentQuestion, answer: false, results: results});
		console.log('Question Asked: %s'.red, question.q);

	});

	socket.on('start', function(payload){
		console.log(("inside of start socket function, payload: "+JSON.stringify(payload)).bgBlack.cyan);
		speaker.id = this.id;
		speaker.name = payload.name;
		speaker.type = 'speaker';
		title = payload.title;
		socket.emit('joined', speaker);
		socket.emit('start', {title: title});
		io.sockets.emit('syncAppState', {title: title, speakerName: speaker.name});
		console.log('Presentation on:  %s has been started by %s with type: %s'.bgBlack.cyan, title, speaker.name, speaker.type);
	});

	socket.on('answer', function(payload){
		console.log("Called Answer in Server".red);

		switch(payload.choice)
		{
			case "a" : results[0]++; break;
			case "b" : results[1]++; break;
			case "c" : results[2]++; break;
			case "d" : results[3]++; break;
			default  : console.log("called server answer switch, recieved no data".red);
		}	
		
		
		var str = results.toString();
		console.log("Answer: "+payload.choice+" - "+str+" results: "+results[0]);
		socket.emit('syncAppState', {answer: payload.choice, results: results});
		// io.sockets.emit('results', results);

	});		


	socket.emit('welcome', {  title: title,
							  audience: audience,
							  speakerName: speaker.name,
							  questions: questions,
							  currentQuestion: currentQuestion,
							  results: results
							});

	connections.push(socket);
	console.log(('CONNECTED SOCKETS: '+connections.length).bgBlack.white);

});

console.log("Polling server is running at 'http://localhost:3000".magenta);