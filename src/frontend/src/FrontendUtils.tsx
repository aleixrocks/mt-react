import { logDebug, logInfo, logError } from "./logger";

const enum Modes {
	None = "None",
	Maptool = "Maptool",
	Browser = "Browser"
};
let mode: Modes = Modes.None;

class FallbackMapTool {
	static async getUserData(): Promise<any> {
		return new Promise ((resolve, reject) => {
			const data: any = {currentTokenId: "fakeTokenId", type: "PC"};
			resolve(JSON.stringify(data));
		});
	}
}

if (typeof (globalThis as any).MapTool !== "object") {
	logInfo("Running in a Browser!");
	(globalThis as any).MapTool = FallbackMapTool;
	mode = Modes.Browser;
} else {
	logInfo("Running in MapTool!");
	mode = Modes.Maptool;
}

export class FrontendUtils {
	static async callRemoteFunction(name: string, data: any): Promise<any> {
		let reply: string;

		if (mode === Modes.Maptool) {
			reply = await FrontendUtils.callMTScriptMacro(name, data);
		} else if (mode === Modes.Browser) {
			reply = await FrontendUtils.callBackendFunction(name, data);
		} else {
			reply = "";
			console.error(`Invalid mode ${mode}`);
		}

		return reply;
	}

	static async callMTScriptMacro(name: string, data: any): Promise<any> {
		const encodedData: string = btoa(JSON.stringify(data));
		const macro: string = `[r: js.${name}('${encodedData}')]`;
		try {
			logDebug(`### calling callMTScriptMacro! with macro ${macro}`);
			let uri = "macro:evaluateMacro@lib:com.github.aleixrocks.charactersheet";
			let r = await fetch(uri, { method: "POST", body: macro });
			let result = await r.text();
			logDebug(`### callMTScriptMacro result: ${result}`);
			return result;
		} catch (error: any) {
			logError(`### callMTScriptMacro error: ${error.stack}`);
		}
		return null;
	}

	static async callBackendFunction(name: string, data: any): Promise<any> {
		const encodedData: string = JSON.stringify(data);
		try {
			logDebug("### calling callBackendFunction!");
			let uri = `/api/${name}`;
			let r = await fetch(uri, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: encodedData
			});
			let result = await r.text();
			logDebug("### callBackendFunction result="+result);
			return result;
		} catch (error: any) {
			logError("### callBackendFunction error: " + error.stack);
		}
		return null;
	}
}
