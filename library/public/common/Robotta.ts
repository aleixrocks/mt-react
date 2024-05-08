console.log("Importing robotta class");

class Robotta {
	name: string;

	constructor(name:string) {
		this.name = name;
	}

	greet() {
		return "Hello, I'm " + this.name;
	}
}
