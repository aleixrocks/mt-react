"use strict";

try {
	MapTool.chat.broadcast("test.js macro called!!");
	let args = MTScript.getMTScriptCallingArgs();
	MapTool.chat.broadcast(`num args ${args.length}: ${args}`);
	MapTool.chat.broadcast(` - arg[0]: ${args[0]}`);
	let tokenId = args[0];
	let token = MapTool.tokens.getTokenByID(tokenId);
	let tmp = {
		potato: 1,
	};

	Robotta.setObject(token, "tmp", tmp);
	let tmp2 = Robotta.getObject(token, "tmp", tmp);
	MapTool.chat.broadcast(JSON.stringify(tmp2));

	//let roll = new Roll(1, 2);
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
