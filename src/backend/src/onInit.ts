MapTool.chat.broadcast("Add-On onInit.js start!");

import {BackendUtils} from './BackendUtils';
import {CharacterSheet} from 'shared/dist/CharacterSheet';

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
	MapTool.chat.broadcast("test GraalVM function called!");
}
BackendUtils.publishFunction("test", test);

function getCharacterSheet(data: any): CharacterSheet | null {
	MapTool.chat.broadcast("getCharacterSheet GraalVM function called!");
	MapTool.chat.broadcast(`data: ${JSON.stringify(data)}`);

	let res: CharacterSheet | null = null;
	const tokenId = data["tokenId"];

	try {
		MapTool.chat.broadcast("getCharacterSheet GraalVM function called! " + tokenId);
	
		// get token instance
		const token = BackendUtils.getToken(tokenId);

		// retrieve data
		res = BackendUtils.getObject(token, "data");
		if (res === undefined) {
			MapTool.chat.broadcast("Character Sheet not found; using default charater sheet");
			BackendUtils.setObject(token, "data", defaultCharacterSheet);
			res = BackendUtils.getObject(token, "data");
		} else {
			MapTool.chat.broadcast("Character Sheet found!");
		}
	} catch (error: any) {
		MapTool.chat.broadcast("Error: getCharacterSheet: " + error.stack);
	}
	return res;
}
BackendUtils.publishFunction("getCharacterSheet", getCharacterSheet);

function setCharacterSheet(data: any): string {
	MapTool.chat.broadcast("setCharacterSheet GraalVM function called!");
	MapTool.chat.broadcast(`data: ${JSON.stringify(data)}`);
	const tokenId = data["tokenId"];
	const character = data["characterSheet"];
	const token = BackendUtils.getToken(tokenId);
	BackendUtils.setObject(token, "data", character);
	return "ok";
}
BackendUtils.publishFunction("setCharacterSheet", setCharacterSheet);

BackendUtils.startServer();

MapTool.chat.broadcast("Add-On onInit.js end!");
