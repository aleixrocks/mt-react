import { ArgsProvider, useArgs } from './ArgsProvider';
import { ARGS } from './Args';
import { CharacterSheetProvider } from './CharacterSheetProvider';
import { GameMasterProvider } from './GameMasterProvider';
import { GameMasterPanel } from './GameMasterPanel';
import { CharacterSheetPanel } from './CharacterSheetPanel';
import { SyncProvider, SyncMode } from './SyncProvider';



function AppSelector() {
	const [args] = useArgs();
	const type = args.type;

	const app = (type === ARGS.GM) ? (
		<GameMasterProvider key = {ARGS.GM}>
			<SyncProvider mode={SyncMode.Server}>
				<GameMasterPanel/>
			</SyncProvider>
		</GameMasterProvider>
	) : (type === ARGS.PC) ? (
		<CharacterSheetProvider key = {ARGS.PC}>
			<SyncProvider mode={SyncMode.Client}>
				<CharacterSheetPanel/>
			</SyncProvider>
		</CharacterSheetProvider>
	) : (
		<p> Error </p>
	);

	return app;
}

function App() {
	return (
		<ArgsProvider>
			<AppSelector/>
		</ArgsProvider>
	);
}

export default App;
