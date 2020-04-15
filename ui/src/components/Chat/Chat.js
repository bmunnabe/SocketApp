import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
export default function Chat(props) {
	const { location: { search } } = props;
	const [ name, setName ] = useState('');
	const [ room, setRoom ] = useState('');
	const ioENDPOINT = 'localhost:5000';
	//Combination of componentdidmount and didunmount
	useEffect(
		() => {
			//get params from url query
			const { name, room } = queryString.parse(search);

			// connect to socket endpoint
			socket = io(ioENDPOINT);
			console.log(socket);

			setRoom(room);
			setName(name);

			//Pass arguments to JOIN socket EP, here () is callback trigger from socket response
			socket.emit('join', { name, room }, (name, room, myName) => {
				console.log(`Name got from server is ${name}`);
			});

			//Hooks method, similar to componentDidUnmount, onDestroy desiconnection io
			return () => {
				socket.emit('disconnect');
				socket.off();
			};
		},
		//Hook useEffect only trigger when below two variables changes
		[ search, ioENDPOINT ]
	);
	return (
		<div>
			<h1>Chat</h1>
			<p>{name}</p>
			<p>{room}</p>
		</div>
	);
}
