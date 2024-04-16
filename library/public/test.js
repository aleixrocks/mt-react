"use strict";

//class Roll {
//	constructor(trait, passion) {
//		this.trait = trait;
//		this.determination = passion;
//	}
//}

try {
	let roll = new Roll(1, 2);
	let tokenId = args[0];
	let token = MapTool.tokens.getTokenById();
	token.setProperty(currentRoll, roll);

	let message = "hello world 2";
	MapTool.chat.broadcast(message);
} catch(e) {
	MapTool.chat.broadcast(""+e+"\n"+e.stack);
}
