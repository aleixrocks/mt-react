const enum Modes {
	None = "None",
	Maptool = "Maptool",
	Browser = "Browser"
};
let mode: Modes = Modes.None;

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
	mode = Modes.Browser;
} else {
	console.log("Running in MapTool!");
	mode = Modes.Maptool;
}

export class FrontendUtils {
	static async callRemoteFunction(name: string, data: any): Promise<any> {
		let reply: string;

		if (mode === Modes.Maptool) {
			reply = await FrontendUtils.callMTScriptMacro("getRobotta", data);
		} else if (mode === Modes.Browser) {
			reply = await FrontendUtils.callBackendFunction("getRobotta", data);
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
			console.log(`### calling callMTScriptMacro! with macro ${macro}`);
			let uri = "macro:evaluateMacro@lib:com.gitlab.aleixrocks.robotta";
			let r = await fetch(uri, { method: "POST", body: macro });
			let result = await r.text();
			console.log(`### callMTScriptMacro result: ${result}`);
			return result;
		} catch (error: any) {
			console.log(`### callMTScriptMacro error: ${error.stack}`);
		}
		return null;
	}

	static async callBackendFunction(name: string, data: any): Promise<any> {
		const encodedData: string = JSON.stringify(data);
		try {
			console.log("### calling callBackendFunction!");
			let uri = `/api/${name}`;
			let r = await fetch(uri, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: encodedData
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
