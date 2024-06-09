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
	static module;
	static app;

	static async init() {
		try {
			FallbackMTScript.module = await import("express");
		} catch (error: any) {
			console.error(`Error importing module express:`, error);
		}
		FallbackMTScript.app = FallbackMTScript.module.default(); // calls express()
	}

	static start() {
		//FallbackMTScript.app.listen(3000, () => console.log('Backend listening on port 3000'));
	}

	static registerMacro(name: string, func: any) {
		//FallbackMTScript.app.post(`/api/${name}`, (req, res) => {
		//	const data = req.body; // Get data from the request body
		//	const result = func(data);
		//	res.json(result);
		//});
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

