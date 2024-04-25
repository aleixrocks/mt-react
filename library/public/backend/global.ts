"use strict";

//class Roll {
//	constructor(trait, passion) {
//		this.trait = trait;
//		this.determination = passion;
//	}
//};

const Robotta = {
	setObject(token: Token, property: string, obj: any) {
		token.setProperty(property, JSON.stringify(obj));
	},
	getObject(token: Token, property: string) : any {
		return JSON.parse(token.getProperty(property));
	},
}

function test() {
	MapTool.chat.broadcast("test GraalVM function called!");
}

MTScript.registerMacro("test", test);
