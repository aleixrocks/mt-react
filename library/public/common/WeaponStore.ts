type weaponStoreData = {
	name: string,
	advantage: string,
	disadvantage: string,
	damage: number,
	baseRange: number,
	extendedRange: number,
	price: number,
	ammo: number
}

const weaponStore: weaponStoreData[] = [{
	name: "Armas de asta",
	advantage: "+2 si mejora posición (aparte del +4 base).",
	disadvantage: "-2 si empeora posición (aparte del +4 base).",
	damage: 2,
	baseRange: 0,
	extendedRange: 0,
	price: 25,
	ammo: 0
},{
	name: "Atrapadoras",
	advantage: "+2 a las Maniobras Empeorar posición, Desarmar e Inmovilizar",
	disadvantage: "",
	damage: 0,
	baseRange: 100,
	extendedRange: 200,
	price: 90,
	ammo: 0
},{
	name: "Cañones",
	advantage: "+4 a Ataque a distancia.",
	disadvantage: "-2 a Defensa.-2 a Maniobra.-2 a Exo.",
	damage: 10,
	baseRange: 300,
	extendedRange: 500,
	price: 250,
	ammo: 5 
},{
	name: "Espadas",
	advantage: "+2 a Maniobra.",
	disadvantage: "",
	damage: 2,
	baseRange: 0,
	extendedRange: 0,
	price: 20,
	ammo: 0
},{
	name: "Granadas",
	advantage: "Ignoran Absorción.",
	disadvantage: "-3 a Maniobra",
	damage: 8,
	baseRange: 50,
	extendedRange: 150,
	price: 20,
	ammo: 0
},{
	name: "Hachas",
	advantage: "Ignoran Absorción.",
	disadvantage: "",
	damage: 2,
	baseRange: 0,
	extendedRange: 0,
	price: 25,
	ammo: 0
},{
	name: "Pistolas",
	advantage: "+2 a Ataque a distancia.",
	disadvantage: "",
	damage: 3,
	baseRange: 90,
	extendedRange: 130,
	price: 90,
	ammo: 10
},{
	name: "Rifles de asalto",
	advantage: "+3 a Ataque a distancia",
	disadvantage: "-1 a Defensa",
	damage: 3,
	baseRange: 350,
	extendedRange: 2000,
	price: 120,
	ammo: 8
}]
