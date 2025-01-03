const isDebugEnabled = false;

export const logDebug = (msg: string) => {
	if (isDebugEnabled) {
		MapTool.chat.broadcast(`[DEBUG]: ${msg}`);
	}
};

export const logInfo = (msg: string) => {
	MapTool.chat.broadcast(`[INFO]: ${msg}`);
};

export const logError = (msg: string) => {
	MapTool.chat.broadcast(`[ERROR]: ${msg}`);
};

