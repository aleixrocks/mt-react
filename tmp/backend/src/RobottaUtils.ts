try {
	if (MapTool && typeof MapTool === "object") {
		MapTool.chat.broadcast("Running in Maptool");
	} else {
		console.log("Running in Browser");
		throw new Error("browser");
	}
} catch (e: any) {
	// we are running in a browser where maptool is not defined. Define now a placeholder.
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

	class MapTool {
		static tokens = Tokens;
		static chat = Chat;
	}
}

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
