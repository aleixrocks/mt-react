import './App.css';
import React, { useState } from 'react';
import { Button } from '@chakra-ui/react'
import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text,
  Box
} from '@chakra-ui/react'
import { CharacterSheet } from 'shared/dist/CharacterSheet';
import { useCharacterSheet } from './CharacterSheetProvider';
import { useSync } from './SyncProvider';
import { RecursiveForm } from './RecursiveForm';


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

export function CharacterSheetPanel() {
	const [count, setCount] = useState(0);
	const [character] = useCharacterSheet();
	const [sync] = useSync();

	return (<>
		<div className="container">
			<h1>Sync.data: {sync.data}</h1>
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
			<MyForm/>
		</div>
	</>);
}
