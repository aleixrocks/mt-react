MapTool.chat.broadcast("Add-On onInit.js start!");


import {RobottaUtils} from './RobottaUtils';
import {Robotta, RobottaData} from 'shared/dist/Robotta';


function test() {
	MapTool.chat.broadcast("test GraalVM function called!");
}
MTScript.registerMacro("test", test);

function getRobotta(tokenId: string): string {
	let data: string = "";
	try {
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
				isak: [-1, -1, -1, 3, 28],
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
				"Ambiciosa",
				"Familiar",
			],
			conditions: {
				exhausted: false,
				terrorized: false,
				wounded: false,
				severelyWounded: false,
				infected: false,
			},
			professions: [
				{
					name: "Investigadora",
					value: 2,
				}, {
					name: "Militar",
					value: 1,
				}
			],
			combat: {
				directAttack: 1,
				rangeAttack: 2,
				defense: 3,
				exo: 4,
				maneuver: 5,
			},
			weapons: [{
				id: "Pistolas",
				status: "ok",
				ammo: 10,
			}, {
				id: "Espadas",
				status: "ok",
				ammo: 0,
			}],
			armors: [
				{
					id: "Armadura molecular básica",
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
						id: "Kit profesión avanzado",
						status: "ok",
					}, {
						id: "Mejora básica de arma",
						status: "ok",
					},
				],
				max: 10,
			},
		}
		const rtt = new Robotta(rttData);
		RobottaUtils.setObject(token, "data", rtt);
	
		// retrieve data
		data = RobottaUtils.getRawObject(token, "data");
	} catch (error: any) {
		MapTool.chat.broadcast("Error: getRobotta: " + error.stack);
	}
	return data;
}
MTScript.registerMacro("getRobotta", getRobotta);


MapTool.chat.broadcast("Add-On onInit.js end!");
