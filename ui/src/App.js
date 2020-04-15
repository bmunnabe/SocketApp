import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Chat from './components/Chat';
import Join from './components/Join/Join';

export class App extends Component {
	render() {
		return (
			<Router>
				<Route path="/chat">
					<Chat />
				</Route>
				<Route exact path="/">
					<Join />
				</Route>
			</Router>
		);
	}
}

export default App;
