import {Robotta} from 'shared/dist/Robotta';
import {FrontendUtils} from './FrontendUtils';

export class RobottaFrontendUtils {
	//static async getCurrentRobotta(): Promise<Robotta | null> {
	//	const tokenId: string = await RobottaFrontendUtils.getCurrentTokenId();
	//	const rtt: Robotta | null = await RobottaFrontendUtils.getRobotta(tokenId);
	//	return rtt;
	//}

	static async getCurrentTokenId(): Promise<string> {
		const dataStr: string = await MapTool.getUserData();
		const data: any = JSON.parse(dataStr);
		const tokenId = data["currentTokenId"];
		return tokenId;
	}

	static async getRobotta(tokenId: string): Promise<Robotta | null> {
		console.log(`getRobotta tokenId ${tokenId}`);

		const data: any = {tokenId: tokenId};
		let rttStr: string = await FrontendUtils.callRemoteFunction("getRobotta", data);
		const rtt: Robotta = JSON.parse(rttStr);
		if (!rtt) {
			console.log(`Error: Could not load Robotta with id ${tokenId}`);
			return null;
		}
		return rtt;
	}

	static async setRobotta(tokenId: string, rtt: Robotta) {
		const data: any = {tokenId: tokenId, robotta: rtt};
		const msg: string = await FrontendUtils.callRemoteFunction("setRobotta", data);
	}
}
