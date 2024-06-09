import {Robotta, RobottaData} from 'shared/dist/Robotta';


class FallbackMapTool {
	static async getUserData(): Promise<any> {
		return new Promise ((resolve, reject) => {
			resolve({currentTokenId: "fakeTokenId"});
		});
	}
}

if (typeof (globalThis as any).MapTool !== "object") {
	console.log("Running in a Browser!");
	(globalThis as any).MapTool = FallbackMapTool;
} else {
	console.log("Running in MapTool!");
}

export class FrontendUtils {
	static async getCurrentRobotta(): Promise<Robotta | null> {
		const tokenId: string = await FrontendUtils.getCurrentTokenId();
		const rtt: Robotta | null = await FrontendUtils.getRobotta(tokenId);
		return rtt;
	}

	static async getCurrentTokenId(): Promise<string> {
		const dataStr: string = await MapTool.getUserData();
		const data: any = JSON.parse(dataStr);
		const tokenId = data["currentTokenId"];
		return tokenId;
	}

	static async getRobotta(tokenId: string): Promise<Robotta | null> {
		const data: any = {tokenId: tokenId};
		const msg: string = `[r: js.getRobotta(${JSON.stringify(data)})]`;
		const rttStr: any = await FrontendUtils.callMTScriptMacro(msg);
		const rttObj: RobottaData = JSON.parse(rttStr);
		const rtt: Robotta = new Robotta(rttObj);
		if (!rtt) {
			console.log(`Error: Could not load Robotta with id ${tokenId}`);
			return null;
		}
		return rtt;
	}

	static async callMTScriptMacro(macro: string): Promise<any> {
		try {
			console.log("### calling callMTScriptMacro!");
			let uri = "macro:evaluateMacro@lib:com.gitlab.aleixrocks.robotta";
			let r = await fetch(uri, { method: "POST", body: macro });
			let result = await r.text();
			console.log("### callMTScriptMacro result="+result);
			return result;
		} catch (error: any) {
			console.log("### callMTScriptMacro error: " + error.stack);
		}
		return null;
	}
}
