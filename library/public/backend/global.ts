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
		state: {
			vitalSupport: 20,
			vitalSupportMax: 30,
			energyCells: 50,
			energyCellsMax: 60,
			controlledSuspension: false,
			energyCollapse: 0,
			controlledEnergyCollpase: "",
			traitPoints: 5,
			passionPoints: 5,
			determinationPoints: 5,
			isaakPoints: 5,
			prestige: 0,
			exp: 3,
		},
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
				advantage: [
					{
						type: "normal",
						description: "TODO",
					},
				],
				disadvantage: [
					{
						type: "normal",
						description: "TODO",
					},
				],
				damange: 3,
				distance: 0,
			},
			status: "ok",
			}, {
			weapon: {
				name: "knife",
				advantage: [
					{
						type: "normal",
						description: "TODO",
					},
				],
				disadvantage: [
					{
						type: "normal",
						description: "TODO",
					},
				],
				damange: 3,
				distance: 0,
			},
			status: "ok",
		}],
		armours: [
			{
				armour: {
					name: "Shield",
					absorption:  10,
					penalization: "TODO",
				},
				status: "ok",
			}
		],
		background: {
			story: "Ella mola.",
			awake: "La alarma la despertó.",
			maturity: "Trabajó como investigadora.",
			turningPoint: "No me acuerdo.",
		},
		focus: {
			motto: "Matalos a todos!.",
			personalVitalFocus: "TODO.",
			collectiveVitalFocus: "Setitas al poder!",
			shortTermObjective: "Perfectionar el Synapse.",
			longTermObjective: "Vengarse de Xeon08.",
		},
		inventory: [
			{
				name: "Synapse",
				quantitty: 1,
			}, {
				name: "Screwdriver",
				quantitty: 1,
			},
		],
		exos: {
			slots: [
				{
					slot: {
						name: "Acumulador de CE",
						portType: [1,5],
						ceConsumption: 1,
						ceConsumptionRate: 1,
						ceConsumptionUnit: "usage",
						description: "Acumula una reserva energética de emergencia de 50 CE.",
						effects: [{
							type: "normal",
							description: "TODO",
						}],
					},
					status: "ok",
				},
			],
			max: 10,
		},
	}
	const rtt = new Robotta(rttData);
	RobottaUtils.setObject(token, "data", rtt);

	// retrieve data
	const data: string = RobottaUtils.getRawObject(token, "data");
	return data;
}
MTScript.registerMacro("getRobotta", getRobotta);
