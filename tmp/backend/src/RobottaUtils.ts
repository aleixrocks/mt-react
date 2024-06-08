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
	static registerMacro(name: string, func: any) {
		// TODO expose API
	}
}

if (typeof globalThis.MapTool !== "object") {
	console.log("Running in a server!");
	globalThis.MapTool = FallbackMapTool;
	globalThis.MTScript = FallbackMTScript;
} else {
	MapTool.chat.broadcast("Running in MapTool!");
}

MapTool.chat.broadcast("MapTool object ready!");

export const RobottaUtils = {
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
}
