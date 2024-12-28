import { createContext, useEffect, useContext,  ReactNode } from 'react';
import { GameMaster } from 'shared/dist/GameMaster';
import { GameMasterFrontendUtils } from './GameMasterFrontendUtils';
import { useImmer } from 'use-immer';

const GameMasterContext = createContext<[GameMaster|null, any]>([null, null]);

export function useGameMaster(): [GameMaster, any] {
	return useContext(GameMasterContext) as [GameMaster, any];
}

export function GameMasterProvider({ children }: {children: ReactNode}) {
	const [gm, updateGameMaster] = useImmer<GameMaster|null>(null);

	const handleUpdateGameMaster = (draftFunc: any) => {
		const copy: GameMaster = structuredClone(gm) as GameMaster;
		draftFunc(copy);
		GameMasterFrontendUtils.setGameMaster(copy);
		updateGameMaster(draftFunc);
	};

	useEffect(() => {
		GameMasterFrontendUtils.getGameMaster().then(gm => {
			updateGameMaster(gm);
		});
	}, [updateGameMaster]);

	if (gm === null) {
		return (
			<div className="container">
				<h1>Loading Game Master data...</h1>
			</div>
		);
	}

	return (
		<GameMasterContext.Provider value={[gm, handleUpdateGameMaster]}>
			{children}
		</GameMasterContext.Provider>
	);
}
