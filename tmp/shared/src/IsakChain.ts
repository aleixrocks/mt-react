import {Modifier} from './Modifier'

export type IsakNodeData = {
	id: number,
	description: string,
	links: number[],
	mods: Modifier[],
}

export class IsakChain {
	static entry: number[] = [0, 13, 26, 39];
	static maneuverEntry: number = 0;
	static daemyrEntry: number = 13;
	static solidEntry: number = 26;
	static cuantumEntry: number = 39;
	static nodes: IsakNodeData[] = [
		{
			id: -1,
			description: "",
			links: [0, 13, 26, 39],
			mods: [],
		}, {
			id: 0,
			description: "+3 a Exo o Maniobra",
			links: [1, 2, 3],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 1,
			description: "Usa un Exo averiado",
			links: [4],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 2,
			description: "Usa un Exo 2 veces",
			links: [7],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 3,
			description: "Exo +2 para todos",
			links: [5],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 4,
			description: "Repite una tirada de Exo",
			links: [6, 8],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 5,
			description: "Obliga a otro a repetir una tirada de Exo",
			links: [8],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 6,
			description: "Sacrifica un Exo propio para romper el de un oponente",
			links: [9, 10],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 7,
			description: "Repite una tirada de Maniobra",
			links: [9, 11],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 8,
			description: "Sacrifica un Exo propio para romper el de un oponente",
			links: [10, 11],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 9,
			description: "Éxito gratuito en una Maniobra",
			links: [],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 10,
			description: "Usa 2 Exos a la vez",
			links: [12],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 11,
			description: "Maniobra +2 para todos",
			links: [12],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 12,
			description: "Gana 1PX o usa 3 Exos en un turno",
			links: [],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 13,
			description: "+3 Cálculo, Carisma o Firewill",
			links: [14, 15, 16],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 14,
			description: "+2 en lucha contra virus",
			links: [17, 18],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 15,
			description: "Usa el dado M en Firewill",
			links: [19, 20],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 16,
			description: "Carisma x2",
			links: [18],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 17,
			description: "Repite una tirada de Cálculo o Firewill",
			links: [19],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 18,
			description: "Usa mejorar posición en una acción social (+4)",
			links: [21],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 19,
			description: "Profesión +3",
			links: [22, 23],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 20,
			description: "Emplea desarmar como maniobra social",
			links: [22, 24],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 21,
			description: "Usa el dado M en Cálculo",
			links: [23, 24],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 22,
			description: "Un uso gratuito de Pasión",
			links: [25],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 23,
			description: "Éxito automático detectando mentiras",
			links: [25],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 24,
			description: "Defensa +2 para todos",
			links: [25],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 25,
			description: "Gana 1PX o 1 punto de Determinación",
			links: [],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 26,
			description: "+3 Destreza, Fortaleza o Percepción",
			links: [26, 27, 28],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 27,
			description: "Defensa x2",
			links: [30],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 28,
			description: "Usa el dado M en un Ataque",
			links: [33],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 29,
			description: "Percepción +5",
			links: [31],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 30,
			description: "Repite una tirada de Destreza o Fortaleza",
			links: [32, 34],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 31,
			description: "Obliga a otro a repetir una tirada de Defensa",
			links: [34],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 32,
			description: "Destreza +3 para Sigilo",
			links: [35],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 33,
			description: "Daño +5 si impacta",
			links: [35, 37],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 34,
			description: "Usa el dado M en Percepción",
			links: [36, 37],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 35,
			description: "Desmonta una trampa",
			links: [38],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 36,
			description: "Éxito automático en rendirse",
			links: [38],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 37,
			description: "Artillero +4",
			links: [38],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 38,
			description: "Gana 1 PX o Fortaleza x2 durante dos turnos",
			links: [],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 39,
			description: "Describe un elemento del escenario",
			links: [40, 41, 42],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 40,
			description: "Activa 2 puntos Isak a la vez, uno de ellos se quema",
			links: [43, 46],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 41,
			description: "Copia el resultado de la tirada de un compañero",
			links: [46],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 42,
			description: "Determina el fin de una escena de no combate",
			links: [44, 46],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 43,
			description: "Repite una tirada de Exo",
			links: [45],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 44,
			description: "Introduce un elemento inesperado",
			links: [47],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 45,
			description: "Quema otro punto para dar su beneficio a otro PJ",
			links: [48],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 46,
			description: "Suerte: Ignora todo el daño de una fuente",
			links: [48, 49, 50],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 47,
			description: "Nadie puede emplear la cadena en todo el asalto",
			links: [50],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 48,
			description: "Coloca este punto en cualquier casilla",
			links: [51],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 49,
			description: "Cambia un valor de ataque por otro todo el asalto",
			links: [51],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 50,
			description: "Coloca este punto en cualquier casilla",
			links: [51],
			mods: [{
				name: "",
				type: "",
			}],
		}, {
			id: 51,
			description: "Gana 1 PX... o no!",
			links: [],
			mods: [{
				name: "",
				type: "",
			}],
		}
	];

	static getItem(id: number): IsakNodeData {
		const node = IsakChain.nodes.filter(node => node.id === id);
		return node[0];
	}
}
