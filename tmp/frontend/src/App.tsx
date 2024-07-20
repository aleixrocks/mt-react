import React, {useState, useEffect, ReactNode} from 'react';
import {FrontendUtils} from './FrontendUtils';
import {Robotta, AttributeData, ProfessionData} from 'shared/dist/Robotta';
import {WeaponStore} from 'shared/dist/WeaponStore';
import './App.css';

import { Radio, RadioGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'

type RollModifier = {
	name: string;
	value: number;
}

class Roll {
	values: number[];
	mods: RollModifier[];

	static rollDice(): number {
		return Math.floor(Math.random() * 10 + 1);
	}

	constructor(mods: RollModifier[], trait: boolean) {
		this.mods = mods;
		this.values = [];

		const ndices = trait ? 4 : 3;
		for (let i = 0; i < ndices; i++) {
			const roll = Roll.rollDice();
			console.log(roll);
			this.values.push(roll);
		}
	}
}

const attributeTranslate = {
	calculus: "Cálculo",
	charisma: "Carisma",
	dexterity: "Destreza",
	firewill: "Firewill",
	strength: "Fuerza",
	perception: "Percepción",
};


function CommonAction({rtt}: {rtt: Robotta}) {
	const [attr, setAttr] = useState("");
	const [prof, setProf] = useState("");
	const [trait, setTrait] = useState("");
	const [passion, setPassion] = useState(false);

	const handleRoll = () => {
		const propName = attr as keyof AttributeData;
		const profession = rtt.professions.find(({key}) => key === prof) as ProfessionData ;
		const mods: RollModifier[] = [{
			name: "attribute",
			value: rtt.attributes[propName],
		}, {
			name: "profession",
			value: profession.value,
		}];

		const roll = new Roll(mods, false);
	};


	const attributeList = Object.entries(rtt.attributes).map(([key,value]) => (
		<button
			key={key}
			className={"toggleButton" + ((attr===key) ? " active" : "")}
			onClick={e=>{setAttr(attr === key? "" : key)}}
		>
			{attributeTranslate[key as keyof typeof attributeTranslate]}:{value}
		</button>
	));
	const professionList = rtt.professions.map(({key, value}) => (
		<button
			key={key}
			className={"toggleButton" + ((prof===key) ? " active" : "")}
			onClick={e=>{setProf(prof === key? "" : key )}}
		>
			{key}:{value}
		</button>
	));
	const traitList = rtt.traits.map(key => (
		<button
			key={key}
			className={"toggleButton" + ((trait===key) ? " active" : "")}
			onClick={e=>{
				if (rtt.state.traitPoints > 0) {
					setTrait(trait === key? "" : key);
				} else if (trait === key) {
					setTrait("");
				}
			}}
		>
			{key}
		</button>
	));
	const passionCheckbox = <>
		<input type="checkbox" id="passion" key="passion" name="passion"
			onChange = {e=>setPassion(!passion)}
			checked = {passion}
		/>
		<label htmlFor="passion">Usar Pasión</label>
		<RadioGroup defaultValue='1'>
			<Stack spacing={4} direction='row'>
				<Radio value='1' isDisabled>
					Radio 1
				</Radio>
				<Radio value='2'>Radio 2</Radio>
				<Radio value='3'>Radio 3</Radio>
			</Stack>
		</RadioGroup>
	</>

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
			<p>Puntos de caràcter: {rtt.state.traitPoints} {(trait)? " (-1)" : ""}</p>
			{traitList}
			<p>Puntos de pasión: {rtt.state.passionPoints} {(passion)? " (-1)" : ""}</p>
			{passionCheckbox}
		</ActionMenu>
		<button
			onClick={e=>handleRoll()}
			disabled={!attr || !prof}
		>
			Roll!
		</button>
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
