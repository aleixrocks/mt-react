MapTool.chat.broadcast("start: Loading GraalVM onInit.js");
function test(data) {
	MapTool.chat.broadcast("start: test GraalVM function");
	try {
		MTScript.evalMacro('[hi]');
	} catch (error) {
		MapTool.chat.broadcast(`[ERROR] evalMacro: ${error}`);
	}
	MapTool.chat.broadcast("end: test GraalVM function");
}
MTScript.registerMacro("test", test);
MapTool.chat.broadcast("end: Loading GraalVM onInit.js");
