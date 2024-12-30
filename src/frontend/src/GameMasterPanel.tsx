import { Button } from '@chakra-ui/react'
import { Sync } from 'shared/dist/Sync';
import { useGameMaster } from './GameMasterProvider';
import { useSync } from './SyncProvider';

export function GameMasterPanel() {
	const [gm, updateGameMaster] = useGameMaster();
	const [sync, updateSync] = useSync();


	return (<>
		<Button
			onClick = {() => updateSync((draft: Sync) => {
				draft.data += "x";
			})}
		>
			Sync!
		</Button>
		<p> GM! {gm["data"]} {gm["type"]} </p>
		<p> Sync! {sync["data"]} {sync["type"]} </p>
	</>);
}

