import React, { useState } from 'react';
import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Text
} from '@chakra-ui/react'

import './App.css';
import { Button } from '@chakra-ui/react'
import { CharacterSheet } from 'shared/dist/CharacterSheet';
import { CharacterSheetProvider, useCharacterSheet } from './CharacterSheetProvider';
import { FormControl, FormLabel, Input, Box, VStack, Heading } from "@chakra-ui/react";
import { logInfo } from './logger';


type FormObject = Record<string, any>;

const RecursiveBasicForm = ({ object, prefix = "" }: { object: FormObject; prefix?: string }) => {
	// Prepare the fields by iterating through the object
	const fields = Object.entries(object).map(([key, value]) => {
		const fieldName = prefix ? `${prefix}.${key}` : key;

		if (typeof value === "object" && value !== null) {
			// If the value is an object, recurse with a nested form
			return (
				<Box key={fieldName} borderWidth="1px" borderRadius="md" p={4}>
					<Heading size="sm" mb={4}>
						{key}
					</Heading>
					<RecursiveBasicForm object={value} prefix={fieldName} />
				</Box>
			);
		}

		// Otherwise, render a form field for the value
		return (
			<FormControl key={fieldName}>
				<FormLabel>{key}</FormLabel>
				<Input name={fieldName} defaultValue={value} placeholder={`Enter ${key}`} />
			</FormControl>
		);
	});

	// Return the pre-calculated fields inside a vertical stack
	return <VStack align="stretch" spacing={4}>{fields}</VStack>;
};

const RecursiveFormInternal = ({ object, settings, update, prefix = "" }: { object: FormObject; settings: any; update: any, prefix?: string }) => {
	// Prepare the fields by iterating through the object
	const fields = Object.entries(object).map(([key, value]) => {
		const fieldName = prefix ? `${prefix}.${key}` : key;
		const currentSettings = settings[key];
		const name = currentSettings?.name ?? key;
		const display = (currentSettings?.display ?? true) ? "block" : "none";

		if (typeof value === "object" && value !== null) {
			// If the value is an object, recurse with a nested form
			return (
				<Box key={fieldName} borderWidth="1px" borderRadius="md" p={4}>
					<Heading size="sm" mb={4}>
						{name}
					</Heading>
					<RecursiveFormInternal object={value} settings={currentSettings} update={update} prefix={fieldName} />
				</Box>
			);
		}

		// Otherwise, render a form field for the value
		return (
			<FormControl display={display} key={fieldName}>
				<FormLabel>{name}</FormLabel>
				<Input
					name={fieldName}
					value={value}
					placeholder={`Enter ${key}`}
					onChange={(e) => update(fieldName, e.target.value)}
				/>
			</FormControl>
		);
	});

	// Return the pre-calculated fields inside a vertical stack
	return <VStack align="stretch" spacing={4}>{fields}</VStack>;
};

const RecursiveForm = ({ object, settings, update}: { object: FormObject; settings: any; update: any }) => {
	const updateObject = (path: string, value: any) => {
		update((draft: any) => {
			const keys = path.split(".");
			let current = draft;
			for (let i = 0; i < keys.length - 1; i++) {
				current = current[keys[i]];
			}
			current[keys[keys.length - 1]] = value;
		});
	};

	return (
		<RecursiveFormInternal object={object} settings={settings} update={updateObject}/>
	);
}

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
			<Editable key="editable" value={`${character.health}`} onChange = {onChange}>
				<EditablePreview />
				<EditableInput />
			</Editable>
		</Flex>
	);
}

function MainApp() {
	const [count, setCount] = useState(0);
	const [character] = useCharacterSheet();

	return (<>
		<div className="container">
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

function App() {
	return (
		<CharacterSheetProvider>
			<MainApp/>
		</CharacterSheetProvider>
	);
}

export default App;
