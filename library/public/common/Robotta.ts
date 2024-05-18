console.log("Importing robotta class");

type ExoSlotData = {
	id: string;
	status: string;
}

type ExoSlotsData = {
	slots: ExoSlotData[];
	max: number;
}

type ItemData = {
	name: string;
	quantitty: number;
}
type InventoryData = ItemData[];

type StateData = {
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
	isaakPoints: number;
	prestige: number;
	exp: number;
}

type FocusData = {
	motto: string,
	personalVitalFocus: string,
	collectiveVitalFocus: string,
	shortTermObjective: string,
	longTermObjective: string,
}

type BackgroundData = {
	story: string,
	awake: string,
	maturity: string,
	turningPoint: string,
}

type ArmorSlotData = {
	id: string;
	status: string;
}

type ArmorSlotsData = ArmorSlotData[];

type WeaponSlotData = {
	id: string;
	status: string;
	ammo: number;
}

type WeaponSlotsData = WeaponSlotData[];

type CombatData = {
	directAttack: number;
	rangeAttack: number;
	defense: number;
	exo: number;
	maneuver: number;
}

type ProfessionData = [
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string,
]

type ConditionData = {
	exhausted: boolean,
	terrorized: boolean,
	wounded: boolean,
	severelyWounded: boolean,
	infected: boolean,
};

type TraitData = [
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string,
]

type AttributeData = {
	calculus: number;
	charisma: number;
	dexterity: number;
	firewill: number;
	strength: number;
	perception: number;
}

type RobottaData = {
	name: string;
	design: string;
	state: StateData;
	attributes: AttributeData;
	traits: TraitData;
	conditions: ConditionData;
	professions: ProfessionData;
	combat: CombatData;
	weapons: WeaponSlotsData;
	armors: ArmorSlotsData;
	background: BackgroundData;
	focus: FocusData;
	inventory: InventoryData;
	exos: ExoSlotsData;
}

class Robotta {
	name: string;
	design: string;
	state: StateData;
	attributes: AttributeData;
	traits: TraitData;
	conditions: ConditionData;
	professions: ProfessionData;
	combat: CombatData;
	weapons: WeaponSlotsData;
	armors: ArmorSlotsData;
	background: BackgroundData;
	focus: FocusData;
	inventory: InventoryData;
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
