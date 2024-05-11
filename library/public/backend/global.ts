"use strict";

//class Roll {
//	constructor(trait, passion) {
//		this.trait = trait;
//		this.determination = passion;
//	}
//};

const RobottaUtils = {
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

function test() {
	MapTool.chat.broadcast("test GraalVM function called!");
}
MTScript.registerMacro("test", test);

function getRobotta(tokenId: string): string {
	MapTool.chat.broadcast("getRobotta GraalVM function called! " + tokenId);

	// get token instance
	const token = RobottaUtils.getToken(tokenId);

	// fake reading data
	const rttData: RobottaData = {
		name: "Lazuly",
		design: "Soldier",
		vitalSupport: 20,
		vitalSupportMax: 30,
		vitalSupportTemporal: 0,
		attributes: {
			calculus:   1,
			charisma:   2,
			dexterity:  3,
			firewill:   4,
			strength:   5,
			perception: 6,
		},
		traits: [
			"Desconfiada",
			"", "", "", "", "", "", ""
		],
		traitPoints: 4,
		passionPoints: 3,
		determinationPoints: 2,
		isaakPoints: 1,
		prestige: 1,
		conditions: {
			exhausted: false,
			terrorized: false,
			wounded: false,
			severelyWounded: false,
			infected: false,
		},
		professions: [
			"Investigadora",
			"", "", "", "", "", "", ""
		],
		combat: {
			directAttack: 1,
			rangeAttack: 2,
			defense: 3,
			exo: 4,
			maneuver: 5,
		},
		weapons: [{
			weapon: {
				name: "knife",
				advantage: "",
				disadvantage: "",
				damange: 3,
				distance: 0,
			},
			status: "ok",
			}, {
			weapon: {
				name: "knife",
				advantage: "",
				disadvantage: "",
				damange: 3,
				distance: 0,
			},
			status: "ok",
		},],
	}
	const rtt = new Robotta(rttData);
	RobottaUtils.setObject(token, "data", rtt);

	// retrieve data
	const data: string = RobottaUtils.getRawObject(token, "data");
	return data;
}
MTScript.registerMacro("getRobotta", getRobotta);
