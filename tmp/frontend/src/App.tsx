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

import React, {useState, useEffect, ReactNode} from 'react';
import {FrontendUtils} from './FrontendUtils';
import {Robotta} from 'shared/dist/Robotta';
import {WeaponStore} from 'shared/dist/WeaponStore';
import './App.css';

function CommonAction({rtt}: {rtt: Robotta}) {
	const [attr, setAttr] = useState("");
	const [prof, setProf] = useState("");
	const [trait, setTrait] = useState("");
	const attributeTranslate = {
		calculus: "Cálculo",
		charisma: "Carisma",
		dexterity: "Destreza",
		firewill: "Firewill",
		strength: "Fuerza",
		perception: "Percepción",
	};

	const attributeList = Object.entries(rtt.attributes).map(([key,value]) => (
		<button
			key={key}
			className={"toggleButton" + ((attr===key) ? " active" : "")}
			onClick={e=>{setAttr(key)}}
		>
			{attributeTranslate[key as keyof typeof attributeTranslate]}:{value}
		</button>
	));
	const professionList = rtt.professions.map(({key, value}) => (
		<button
			key={key}
			className={"toggleButton" + ((prof===key) ? " active" : "")}
			onClick={e=>{setProf(key)}}
		>
			{key}:{value}
		</button>
	));
	const traitList = rtt.traits.map(key => (
		<button
			key={key}
			className={"toggleButton" + ((trait===key) ? " active" : "")}
			onClick={e=>{
				if (rtt.state.traitPoints > 0)
					setTrait(key);
			}}
		>
			{key}
		</button>
	));

	return (<>
		<p>Selecciona un atributo</p>
		<div>
			{attributeList}
		</div>
		<p>Selecciona una profesión (si aplica)</p>
		<div>
			{professionList}
		</div>
		<ActionMenu name="Personalidad">
			<p>Puntos de caràcter: {rtt.state.traitPoints}</p>
			{traitList}
		</ActionMenu>
	</>);
}

function ActionMenu({name, children} : {name: string, children: ReactNode}) {
	const [show, setShow] = useState(false);
	return (
		<div className="container">
			<div onClick={e=>setShow(!show)}>
				<span>{name}</span>
			</div>
			<div style={{display: show? 'block':'none'}}>
				{children}
			</div>
		</div>
	);
}

function App() {
	const [count, setCount] = useState(0);
	const [rtt, setRtt] = useState<Robotta|null>(null);

	useEffect(() => {
		FrontendUtils.getCurrentRobotta().then(nrtt => setRtt(nrtt));
	}, []);
	
	if (rtt === null) {
		return (
			<div className="container">
				<h1>Loading...</h1>
			</div>
		);
	}

	return (<>
		<div className="container">
			<h1>Name: {rtt.name}</h1>
			<p>{WeaponStore.items[0].name}</p>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
		</div>
		<ActionMenu name="Acción Común">
			<CommonAction rtt={rtt}/>
		</ActionMenu>
	</>);
}

export default App;
