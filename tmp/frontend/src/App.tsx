import React, {useState, useEffect, ReactNode} from 'react';
import {useImmer} from 'use-immer';
import {FrontendUtils} from './FrontendUtils';
import {Robotta, AttributeData, ProfessionData} from 'shared/dist/Robotta';
import {WeaponStore} from 'shared/dist/WeaponStore';
import './App.css';

import { Radio, RadioGroup } from '@chakra-ui/react'
import { Button, IconButton, ButtonGroup, Box } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { EmailIcon, ArrowForwardIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

type RollModifier = {
	name: string;
	value: number;
}

class Roll {
	private values: number[];
	private mods: RollModifier[];
	private ndices: number;

	static rollDice(): number {
		return Math.floor(Math.random() * 10 + 1);
	}

	constructor(mods: RollModifier[], trait: boolean) {
		this.mods = mods;
		this.values = [];
		this.ndices = trait ? 4 : 3;

		for (let i = 0; i < this.ndices; i++) {
			const roll = Roll.rollDice();
			console.log(roll);
			this.values.push(roll);
		}
	}

	getNumDices(): number {
		return this.ndices;
	}

	getValues(): number[] {
		return this.values;
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

function Dice({isActive, onClick, children}: {isActive: boolean, onClick: (e: any) => void, children: number}) {
	return (
		<Button
			boxSize = "40px"
			variant = "outline"
			borderWidth = "4px"
			margin = "2px"
			colorScheme = "teal"
			onClick = {e=>onClick(e)}
			isActive = {isActive}
		>
			{children}
		</Button>
	);
}

function RollMenu({roll}: {roll: Roll}) {
	const ndices = roll.getNumDices();
	const values = roll.getValues();
	const [reroll, updateReroll] = useImmer<boolean[]>(Array.from({length: ndices}, ()=>false));

	const dices = values.map((value, index) => {
		const handleClick = (e: any) => {
			updateReroll(draft => {
				draft[index] = ! draft[index];
			});
		};

		return (
			<Dice
				isActive = {reroll[index]}
				onClick = {e => handleClick(e)}
			>
				{value}
			</Dice>
		);
	});

	return (<>
		You rolled: {dices}
		<Button
			isDisabled = {reroll.length === 0}
		>
			reroll
		</Button>
	</>);
}

function CommonAction({rtt}: {rtt: Robotta}) {
	const [attr, setAttr] = useState("");
	const [prof, setProf] = useState("");
	const [trait, setTrait] = useState("");
	const [passion, setPassion] = useState(0);
	const [roll, setRoll] = useState<Roll|null>(null);

	const handleRoll = (): Roll => {
		const propName = attr as keyof AttributeData;
		const profession = rtt.professions.find(({key}) => key === prof) as ProfessionData ;
		const mods: RollModifier[] = [{
			name: "attribute",
			value: rtt.attributes[propName],
		}, {
			name: "profession",
			value: profession.value,
		}];

		return new Roll(mods, false);
	};

	const attributeList = Object.entries(rtt.attributes).map(([key,value]) => (
		<Button
			key={key}
			isActive = {attr === key}
			onClick={e=>{setAttr(attr === key? "" : key)}}
			colorScheme = 'purple'
			borderRadius = '0px'
		>
			{attributeTranslate[key as keyof typeof attributeTranslate]}:{value}
		</Button>
	));
	const professionList = rtt.professions.map(({key, value}) => (
		<Button
			key={key}
			isActive = {prof === key}
			onClick={e=>{setProf(prof === key? "" : key )}}
			borderRadius = '0px'
		>
			{key}:{value}
		</Button>
	));
	const traitList = rtt.traits.map(key => (
		<Button
			key={key}
			isActive = {trait === key}
			onClick={e=>{
				if (rtt.state.traitPoints > 0) {
					setTrait(trait === key? "" : key);
				} else if (trait === key) {
					setTrait("");
				}
			}}
			borderRadius = '0px'
		>
			{key}
		</Button>
	));
	const passionCheckbox = <>
		<ButtonGroup size='sm' isAttached variant='outline'>
			<IconButton aria-label='Use passion' icon={<AddIcon />}
				isActive = {passion === 1}
				onClick = {e => setPassion(1)}
				borderRadius = "full"
			/>
			<Button
				isActive = {passion === 0}
				onClick = {e => setPassion(0)}
				borderRadius = "full"
			>
				Unset
			</Button>
			<IconButton aria-label='Do not use passion' icon={<MinusIcon />}
				isActive = {passion === -1}
				onClick = {e => setPassion(-1)}
				borderRadius = "full"
			/>
		</ButtonGroup>
	</>

	const rollArea = (roll === null)?
		<Button
			key="roll"
			onClick={e=>setRoll(handleRoll())}
			isDisabled={!attr || !prof}
		>
			Roll!
		</Button>
	:
		<Box>
			<RollMenu roll={roll} />
		</Box>


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
			<p>Puntos de pasión: {rtt.state.passionPoints} {(passion) ? ` (${passion > 0 ? "-" : "+"}1)` : ""}</p>
			{passionCheckbox}
		</ActionMenu>
		{rollArea}
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

function AccordionActionMenu({name, children} : {name: string, children: ReactNode}) {
	return (
		<AccordionItem>
			<h2>
				<AccordionButton>
					<Box as='span' flex='1' textAlign='center'>
						{name}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>
				{children}
			</AccordionPanel>
		</AccordionItem>
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
		<div className="container">
			<Accordion allowToggle>
				<AccordionActionMenu name="Acción Común">
					<CommonAction rtt={rtt}/>
				</AccordionActionMenu>
				<AccordionActionMenu name="Acción TODO">
					TODO
				</AccordionActionMenu>
			</Accordion>
		</div>
	</>);
}

export default App;
