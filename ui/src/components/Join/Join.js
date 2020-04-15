import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

export default function Join() {
	const [ name, setName ] = useState('');
	const [ room, setRoom ] = useState('');

	return (
		<div className="joinOuterContainer">
			<div className="joinInnerContainer">
				<h1 className="heading">Join</h1>
				<input placeholder="Name" className="joinInput" type="text" onChange={(e) => setName(e.target.value)} />
				<input
					placeholder="Room"
					className="joinInput mt-20"
					type="text"
					onChange={(e) => setRoom(e.target.value)}
				/>
				<Link
					onClick={(e) => (!room || !name ? e.preventDefault() : null)}
					to={`/chat?name=${name}&room=${room}`}
				>
					<button className="button mt-20" type="submit">
						Enter
					</button>
				</Link>
			</div>
		</div>
	);
}
