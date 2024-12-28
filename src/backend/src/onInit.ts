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
	return "ok";
}
BackendUtils.publishFunction("setGameMaster", setGameMaster);

function getGameMaster(data: any): GameMaster | null {
	logDebug("getGameMaster GraalVM function called!");
	logDebug(`data: ${JSON.stringify(data)}`);

	let res: GameMaster | null = null;

	try {
		// retrieve data
		res = BackendUtils.getGlobalObject("data");
		if (res === null) {
			logInfo("Game Master data not found; using default");
			BackendUtils.setGlobalObject("data", defaultGameMaster);
			res = BackendUtils.getGlobalObject("data");
		} else {
			logDebug("Game Master data found!");
		}
	} catch (error: any) {
		logError("Error: getGameMaster: " + error.stack);
	}
	return res;
}
BackendUtils.publishFunction("getGameMaster", getGameMaster);

BackendUtils.startServer();

logDebug("Add-On onInit.js end!");
