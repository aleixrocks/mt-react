import { createContext, useEffect, useState, useContext,  ReactNode } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { CharacterSheetFrontendUtils } from './CharacterSheetFrontendUtils';
import { Args, ARGS } from './Args';
import { logDebug } from './logger';
import { FrontendUtils } from './FrontendUtils';

const ArgsContext = createContext<[Args|null]>([null]);

export function useArgs(): [Args] {
	return useContext(ArgsContext) as [Args];
}

export function ArgsProviderMapTool({ children }: {children: ReactNode}) {
	const [args, updateArgs] = useState<Args|null>(null);

	// Schedule MT read args operation
	useEffect(() => {
		CharacterSheetFrontendUtils.getCurrentArgs().then(args => {
			logDebug(`ArgsProvider: ${JSON.stringify(args)}`);
			updateArgs(args);
		});
	}, [updateArgs]);

	if (args === null) {
		return (
			<div className="container">
				<h1>Loading Args from MapTool...</h1>
			</div>
		);
	}

	return (
		<ArgsContext.Provider value={[args]}>
			{children}
		</ArgsContext.Provider>
	);
}

export function ArgsProviderBrowser({ children }: {children: ReactNode}) {
	const [args, updateArgs] = useState<Args|null>(null);
	const [asyncArgs, updateAsyncArgs] = useState<Args|null>(null);
	const location = useLocation();

	// if we have not set up the args yet
	if (args === null) {
		// first attempt to get it from query parameters
		const searchParams = new URLSearchParams(location.search);
		const currentTokenId = searchParams.get('currentTokenId');
		const type = searchParams.get('type');
		if (type === ARGS.GM || type === ARGS.PC) {
			const tmp: Args = {
				currentTokenId: currentTokenId ?? "",
				type: type
			};
			logDebug(`ArgsProvider: Using Query Parameters ${args}`);
			updateArgs(tmp);
		} else {
			// otherwise attempt to set args from async context
			if (asyncArgs !== null) {
				logDebug(`ArgsProvider: Using MT Args ${asyncArgs}`);
				updateArgs(asyncArgs);
			}
		}
	}

	// Schedule MT read args operation
	useEffect(() => {
		CharacterSheetFrontendUtils.getCurrentArgs().then(args => {
			logDebug(`ArgsProvider: ${JSON.stringify(args)}`);
			updateAsyncArgs(args);
		});
	}, [updateAsyncArgs]);

	if (args === null) {
		return (
			<div className="container">
				<h1>Loading Args from Browser...</h1>
			</div>
		);
	}

	return (
		<ArgsContext.Provider value={[args]}>
			{children}
		</ArgsContext.Provider>
	);
}

export function ArgsProvider({ children }: {children: ReactNode}) {
	// The Router component does not work in maptool (it does not render its
	// children), therefore, we need to provide different code paths :(
	const selector = FrontendUtils.isMapTool() ? (
		<ArgsProviderMapTool key="args-provider-maptool">
			{children}
		</ArgsProviderMapTool>
	) : (
		<Router key="args-provider-browser">
			<ArgsProviderBrowser>
				{children}
			</ArgsProviderBrowser>
		</Router>
	);

	return selector;
}
