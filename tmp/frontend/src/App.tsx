//import React from 'react';
//import logo from './logo.svg';
//import './App.css';
//
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.tsx</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//
//export default App;

import React, {useState, useEffect} from 'react';
import {FrontendUtils} from './FrontendUtils';
import {Robotta} from 'shared/dist/Robotta';
import {WeaponStore} from 'shared/dist/WeaponStore';

let initialRtt: Robotta | null;
let tokenId: string;

function App() {
	const [count, setCount] = useState(0);
	const [rtt, setRtt] = useState<Robotta|null>(null);
	const [id, setId] = useState("unknown id");

	useEffect(() => {
		FrontendUtils.getCurrentRobotta().then(nrtt => setRtt(nrtt));
		//FrontendUtils.getCurrentTokenId().then(id => setId(id));
	}, []);
	
	console.log("APP: tokenid: " + id);
	console.log("APP: initalRTT: " + JSON.stringify(rtt));

	return (
		<div>
			<h1>Name: {rtt?.name}</h1>
			<h2>Token ID: {id}</h2>
			<p>{WeaponStore.items[0].name}</p>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
		</div>
	);
}

export default App;
