import { createContext, useEffect, useContext,  ReactNode } from 'react';
import { CharacterSheet } from 'shared/dist/CharacterSheet';
import { CharacterSheetFrontendUtils } from './CharacterSheetFrontendUtils';
import { useArgs } from './ArgsProvider';
import { useImmer } from 'use-immer';

const CharacterSheetContext = createContext<[CharacterSheet|null, any]>([null, null]);

export function useCharacterSheet(): [CharacterSheet, any] {
	return useContext(CharacterSheetContext) as [CharacterSheet, any];
}

export function CharacterSheetProvider({ children }: {children: ReactNode}) {
	const [character, updateCharacterSheet] = useImmer<CharacterSheet|null>(null);
	const [Args] = useArgs();
	const tokenId = Args.tokenId;

	const handleUpdateCharacterSheet = (draftFunc: any) => {
		const copy: CharacterSheet = structuredClone(character) as CharacterSheet;
		draftFunc(copy);
		CharacterSheetFrontendUtils.setCharacterSheet(tokenId, copy);
		updateCharacterSheet(draftFunc);
	};

	useEffect(() => {
		CharacterSheetFrontendUtils.getCharacterSheet(tokenId).then(character => {
			updateCharacterSheet(character);
		});
	}, [updateCharacterSheet, tokenId]);

	if (character === null) {
		return (
			<div className="container">
				<h1>Loading Token {tokenId}...</h1>
			</div>
		);
	}

	return (
		<CharacterSheetContext.Provider value={[character, handleUpdateCharacterSheet]}>
			{children}
		</CharacterSheetContext.Provider>
	);
}
