console.log("Importing robotta class");

export type AttributeData = {
	charisma: number;
	dexterity: number;
	strength: number;
	perception: number;
}

export type CharacterSheet = {
	name: string;
	health: number;
	attributes: AttributeData;
}
