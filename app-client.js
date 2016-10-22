// debugger;
// debugger;debugger;
// debugger;debugger;
// debugger;
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var App = require('./components/app');
var Audience = require('./components/audience');
var Header = require('./components/parts/header');
var Board = require('./components/board');
var Speaker = require('./components/speaker');
var Whoops404 = require('./components/whoops404');

var routes = (
	<Route handler={App}>
		<DefaultRoute handler={Audience} />
		<Route name='speaker' path='speaker' handler={Speaker}></Route>
		<Route name='board' path='board' handler={Board}></Route>
		<NotFoundRoute handler={Whoops404} />
	</Route>
);



console.log("%ccalled app-client.js", "color:magenta");

/**
	The appropriate route will be passed back into the URL, when 
	the user types in the name corresponding with 'name'
**/	
Router.run(routes, function(Handler){
	ReactDOM.render(<Handler />, document.getElementById('react-container'));
});


