import {CharacterSheet} from 'shared/dist/CharacterSheet';
import {FrontendUtils} from './FrontendUtils';
import { logDebug, logError } from "./logger";

export class CharacterSheetFrontendUtils {
	static async getCurrentCharacterSheet(): Promise<CharacterSheet | null> {
		const tokenId: string = await CharacterSheetFrontendUtils.getCurrentTokenId();
		const character: CharacterSheet | null = await CharacterSheetFrontendUtils.getCharacterSheet(tokenId);
		return character;
	}

	static async getCurrentTokenId(): Promise<string> {
		const dataStr: string = await MapTool.getUserData();
		const data: any = JSON.parse(dataStr);
		const tokenId = data["currentTokenId"];
		return tokenId;
	}

	static async getCharacterSheet(tokenId: string): Promise<CharacterSheet | null> {
		logDebug(`getCharacterSheet tokenId=${tokenId}`);

		const data: any = {tokenId: tokenId};
		let characterStr: string = await FrontendUtils.callRemoteFunction("getCharacterSheet", data);
		const character: CharacterSheet = JSON.parse(characterStr);
		if (!character) {
			logError(`Error: Could not load CharacterSheet with id ${tokenId}`);
			return null;
		}
		return character;
	}

	static async setCharacterSheet(tokenId: string, character: CharacterSheet) {
		const data: any = {tokenId: tokenId, characterSheet: character};
		await FrontendUtils.callRemoteFunction("setCharacterSheet", data);
	}
}
