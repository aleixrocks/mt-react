export type ArmorStoreData = {
	name: string,
	absorption: number,
	penalization: string,
	price: number,
}

export class ArmorStore {
	static items: ArmorStoreData[] = [{
		name: "Armadura común de láminas de acero",
		absorption: 2,
		penalization: "-2 a Maniobra.",
		price: 50,
	}, {
		name: "Armadura común de láminas de acero pesada",
		absorption: 5,
		penalization: "-2 a Maniobra. -2 a Ataque directo.",
		price: 70,
	}, {
		name: "Armadura molecular básica",
		absorption: 5,
		penalization: "-2 a Maniobra.",
		price: 1000,
	}, {
		name: "Armadura molecular avanzada",
		absorption: 8,
		penalization: "-2 a Maniobra.",
		price: 2500,
	}, {
		name: "Armadura táctica militar",
		absorption: 3,
		penalization: "-1 a Maniobra.",
		price: 200,
	}, {
		name: "Armadura táctica pesada",
		absorption: 7,
		penalization: "-2 a Maniobra. -1 a Ataque directo.",
		price: 600,
	}, {
		name: "Escudo de energía",
		absorption: 3,
		penalization: "-1 a Ataque directo o a distancia. -1 a Maniobra",
		price: 20,
	}, {
		name: "Escudo sólido de polímero",
		absorption: 4,
		penalization: "-2 a Ataque directo.",
		price: 80,
	}, {
		name: "Exoarmadura de energía",
		absorption: 3,
		penalization: "-2 a Maniobra. 2 CE por uso.",
		price: 50,
	}, {
		name: "Exoarmadura orientada",
		absorption: 4,
		penalization: "Una única dirección. -2 a Maniobra. 2 CE por uso.",
		price: 50,
	}];

	static getItem(id: string): ArmorStoreData {
		const item = ArmorStore.items.filter(item => item.name === id);
		return item[0];
	}
}
