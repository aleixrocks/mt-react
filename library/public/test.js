"use strict";

try {
	let args = MTScript.getMTScriptCallingArgs();
	MapTool.chat.broadcast(`${args.length}: ${args[0]}`);
	let roll = new Roll(1, 2);
	//MapTool.chat.broadcast(""+arguments.length);
	//let tokenId = arguments[0];
	//MapTool.chat.broadcast(tokenId);
	//let token = MapTool.tokens.getTokenById(tokenId);
	//token.setProperty(currentRoll, roll);

	//let message = "hello world 2";
	//MapTool.chat.broadcast(message);
} catch(e) {
	MapTool.chat.broadcast(""+e+"\n"+e.stack);
}
