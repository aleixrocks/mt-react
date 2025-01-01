import { Base64 } from 'js-base64';
import { logDebug, logInfo, logError } from './logger';
import { addOnNamespace } from 'shared/dist/Common';

const enum Modes {
	None = "None",
	Maptool = "Maptool",
	Browser = "Browser"
};
let mode: Modes = Modes.None;

class Token {
	id: string
	properties: any;

	constructor(id:string) {
		this.properties = {};
		this.id = id;
	}

	getProperty(property: string): string {
		const val = this.properties[property];
		return val === undefined ? null : val;
	}

	setProperty(property: string, value: string) {
		this.properties[property] = value;
	}
}

class Tokens {
	static tokenList:any = {};

	static getTokenByID(tokenId:string): Token {
		return Tokens.tokenList[tokenId] ?? (Tokens.tokenList[tokenId] = new Token(tokenId));
	}
}

class Chat {
	static broadcast(msg:string) {
		console.log(msg);
	}
}

class FallbackMapTool {
	static tokens = Tokens;
	static chat = Chat;
}

class FallbackMTScript {
	static modulePromise;

	static init() {
		FallbackMTScript.modulePromise = import("express").then(module => {
			logDebug(" ->importing module");
			const app: any = module.default(); // calls express()
			app.use(module.json());
			return app;
		});
	}

	static registerMacro(name: string, func: any) {
		FallbackMTScript.modulePromise = FallbackMTScript.modulePromise.then(app => {
			logDebug(` ->Register Macro ${name}`);
			app.post(`/api/${name}`, (req, res) => {
				logDebug(`api ${name} called!`);
				const data = req.body; // Get data from the request body
				const result = func(data);
				res.json(result);
			});
			return app;
		});
	}

	static start() {
		FallbackMTScript.modulePromise = FallbackMTScript.modulePromise.then(app => {
			logDebug(` ->listening`);
			app.listen(5000, () => logInfo('Backend listening on port 5000'));
		}).catch((error) => {
			logError(`Critical failure on server start chain: ${error.message}`)
		});
	}
}

if (typeof globalThis.MapTool !== "object") {
	globalThis.MapTool = FallbackMapTool;
	logInfo("Running in Server mode!");
	globalThis.MTScript = FallbackMTScript;
	var globalData = {};
	(async () => await FallbackMTScript.init())();
	mode = Modes.Browser;
} else {
	mode = Modes.Maptool;
	logInfo("Running in MapTool mode!");
}

logDebug("MapTool object ready!");

export const BackendUtils = {
	getToken(tokenId: string): Token {
		return MapTool.tokens.getTokenByID(tokenId);
	},
	setObject(token: Token, property: string, obj: any) {
		token.setProperty(property, JSON.stringify(obj));
	},
	getObject(token: Token, property: string): any {
		let value = token.getProperty(property);
		logDebug(`getObject: ${value}`);
		return (value !== null) ? JSON.parse(value) : value;
	},
	getRawObject(token: Token, property: string): string {
		return token.getProperty(property);
	},
	getGlobalObject(property: string): any {
		let value;
		if (mode === Modes.Browser) {
			value = globalData[property] ?? null;
		} else {
			const cmd = `[h: returnedData = getLibProperty('${property}', 'Lib:${addOnNamespace}')]`;
			logDebug(`calling: ${cmd}`);

			//try {
			//	logDebug("before calling getMapTokens");
			//	//MTScript.evalMacro(`[hola]`);
			//	MTScript.evalMacro(`[hola]`);
			//	let token = MapTool.tokens.getMapTokens();
			//	logDebug(`after calling getMapTokens: ${token}`);
			//} catch (error: any) {
			//	logError(`evalMacro: ${error}`);
			//	value = null;
			//}

			//try {
			//	logDebug("setVariable");
			//	MTScript.setVariable("varName", property);
			//	logDebug("getVariable");
			//	value = MTScript.getVariable("returnedData");
			//	logDebug(`returned value: ${value}`);
			//	MTScript.evalMacro(`[h: returnedData = getLibProperty(varName, 'Lib:${addOnNamespace}')]`);
			//	logDebug(`getVariable again`);
			//	value = MTScript.getVariable("returnedData");
			//	logDebug(`returned value: ${value}`);
			//} catch (error: any) {
			//	logError(`evalMacro: ${error}`);
			//	value = null;
			//}

			try {
				MTScript.evalMacro(cmd);
			} catch (error: any) {
				logError(`evalMacro: ${error}`);
			}

			logDebug('getting back result');
			try {
				value = MTScript.getVariable("returnedData");
			} catch (error: any) {
				logError(`getVariable: ${error}`);
				value = null;
			}
		}
		logDebug(`getGlobalObject: ${property}: ${value}`);
		return (value !== null && value !== undefined && value !== "") ? JSON.parse(value) : null;
	},
	setGlobalObject(property: string, obj: any) {
		const value = JSON.stringify(obj);
		logDebug(`setGlobalObject: ${property}: ${value}`);
		if (mode === Modes.Browser) {
			globalData[property] = value;
		} else {

			//try {
			//	MTScript.setVariable("varName", property);
			//	MTScript.setVariable("varValue", value);
			//	MTScript.evalMacro(`[h: setLibProperty(varName, varValue, 'Lib:${addOnNamespace}')]`)
			//} catch (error: any) {
			//	logError(`evalMacro: ${error}`);
			//}

			const cmd = `[setLibProperty('${property}', '${value}', 'lib:${addOnNamespace}')]`;
			logDebug(`calling: ${cmd}`);
			try {
				MTScript.evalMacro(cmd);
			} catch (error: any) {
				logError(`evalMacro: ${error}`);
			}
		}
	},
	publishFunction(name: string, func: any) {
		function decodeWrapper(encodedData: string) {
			let result: any = "";
			let object = null;
			try {
				logDebug(`decodeWrapper for ${name} called with arg ${encodedData}`);
				if (encodedData) {
					const decoded = Base64.decode(encodedData);
					object = JSON.parse(decoded);
				}
				logDebug(`decodeWrapper decoded data ${JSON.stringify(object)}`);
				result = func(object);
			} catch (error: any) {
				logError(`Error: decodeWrapper: ${error.message}\n${error.stack}`);
			}
			return result;
		}
		// The MapTool frontend base64 encodes the arguments. The browser based frontend does not.
		const finalFunc: any = (mode === Modes.Maptool) ? decodeWrapper : func;
		MTScript.registerMacro(name, finalFunc);
	},
	startServer() {
		if (mode === Modes.Browser) {
			FallbackMTScript.start();
		}
	},
}

