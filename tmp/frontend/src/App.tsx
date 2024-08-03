import React, { useState, useEffect, useRef, ReactNode } from 'react';
import './App.css';

import { Radio, RadioGroup, Switch } from '@chakra-ui/react'
import { Button, IconButton, ButtonGroup, Box } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { EmailIcon, ArrowForwardIcon, AddIcon, MinusIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

import { FrontendUtils } from './FrontendUtils';
import { Robotta, AttributeData, ProfessionData } from 'shared/dist/Robotta';
import { WeaponStore } from 'shared/dist/WeaponStore';
import { RollModifier, RollMenu, Roll, RollState } from './Roll';
import { ButtonMouseEvent } from './Common';


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
	const [traitMode, setTraitMode] = useState(0);
	const [passion, setPassion] = useState(false);
	const rollRef = useRef<Roll>(new Roll());
	const roll = rollRef.current;
	const [rollState, setRollState] = useState<RollState>(roll.getState());

	const handleRoll = (): RollState => {
		const propName = attr as keyof AttributeData;
		const profession = rtt.professions.find(({key}) => key === prof) as ProfessionData;
		let mods: RollModifier[] = [{
			name: "attribute",
			value: rtt.attributes[propName],
		}];

		if (profession) {
			mods.push({
				name: "profession",
				value: profession.value,
			});
		}

		if (passion) {
			mods.push({
				name: "passion",
				value: 1,
			});
		}

		if (trait) {
			mods.push({
				name: "trait",
				value: 1,
			});
		}

		roll.roll(mods);
		return roll.getState();
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
	const preTraitList = rtt.traits.map(key => (
		<Button
			key={key}
			isActive = {trait === key}
			isDisabled = {rtt.state.traitPoints === 0}
			onClick={e => (key !== trait) ? setTrait(key) : setTrait("")}
			borderRadius = '0px'
		>
			{key}
		</Button>
	));
	const postTraitList = <>
		<Button
			key = {trait}
			isActive = {true}
			onClick={e => setTrait("")}
			borderRadius = '0px'
			mr={4}
		>
			{trait}
		</Button>
		<ButtonGroup size='sm' isAttached variant='outline'>
			<IconButton aria-label='Usar rasgo de caracter de forma positiva' icon={<AddIcon />}
				isActive = {traitMode === 1}
				onClick = {e => setTraitMode(1)}
				borderRadius = "full"
				colorScheme = {traitMode ? 'blue' : 'red'}
			/>
			<IconButton aria-label='Usar rasgo de caracter de forma negativa' icon={<MinusIcon />}
				isActive = {traitMode === -1}
				onClick = {e => setTraitMode(-1)}
				borderRadius = "full"
				colorScheme = {traitMode ? 'blue' : 'red'}
			/>
		</ButtonGroup>
	</>;
	const traitList = trait === "" ? preTraitList : postTraitList; 

	const passionCheckbox = <>
		<Switch id='use-passion'
			onChange={e=>setPassion(e.target.checked)}
			isDisabled={rtt.state.passionPoints == 0}
		/>
	</>

	const preRollMenu = (
		<Box key="preRollMenu">
			<p>Selecciona un atributo</p>
			<div>
				{attributeList}
			</div>
			<p>Selecciona una profesión (si aplica)</p>
			<div>
				{professionList}
			</div>
			<ActionMenu name="Personalidad">
				<p>Puntos de caràcter: {rtt.state.traitPoints} {(!trait) ? "" : (traitMode > 0) ? ' (-1)' : (traitMode < 0) ? ' (+1)' : "(selecciona +/-)"}</p>
				{traitList}
				<p>Puntos de pasión: {rtt.state.passionPoints} {(passion) ? " (-1)" : ""}</p>
				{passionCheckbox}
			</ActionMenu>
			<Button
				key="roll"
				onClick={e=>setRollState(handleRoll())}
				isDisabled={!attr}
			>
				Roll!
			</Button>
		</Box>
	);

	const postRollMenu = (
		<Box key="postRollMenu">
			<RollMenu
				rtt={rtt}
				roll={roll}
				setRollState={setRollState}
			/>
		</Box>
	);

	return ((!roll.isValid())? preRollMenu : postRollMenu);
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
