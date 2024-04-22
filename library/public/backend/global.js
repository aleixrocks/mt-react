"use strict";

class Roll {
	constructor(trait, passion) {
		this.trait = trait;
		this.determination = passion;
	}
};

const Robotta = {
	setObject(token, property, obj) {
		token.setProperty(property, JSON.stringify(obj));
	},
	getObject(token, property) {
		return JSON.parse(token.getProperty(property));
	},
}

function test() {
	MapTool.chat.broadcast("test GraalVM function called!");
}

MTScript.registerMacro("test", test);
