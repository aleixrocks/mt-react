console.log("Importing robotta class");

type ArmourData = {
	name: string,
	absorption: number,
	penalization: string,
}

type ArmourSlotData = {
	armour: ArmourData;
	status: string;
}

type ArmourSlotsData = ArmourSlotData[];

type WeaponData = {
	name: string;
	advantage: string;
	disadvantage: string;
	damange: number;
	distance: number;
}

type WeaponSlotData = {
	weapon: WeaponData;
	status: string;
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
	attributes: AttributeData;
	vitalSupport: number;
	vitalSupportMax: number;
	vitalSupportTemporal: number;
	traits: TraitData;
	traitPoints: number;
	passionPoints: number;
	determinationPoints: number;
	isaakPoints: number;
	prestige: number;
	conditions: ConditionData;
	professions: ProfessionData;
	combat: CombatData;
	weapons: WeaponSlotsData;
	armours: ArmourSlotsData;
}

class Robotta {
	name: string;
	design: string;
	vitalSupport: number;
	vitalSupportMax: number;
	vitalSupportTemporal: number;
	attributes: AttributeData;
	traits: TraitData;
	traitPoints: number;
	passionPoints: number;
	determinationPoints: number;
	isaakPoints: number;
	prestige: number;
	conditions: ConditionData;
	professions: ProfessionData;
	combat: CombatData;
	weapons: WeaponSlotsData;
	armours: ArmourSlotsData;

	constructor(data: RobottaData) {
		this.name = data["name"];
		this.design = data["design"];
		this.vitalSupport = data["vitalSupport"];
		this.vitalSupportMax = data["vitalSupportMax"];
		this.vitalSupportTemporal = data["vitalSupportTemporal"];
		this.attributes = data["attributes"];
		this.traits = data["traits"];
		this.traitPoints = data["traitPoints"];
		this.passionPoints = data["passionPoints"];
		this.determinationPoints = data["determinationPoints"];
		this.isaakPoints = data["isaakPoints"];
		this.prestige = data["prestige"];
		this.conditions = data["conditions"];
		this.professions = data["professions"];
		this.combat = data["combat"];
		this.weapons = data["weapons"];
		this.armours = data["armours"];
	}

	greet() {
		return "Hello, I'm " + this.name;
	}
}
