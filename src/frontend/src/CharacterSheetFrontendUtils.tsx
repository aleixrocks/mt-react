import {CharacterSheet} from 'shared/dist/CharacterSheet';
import {FrontendUtils} from './FrontendUtils';
import { logDebug, logError } from "./logger";

export class CharacterSheetFrontendUtils {
	static async getCurrentCharacterSheet(): Promise<CharacterSheet | null> {
		const tokenId: string = await CharacterSheetFrontendUtils.getCurrentTokenId();
		const rtt: CharacterSheet | null = await CharacterSheetFrontendUtils.getCharacterSheet(tokenId);
		return rtt;
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
		let rttStr: string = await FrontendUtils.callRemoteFunction("getCharacterSheet", data);
		const rtt: CharacterSheet = JSON.parse(rttStr);
		if (!rtt) {
			logError(`Error: Could not load CharacterSheet with id ${tokenId}`);
			return null;
		}
		return rtt;
	}

	static async setCharacterSheet(tokenId: string, rtt: CharacterSheet) {
		const data: any = {tokenId: tokenId, characterSheet: rtt};
		await FrontendUtils.callRemoteFunction("setCharacterSheet", data);
	}
}
