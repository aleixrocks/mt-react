import './App.css';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { Group, IconButton } from "@chakra-ui/react"
import { FiPlus, FiMinus } from "react-icons/fi";

import { Sync } from 'shared/dist/Sync';
import { useGameMaster } from './GameMasterProvider';
import { useSync } from './SyncProvider';

const dices = [12, 10, 8, 6, 4];

export function GameMasterPanel() {
	const [gm, updateGameMaster] = useGameMaster();
	const [sync, updateSync] = useSync();
	const currentDice = dices[Math.trunc(sync["clock"]/4)];

	return (<>
		<div className="container">
			<Group attached>
				<IconButton variant="outline" size="sm"
					disabled = {sync.clock === 16}
					onClick = {()=> updateSync((draft: Sync) => {draft.clock += 1})}
				>
					<FiPlus />
				</IconButton>
				<IconButton variant="outline" size="sm"
					disabled = {sync.clock === 0}
					onClick = {()=> updateSync((draft: Sync) => {draft.clock -= 1})}
				>
					<FiMinus />
				</IconButton>
			</Group>
			<p>Current Clock is {sync.clock}</p>
			<p>Current Dice is 1d{currentDice}</p>
			<p>GM! {gm["data"]} {gm["type"]}</p>
		</div>
	</>);
}

