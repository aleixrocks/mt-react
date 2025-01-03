import { logDebug, logInfo, logError } from './logger';
import {BackendUtils} from './BackendUtils';
import {CharacterSheet} from 'shared/dist/CharacterSheet';

logDebug("Add-On onInit.js start!");

// fake reading data
const defaultCharacterSheet: CharacterSheet = {
	name: "Lazuly",
	health: 10,
	attributes: {
		charisma:   2,
		dexterity:  3,
		strength:   5,
		perception: 6,
	},
}

const defaultGameMaster: GameMaster = {
	data: "hola",
	type: "hihi",
}

const defaultSync: Sync = {
	clock: 0,
}


function test(data: any) {
	logInfo("test GraalVM function called!");
}
BackendUtils.publishFunction("test", test);

function getCharacterSheet(data: any): CharacterSheet | null {
	logDebug("getCharacterSheet GraalVM function called!");
	logDebug(`data: ${JSON.stringify(data)}`);

	let res: CharacterSheet | null = null;
	const tokenId = data["tokenId"];

	try {
		logDebug(`tokenId: ${tokenId}`);
	
		// get token instance
		const token = BackendUtils.getToken(tokenId);

		// retrieve data
		res = BackendUtils.getObject(token, "data");
		if (res === null) {
			logInfo("Character Sheet not found; using default charater sheet");
			BackendUtils.setObject(token, "data", defaultCharacterSheet);
			res = BackendUtils.getObject(token, "data");
		} else {
			logDebug("Character Sheet found!");
		}
	} catch (error: any) {
		logError("Error: getCharacterSheet: " + error.stack);
	}
	return res;
}
BackendUtils.publishFunction("getCharacterSheet", getCharacterSheet);

function setCharacterSheet(data: any): string {
	logDebug("setCharacterSheet GraalVM function called!");
	logDebug(`data: ${JSON.stringify(data)}`);
	const tokenId = data["tokenId"];
	const character = data["characterSheet"];
	const token = BackendUtils.getToken(tokenId);
	BackendUtils.setObject(token, "data", character);
	return "ok";
}
BackendUtils.publishFunction("setCharacterSheet", setCharacterSheet);

function setGameMaster(data: any): string {
	logDebug("setGameMaster GraalVM function called!");
	logDebug(`data: ${JSON.stringify(data)}`);
	const gm = data["gm"];
	try {
		BackendUtils.setGlobalObject("gm", gm);
	} catch (error: any) {
		logError(`Error: setGameMaster: ${error}`);
	} 
	return "ok";
}
BackendUtils.publishFunction("setGameMaster", setGameMaster);

function getGameMaster(data: any): GameMaster | null {
	logDebug("getGameMaster GraalVM function called!");
	logDebug(`data: ${JSON.stringify(data)}`);

	let res: GameMaster | null = null;

	try {
		// retrieve data
		res = BackendUtils.getGlobalObject("gm");
		if (res === null) {
			logInfo("Game Master data not found; using default");
			BackendUtils.setGlobalObject("gm", defaultGameMaster);
			res = BackendUtils.getGlobalObject("gm");
		} else {
			logDebug("Game Master data found!");
		}
	} catch (error: any) {
		logError("Error: getGameMaster: " + error.stack);
	}
	return res;
}
BackendUtils.publishFunction("getGameMaster", getGameMaster);

function setSync(data: any): string {
	logDebug("setSync GraalVM function called!");
	logDebug(`data: ${JSON.stringify(data)}`);
	const sync = data["sync"];
	try {
		BackendUtils.setGlobalObject("sync", sync);
	} catch (error: any) {
		logError(`Error: setSync: ${error}`);
	} 
	return "ok";
}
BackendUtils.publishFunction("setSync", setSync);

function getSync(data: any): Sync | null {
	logDebug("getSync GraalVM function called!");

	let res: Sync | null = null;

	try {
		// retrieve data
		res = BackendUtils.getGlobalObject("sync");
		if (res === null) {
			logInfo("Sync data not found; using default");
			BackendUtils.setGlobalObject("sync", defaultSync);
			res = BackendUtils.getGlobalObject("sync");
		} else {
			logDebug("Game Master data found!");
		}
	} catch (error: any) {
		logError(`Error: getSync: ${error.stack}`);
	}
	return res;
}
BackendUtils.publishFunction("getSync", getSync);

BackendUtils.startServer();

logDebug("Add-On onInit.js end!");
