const isDebugEnabled = process.env.REACT_APP_DEBUG === "true" || process.env.DEBUG === "true";

export const logDebug = (...args: any[]) => {
	if (isDebugEnabled) {
		//console.debug("[DEBUG]:", ...args);
		console.log("[DEBUG]:", ...args);
	}
};

export const logInfo = (...args: any[]) => {
	//console.info("[INFO]:", ...args);
	console.log("[INFO]:", ...args);
};

export const logError = (...args: any[]) => {
	//console.error("[ERROR]:", ...args);
	console.log("[ERROR]:", ...args);
};

