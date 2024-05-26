console.log("Importing robotta class");

export type ExoSlotData = {
	id: string;
	status: string;
}

export type ExoSlotsData = {
	slots: ExoSlotData[];
	max: number;
}

export type ItemData = {
	name: string;
	quantitty: number;
}

export type StateData = {
	vitalSupport: number;
	vitalSupportMax: number;
	energyCells: number;
	energyCellsMax: number;
	controlledSuspension: boolean;
	energyCollapse: number;
	controlledEnergyCollpase: string;
	traitPoints: number;
	passionPoints: number;
	determinationPoints: number;
	isak: number[];
	prestige: number;
	exp: number;
}

export type FocusData = {
	motto: string,
	personalVitalFocus: string,
	collectiveVitalFocus: string,
	shortTermObjective: string,
	longTermObjective: string,
}

export type BackgroundData = {
	story: string,
	awake: string,
	maturity: string,
	turningPoint: string,
}

export type ArmorSlotData = {
	id: string;
	status: string;
}

export type WeaponSlotData = {
	id: string;
	status: string;
	ammo: number;
}

export type CombatData = {
	directAttack: number;
	rangeAttack: number;
	defense: number;
	exo: number;
	maneuver: number;
}

export type ProfessionData = {
	name: string,
	value: number,
}

export type ConditionData = {
	exhausted: boolean,
	terrorized: boolean,
	wounded: boolean,
	severelyWounded: boolean,
	infected: boolean,
};

export type TraitData = string;

export type AttributeData = {
	calculus: number;
	charisma: number;
	dexterity: number;
	firewill: number;
	strength: number;
	perception: number;
}

export type RobottaData = {
	name: string;
	design: string;
	state: StateData;
	attributes: AttributeData;
	traits: TraitData[];
	conditions: ConditionData;
	professions: ProfessionData[];
	combat: CombatData;
	weapons: WeaponSlotData[];
	armors: ArmorSlotData[];
	background: BackgroundData;
	focus: FocusData;
	inventory: ItemData[];
	exos: ExoSlotsData;
}

export class Robotta {
	name: string;
	design: string;
	state: StateData;
	attributes: AttributeData;
	traits: TraitData[]; // max 8
	conditions: ConditionData;
	professions: ProfessionData[]; // max 8
	combat: CombatData;
	weapons: WeaponSlotData[];
	armors: ArmorSlotData[];
	background: BackgroundData;
	focus: FocusData;
	inventory: ItemData[];
	exos: ExoSlotsData;

	constructor(data: RobottaData) {
		this.name = data["name"];
		this.design = data["design"];
		this.state = data["state"];
		this.attributes = data["attributes"];
		this.traits = data["traits"];
		this.conditions = data["conditions"];
		this.professions = data["professions"];
		this.combat = data["combat"];
		this.weapons = data["weapons"];
		this.armors = data["armors"];
		this.background = data["background"];
		this.focus = data["focus"];
		this.inventory = data["inventory"];
		this.exos = data["exos"];
	}

	greet() {
		return "Hello, I'm " + this.name;
	}
}
