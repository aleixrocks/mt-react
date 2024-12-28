import { FrontendUtils } from './FrontendUtils';
import { logDebug, logError } from "./logger";
import { GameMaster } from 'shared/dist/GameMaster';

export class GameMasterFrontendUtils {
	static async getGameMaster(): Promise<GameMaster | null> {
		logDebug(`getGameMaster`);

		let gmStr: string = await FrontendUtils.callRemoteFunction("getGameMaster", {});
		const gm: GameMaster = JSON.parse(gmStr);
		if (!gm) {
			logError("Error: Could not load Game Master data");
			return null;
		}
		return gm;
	}
	static async setGameMaster(gm: GameMaster) {
		const data: any = {gm: gm};
		await FrontendUtils.callRemoteFunction("setGameMaster", data);
	}
}
