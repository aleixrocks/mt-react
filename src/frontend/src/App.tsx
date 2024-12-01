import React, { useState } from 'react';
import './App.css';
import { Button } from '@chakra-ui/react'
import { CharacterSheet, AttributeData} from 'shared/dist/CharacterSheet';
import { CharacterSheetProvider, useCharacterSheet } from './CharacterSheetProvider';


function CommonAction() {
	const [character, updateCharacterSheet] = useCharacterSheet();
}

function MainApp() {
	const [count, setCount] = useState(0);
	const [character, updateCharacterSheet] = useCharacterSheet();

	return (<>
		<div className="container">
			<h1>Name: {character.name}</h1>
			<h1>Health: {character.health}</h1>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
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
