import './App.css';
import React, { useState } from 'react';
import { Button } from '@chakra-ui/react'
import {
  Editable,
  Flex,
  Text,
  Box
} from '@chakra-ui/react'

import { CharacterSheet } from 'shared/dist/CharacterSheet';
import { useCharacterSheet } from './CharacterSheetProvider';
import { useSync } from './SyncProvider';
import { RecursiveForm } from './RecursiveForm';
import { Roll, DiceRoller } from './Roll';


function MyForm() {
	const [character, updateCharacterSheet] = useCharacterSheet();

	const settings = {
		name: {
			name: "Nombre",
			display: true,
			editable: true,
		},
		attributes: {
			name: "Attributos",
			charisma: {
				name: "Carisma",
				display: true,
				editable: true,
			},
			dexterity: {
				name: "Agilidad",
				display: true,
				editable: true,
			},
			strength: {
				name: "Fuerza",
				display: true,
				editable: true,
			},
			perception: {
				name: "Percepcion",
				display: true,
				editable: true,
			},
		},
	};

	return (
		<Box maxWidth="600px" mx="auto" p={4}>
			<form>
				<RecursiveForm object={character} settings={settings} update={updateCharacterSheet}/>
			</form>
		</Box>
	);
};


function ShowHealth() {
	const [character, updateCharacterSheet] = useCharacterSheet();
	const onChange = (nextValue: string) => updateCharacterSheet((draft: CharacterSheet) => {
		draft["health"] = Number(nextValue);
	});
	return (
		<Flex key="health" gap="1" justifyContent="center" alignItems="center"  >
			<Text> Health (edit me!): </Text>
			<Editable.Root key="editable" value={`${character.health}`} onChange = {onChange}>
				<Editable.Preview />
				<Editable.Input />
			</Editable.Root>
		</Flex>
	);
}

function Roller() {
	const [sync] = useSync();
	const [character] = useCharacterSheet();
	const currentDice = Roll.getCurrentDice(sync["clock"]);
	const [roll, updateRoll] = useState({value: 0, metric: 0});

	const handleRollEnd = () => {
		console.log(`${character.name} rolled ${roll.value}`);
	}

	return (<>
		<Button onClick = {() => {
			const newRoll = {
				value: Roll.roll(currentDice),
				metric: currentDice,
			};
			updateRoll(newRoll);
		}}>
			Roll 1d{currentDice}
		</Button>

		{(roll.value !== 0) ? <div>
			<DiceRoller metric={roll.metric} predefinedValue={roll.value} onEnd={handleRollEnd} />
			<p> {roll.value} </p>
		</div> : ''}
	</>);
}

export function CharacterSheetPanel() {
	const [count, setCount] = useState(0);
	const [character] = useCharacterSheet();
	const [sync] = useSync();
	const currentDice = Roll.getCurrentDice(sync["clock"]);

	return (<>
		<div className="container">
			<h1>Clock: {sync.clock}</h1>
			<h1>Dice: 1d{currentDice}</h1>
			<h1>Name: {character.name}</h1>
			<h1>Health: {character.health}</h1>
			<ShowHealth key="health"/>
			<p>You clicked {count} times</p>
			<Button onClick={() => setCount(count + 1)}>
				Click me
			</Button>
		</div>
		<div className="container">
			Make awesome things!
		</div>
		<div className="container">
			<Roller />
		</div>
		<div className="container">
			<MyForm/>
		</div>
	</>);
}
