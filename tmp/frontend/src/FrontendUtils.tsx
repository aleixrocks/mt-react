import {Robotta, RobottaData} from 'shared/dist/Robotta';

let mode: any;

class FallbackMapTool {
	static async getUserData(): Promise<any> {
		return new Promise ((resolve, reject) => {
			const data: any = {currentTokenId: "fakeTokenId"};
			resolve(JSON.stringify(data));
		});
	}
}

if (typeof (globalThis as any).MapTool !== "object") {
	console.log("Running in a Browser!");
	(globalThis as any).MapTool = FallbackMapTool;
	mode = "browser";
} else {
	console.log("Running in MapTool!");
	mode = "maptool";
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
		let rttStr: any;
		console.log(`getRobotta mode ${mode}`);
		console.log(`getRobotta tokenId ${tokenId}`);
		if (mode === "maptool") {
			const msg: string = `[r: js.getRobotta(${JSON.stringify(data)})]`;
			rttStr = await FrontendUtils.callMTScriptMacro(msg);
		} else {
			rttStr = await FrontendUtils.callBackendFunction("getRobotta", data);
		}
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

	static async callBackendFunction(name: string, data: any): Promise<any> {
		try {
			console.log("### calling callBackendFunction!");
			console.log(`### data ${JSON.stringify(data)}`);
			let uri = `/api/${name}`;
			let r = await fetch(uri, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			let result = await r.text();
			console.log("### callBackendFunction result="+result);
			return result;
		} catch (error: any) {
			console.log("### callBackendFunction error: " + error.stack);
		}
		return null;
	}
}
