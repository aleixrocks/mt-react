import { Base64 } from 'js-base64';

let mode;

class Token {
	id: string
	properties: any;

	constructor(id:string) {
		this.properties = {};
		this.id = id;
	}

	getProperty(property: string): string {
		return this.properties[property];
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
			console.log(" ->importing module");
			const app: any = module.default(); // calls express()
			app.use(module.json());
			return app;
		});
	}

	static registerMacro(name: string, func: any) {
		FallbackMTScript.modulePromise = FallbackMTScript.modulePromise.then(app => {
			console.log(` ->Register Macro ${name}`);
			app.post(`/api/${name}`, (req, res) => {
				console.log(`api ${name} called!`);
				const data = req.body; // Get data from the request body
				const result = func(data);
				res.json(result);
			});
			return app;
		});
	}

	static start() {
		FallbackMTScript.modulePromise = FallbackMTScript.modulePromise.then(app => {
			console.log(` ->listening`);
			app.listen(5000, () => console.log('Backend listening on port 5000'));
		}).catch((error) => {
			console.error(`Critical failure on server start chain: ${error.message}`)
		});
	}
}

if (typeof globalThis.MapTool !== "object") {
	console.log("Running in a server!");
	globalThis.MapTool = FallbackMapTool;
	globalThis.MTScript = FallbackMTScript;
	console.log("Before calling init!");
	(async () => await FallbackMTScript.init())();
	console.log("after calling init!");
	mode = "browser";
} else {
	MapTool.chat.broadcast("Running in MapTool!");
	mode = "maptool";
}

MapTool.chat.broadcast("MapTool object ready!");

export const BackendUtils = {
	getToken(tokenId: string): Token {
		return MapTool.tokens.getTokenByID(tokenId);
	},
	setObject(token: Token, property: string, obj: any) {
		token.setProperty(property, JSON.stringify(obj));
	},
	getObject(token: Token, property: string): any {
		return JSON.parse(token.getProperty(property));
	},
	getRawObject(token: Token, property: string): string {
		return token.getProperty(property);
	},
	publishFunction(name: string, func: any) {
		function decodeWrapper(encodedData: string) {
			let result: any = "";
			try {
				MapTool.chat.broadcast(`decodeWrapper for ${name} called with arg ${encodedData}`);
				const decoded = Base64.decode(encodedData);
				const object = JSON.parse(decoded);
				MapTool.chat.broadcast(`decodeWrapper decoded data ${JSON.stringify(object)}`);
				result = func(object);
			} catch (error: any) {
				MapTool.chat.broadcast(`Error: decodeWrapper: ${error.message}\n${error.stack}`);
			}
			return result;
		}
		// The MapTool frontend base64 encodes the arguments. The browser based frontend does not.
		const finalFunc: any = (mode === "maptool") ? decodeWrapper : func;
		MTScript.registerMacro(name, finalFunc);
	},
	startServer() {
		if (mode === "browser") {
			FallbackMTScript.start();
		}
	},
}

