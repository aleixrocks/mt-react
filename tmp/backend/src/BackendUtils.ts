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
		return Tokens.tokenList[tokenId] ?? (Tokens.tokenList[tokenId] = Token(tokenId));
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
			return module.default(); // calls express()
		});
	}

	static registerMacro(name: string, func: any) {
		FallbackMTScript.modulePromise = FallbackMTScript.modulePromise.then(app => {
			console.log(` ->Register Macro ${name}`);
			app.get(`/api/${name}`, (req, res) => {
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
			app.listen(3000, () => console.log('Backend listening on port 3000'));
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
	startServer() {
		if (mode === "browser") {
			FallbackMTScript.start();
		}
	},
}

