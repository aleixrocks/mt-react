console.log("Importing robotta class");

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
}

class Attributes {
	calculus: number;
	charisma: number;
	dexterity: number;
	firewill: number;
	strength: number;
	perception: number;

	constructor(data: AttributeData) {
		this.calculus   = data["calculus"];
		this.charisma   = data["charisma"];
		this.dexterity  = data["dexterity"];
		this.firewill   = data["firewill"];
		this.strength   = data["strength"];
		this.perception = data["perception"];
	}
}

class Robotta {
	name: string;
	design: string;
	attributes: Attributes;

	constructor(data: RobottaData) {
		this.name = data["name"];
		this.design = data["design"];
		this.attributes = new Attributes(data["attributes"]);
	}

	greet() {
		return "Hello, I'm " + this.name;
	}
}
