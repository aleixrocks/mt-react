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


function ShowHealth() {
	const [character, updateCharacterSheet] = useCharacterSheet();
	const onChange = (nextValue: string) => updateCharacterSheet((draft: CharacterSheet) => {
		draft["health"] = Number(nextValue);
	});
	return (
		<Flex gap="1" justifyContent="center" alignItems="center"  >
			<Text> Health (edit me!): </Text>
			<Editable defaultValue={`${character.health}`} onChange = {onChange}>
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
			<ShowHealth/>
			<p>You clicked {count} times</p>
			<Button onClick={() => setCount(count + 1)}>
				Click me
			</Button>
		</div>
		<div className="container">
			Do awesome things!
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
