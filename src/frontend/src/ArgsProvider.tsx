import { createContext, useEffect, useState, useContext,  ReactNode } from 'react';
import { CharacterSheetFrontendUtils } from './CharacterSheetFrontendUtils';
import { Args } from './Args';

const ArgsContext = createContext<[Args|null]>([null]);

export function useArgs(): [Args] {
	return useContext(ArgsContext) as [Args];
}

export function ArgsProvider({ children }: {children: ReactNode}) {
	const [args, updateArgs] = useState<Args|null>(null);

	useEffect(() => {
		CharacterSheetFrontendUtils.getCurrentArgs().then(args => {
			updateArgs(args);
		});
	}, [updateArgs]);

	if (args === null) {
		return (
			<div className="container">
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<ArgsContext.Provider value={[args]}>
			{children}
		</ArgsContext.Provider>
	);
}
