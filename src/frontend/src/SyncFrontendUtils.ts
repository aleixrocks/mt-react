import { FrontendUtils } from './FrontendUtils';
import { logDebug, logError } from "./logger";
import { Sync } from 'shared/dist/Sync';

export class SyncFrontendUtils {
	static async getSync(): Promise<Sync | null> {
		logDebug(`getSync`);

		let syncStr: string = await FrontendUtils.callRemoteFunction("getSync", {});
		const sync: Sync = JSON.parse(syncStr);
		if (!sync) {
			logError("Error: Could not load Game Master data");
			return null;
		}
		return sync;
	}
	static async setSync(sync: Sync) {
		const data: any = {sync: sync};
		await FrontendUtils.callRemoteFunction("setSync", data);
	}
}
