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

BackendUtils.startServer();

logDebug("Add-On onInit.js end!");
