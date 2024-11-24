type SingularityData = {
	name: string,
	description: string,
	cost: string,
	difficulty: number,
	mods: Modifier[],
}



class SingularityStore {
	static items: SingularityData[] = [{
		name: "Activar/desactivar mecanismo",
		description: "Encender una nave, activar un mecanismo, abrir una puerta, encender un robot, desbloquear un arma, encender una alarma, desactivar todos estos elementos y más.",
		cost: "Quema 1 punto Isak de la cadena.",
		difficulty: 10,
		mods: [{
			name: "Activar/desactivar mecanismo",
			type: "narrative"
		}, {
			name: "-1 Isak cadena",
			type: "isak",
		}],
	}, {
		name: "Bloqueo",
		description: "Impone a una puerta la imposibilidad de abrirse hasta que la anomalía termine o el tecnomante la anule.",
		cost: "Quema 1 punto Isak de la cadena Exo/Maniobra. -1 en Exo hasta que se anule el efecto.",
		difficulty: 10,
		mods: [{
			name: "Bloquear puerta",
			type: "narrative",
		}, {
			name: "-1 Exo",
			type: "attribute",
		}, {
			name: "-1 Isak Exo/Maniobra",
			type: "isak",
		}],
	}, {
		name: "Bloqueo cibernético",
		description: "Corta un ataque cibernético y retira cualquier software malicioso. Puede eliminar el estado Infectado.",
		cost: "Quema 1 punto Isak de la cadena Cuántica o pierde 10 SV.",
		difficulty: 13,
		mods: [{
			name: "Detiene ataque cibernético",
			type: "narrative",
		}, {
			name: "Elimina estado infectado",
			type: "manual",
		}, {
			name: "-1 Isak Cuántica o -10 SV",
			type: "manual",
		}],
	}, {
		name: "Cambiar gravedad",
		description: "El tecnomante puede alterar a voluntad la gravedad de un habitáculo y que esta cambie del suelo a las paredes o el techo. El tecnomante puede elegir que esta anomalía no le repercuta o que solo le afecte a él. Solo se puede usar en lugares cerrados.",
		cost: "Quema 2 puntos Isak de la cadena o pierde 10 SV. Solo se puede utilizar en lugares cerrados.",
		difficulty: 15,
		mods: [{
			name: "Cambiar gravedad",
			type: "narrative",
		}, {
			name: "-2 Isak Cuántica o -10 SV",
			type: "manual",
		}],
	}, {
		name: "Campo de energía",
		description: "Crea una barrera de energía alrededor del tecnomante. Absorción 45.",
		cost: "Quema 1 punto Isak de la cadena Exo/Maniobra. Dura 5 turnos. Por cada turno extra pierde5 SV.",
		difficulty: 14,
		mods: [{
			name: "Barrera absorción 45",
			type: "attribute",
		}],
	}, {
		name: "Canción de los macroinsectos",
		description: "Logra apaciguar a macroinsectos furiosos. La canción los relaja hasta que se detienen y se retiran a seguir con sus vidas.",
		cost: "10 CE",
		difficulty: 17,
		mods: [{
			name: "Apacigua macroinsectos",
			type: "narrative",
		}],
	}, {
		name: "Cañon de antimateria",
		description: "De las manos del tecnomante surge un caudal de energía negra que corroe la materia. El Daño es de 100 multiplicado por 1d10.",
		cost: "El tecnomante pierde tanto SV como el resultado de la tirada multiplicado por 8. Gasta 1 punto Isak de la cadena.",
		difficulty: 15,
		mods: [{
			name: "Daño 100 * 1d10",
			type: "manual",
		}, {
			name: "SV - tirada * 8",
			type: "manual",
		}, {
			name: "-1 Isak cadena",
			type: "isak",
		}],
	}, {
		name: "Clonación efímera",
		description: "Crea un doble formado por partículas de algún otro robotta. Esta clonación se puede vestir como un traje por el tecnomante o por cualquier otro robotta. Imita voz e incluso la actitud.",
		cost: "Quema 2 puntos Isak de la cadena Cuántica. Si recibe más de 10 puntos de Daño, empieza a fisurarse como porcelana. Si recibe más de 20, se rompe en trozos y se deshace. El daño lo recibe quien lo viste. Necesita un objeto personal del clonado.",
		difficulty: 18,
		mods: [{
			name: "Clonación efímera",
			type: "narrative",
		}, {
			name: "-2 Isak Cuántica",
			type: "isak",
		}, {
			name: "Objeto personal",
			type: "narrative",
		}],
	}, {
		name: "Comprender utilidad",
		description: "Permite al tecnomante entender la utilidad de un objeto. Para ello, su mente se evade en un trance y visualiza el objeto desde el mundo electrónico sintiendo su fluir.",
		cost: "Quema 1 punto Isak de la cadena Dáemyr. No hace nada durante tantos turnos como indique la directora de juego.",
		difficulty: 0,
		mods: [{
			name: "-1 Isak Dáemyr",
			type: "isak",
		}, {
			name: "Perder X turnos",
			type: "narrative",
		}],
	}, {
		name: "Concentración mecánica",
		description: "Mientras el tecnomante esté concentrado, puede anular una condición negativa de la nave o de cualquier otro aparato tecnológico.",
		cost: "Quema 1 punto Isak de la cadena Cuántica. El tecnomante no puede hacer nada mientras realice la anomalía.",
		difficulty: 13,
		mods: [{
			name: "-1 Isak Cuántica",
			type: "isak",
		}, {
			name: "Perder X turnos",
			type: "narrative",
		}],
	}, {
		name: "Descenso suave",
		description: "Permite al tecnomante convertir la fuerza de un impacto por caída en energía cinética. Esta se dispersa al tomar tierra. La altura máxima es de 400 m.",
		cost: "Quema 1 punto Isak de la cadena Dáemyr.",
		difficulty: 14,
		mods: [{
			name: "Fuerza impacto -> Energía cinética",
			type: "narrative",
		}, {
			name: "-1 Isak Dáemyr",
			type: "isak",
		}],
	}, {
		name: "Entrega crítica",
		description: "El tecnomante ofrece al robotta elegido un aura de éxito y fortuna sin igual. El robotta objetivo consigue críticos con resultados en los dados de 8,9 y 10.",
		cost: "El tecnomante ofrece al robotta elegido un aura de éxito y fortuna sin igual. El robotta objetivo consigue críticos con resultados en los dados de 8,9 y 10.",
		difficulty: 14,
		mods: [{
			name: "Críticos con 8, 9 y 10",
			type: "manual",
		}, {
			name: "Pierde X turnos",
			type: "manual",
		}, {
			name: "-1 Isak cadena",
			type: "isak",
		}, {
			name: "Contacto vistual",
			type: "narrative",
		}],
	}, {
		name: "Esfera de energía",
		description: "Crea una amplia barrera de energía capaz de proteger incluso a una nave. Absorción 300.",
		cost: "Consume 10 CE por turno de concentración. El tecnomante no puede hacer nada más mientras tenga activa la esfera.",
		difficulty: 15,
		mods: [{
			name: "Barrera absorción 300",
			type: "manual",
		}, {
			name: "10 CE/t",
			type: "manual",
		}, {
			name: "Pierde X turnos",
			type: "manual",
		}],
	}, {
		name: "Espacio dimensional",
		description: "El tecnomante dispone de un espacio dimensional en el que puede introducir y sacar objetos, nunca seres vivos. Este espacio no tiene límite, pero si el tecnomante lo ocupa con más de 10 objetos, solo encuentra lo que busca si el resultado en la tirada de Singularidad es par; si es impar, saca un objeto aleatorio; y si es un 1, sale algo que pueda resultar catastrófico para el robotta, a discreción de la directora de juego.",
		cost: "Quema 1 punto Isak de la cadena. Si el tecnomante adquiere la condición de Herido, la dimensión se aniquila y los objetos se dispersan por el mundo. El tamaño máximo de cada elemento que se guarda es igual al valor de Firewill del tecnomante en metros.",
		difficulty: 10,
		mods: [{
			name: "Espacio dimensional",
			type: "narrative",
		}, {
			name: "-1 Isak cadena",
			type: "isak",
		}],
	}, {
		name: "Foco de gracia",
		description: "El tecnomante aplica una capa de protagonismo a un robotta que hace que su Carisma aumente +3.",
		cost: "Quema 1 punto Isak de la cadena Dáemyr.",
		difficulty: 11,
		mods: [{
			name: "+3 Carisma",
			type: "attribute",
		}, {
			name: "-1 Isak Dáemyr",
			type: "isak",
		}],
	}, {
		name: "Formateo",
		description: "El robotta objetivo olvida que ha conocido alguna vez al tecnomante. Se pierden todos los recuerdos asociados.",
		cost: "Quema 1 punto Isak de la cadena. Debe hacer un movimiento de manos ante los sensores del robotta. El tecnomante debe quemar 1 punto extra si quiere regular el tiempo, como por ejemplo para que el robotta olvide la última hora.",
		difficulty: 10,
		mods: [{
			name: "Olvida al PJ",
			type: "narrative",
		}, {
			name: "-1 Isak cadena",
			type: "isak",
		}, {
			name: "Movimiento manos",
			type: "narrative",
		}, {
			name: "-1 Isak cadena si quiere regular timepo",
			type: "narrative",
		}],
	}, {
		name: "Fortuna",
		description: "Permite que otro personaje en el campo de visión del tecnomante repita una tirada fallida.",
		cost: "Pierde 5 SV. El tecnomante debe extender sus manos hacia el objetivo y proyectar su atención sobre él.",
		difficulty: 10,
		mods: [{
			name: "Otro repite tirada",
			type: "manual",
		}, {
			name: "-5 SV",
			type: "manual",
		}, {
			name: "Movimiento manos",
			type: "narrative",
		}],
	}, {
		name: "Holocausto",
		description: "El tecnomante invoca una desestabilización de las fuerzas físicas que provoca una devastadora explosión de 100 megatones en un área de 45 km de diámetro, que queda inestable durante un siglo y en ella se producen todo tipo de fenómenos físicos extraños.",
		cost: "Quema 8 puntos Isak de la cadena. El tecnomante debe estar concentrado durante 3 turnos y no puede realizar ninguna otra acción.",
		difficulty: 18,
		mods: [{
			name: "Holocausto 100 megatones 45km",
			type: "narrative",
		}, {
			name: "-8 Isak cadena",
			type: "isak",
		}, {
			name: "Pierde 3 turnos",
			type: "manual",
		}],
	}, {
		name: "Ilusión sensorial",
		description: "Crea una pequeña ilusión que afecta a un sentido. La distancia máxima es de 150 m.",
		cost: "Por cada sentido que afecte la ilusión, el tecnomante debe quemar 1 punto Isak de la cadena.",
		difficulty: 5,
		mods: [{
			name: "-1 Isak cadena por sentido",
			type: "isak",
		}],
	}, {
		name: "Imposición de la ira",
		description: "Tocando a otro robotta, el tecnomante influye un poder de destrucción superior. Ese robotta causa el doble de daño en sus ataques mientras el tecnomante mantenga la concentración.",
		cost: "El tecnomante debe estar concentrado y no puede realizar ninguna otra acción. El robotta objetivo pierde 3 SV cada vez que haga daño de este modo.",
		difficulty: 15,
		mods: [{
			name: "Daño x2",
			type: "manual",
		}, {
			name: "Pierde X turnos",
			type: "manual",
		}, {
			name: "-3 SV Robotta objetivo",
			type: "manual",
		}],
	}, {
		name: "Impulsar",
		description: "Crea una onda de desplazamiento que mueve a un objetivo de menos de 500 kg hasta a100 m de distancia. Además, le impone posición empeorada.",
		cost: "Pierde 5 SV",
		difficulty: 12,
		mods: [{
			name: "Mueve 500kg hasta 100m y posición empeorada",
			type: "narrative",
		}, {
			name: "-5 SV",
			type: "attribute",
		}],
	}, {
		name: "Orden directa",
		description: "Logra que un personaje no jugador obedezca en una demanda concreta. Esta puede ser simple o compleja. Luego el personaje no jugador olvida al tecnomante y cuanto tenga que ver con la petición.",
		cost: "-3 a Cálculo y -2 a Percepción hasta que la demanda se cumpla por completo.",
		difficulty: 14,
		mods: [{
			name: "Orden directa",
			type: "narrative",
		}, {
			name: "-3 Cálculo",
			type: "attribute",
		}, {
			name: "-2 Percepción",
			type: "attribute",
		}],
	}, {
		name: "Parar el tiempo",
		description: "Detiene el tiempo durante 10 turnos. Permite al tecnomante hacer 10 acciones antes de restablecerlo.",
		cost: "Quema 5 puntos Isak de la cadena. Pierde 15 SV. Sacrifica 1 Exo, que será inútil para siempre.",
		difficulty: 18,
		mods: [{
			name: "Para el tiempo x10 turnos",
			type: "narrative",
		}, {
			name: "-5 Isak cadena",
			type: "isak",
		}, {
			name: "-15 SV",
			type: "attribute",
		}, {
			name: "Sacrifica 1 Exo",
			type: "manual",
		}],
	}, {
		name: "Premonición",
		description: "El tecnomante es capaz de expresar en voz alta un acontecimiento imprevisible que está a punto de ocurrir. Siempre tiene que decírselo a un testigo que entienda lo que dice para que realmente suceda. El jugador debe declararlo al introducir el evento.",
		cost: "Necesita un observador consciente. Pierde 5 SV.",
		difficulty: 15,
		mods: [{
			name: "Premonición",
			type: "narrative",
		}, {
			name: "Observador consciente",
			type: "narrative",
		}, {
			name: "-5 SV",
			type: "attribute",
		}],
	}, {
		name: "Restauración",
		description: "Restituye 15 SV a otro robotta",
		cost: "Pierde 5 SV",
		difficulty: 15,
		mods: [{
			name: "+15 SV objetivo",
			type: "attribute",
		}, {
			name: "+15 SV objetivo",
			type: "attribute",
		}],
	}, {
		name: "Salto",
		description: "Permite al tecnomante realizar un salto extraordinario de hasta 400 m de altura. Si es para ascender a una nueva posición, implica una precisión exitosa.",
		cost: "Quema 1 punto Isak de la cadena Sólida. Pierde 5 SV.",
		difficulty: 13,
		mods: [{
			name: "Salto hasta 400m",
			type: "narrative",
		}, {
			name: "-1 Isak Sólida",
			type: "isak",
		}, {
			name: "-5 SV",
			type: "attribute",
		}],
	}, {
		name: "Temor/afinidad",
		description: "El tecnomante puede causar miedo o sensación de afinidad a seres vivos que tenga en sus inmediaciones.",
		cost: "Quema 1 punto Isak de la cadena Dáemyr o pierde 5 SV.",
		difficulty: 12,
		mods: [{
			name: "Temor/afinidad",
			type: "narrative",
		}, {
			name: "-1 Isak Dáemyr",
			type: "isak",
		}, {
			name: "-5 SV",
			type: "attribute",
		}],
	}, {
		name: "Trance Hierático",
		description: "El tecnomante sale de su cuerpo y entra en el mundo electrónico, donde la materia no existe y solo se perciben flujos de electrones en cifras astronómicas. Puede desplazarse por el flujo libremente hasta a 150 km/h y una distancia de 1000 km de su cuerpo, y explorar el mundo físico desde dentro del flujo. Permite ver todo lo que está oculto y atravesar cualquier clase de barrera no tecnomágica.",
		cost: "Todo daño recibido durante el trance se multiplica por 2. El trance solo se corta si se tiene 5 SV o menos. Quema 2 puntos Isak de la cadena.",
		difficulty: 17,
		mods: [{
			name: "Flujo 150 km/h hasta 1000km de su cuerpo",
			type: "narrative",
		}, {
			name: "Daño recibido x2",
			type: "manual",
		}, {
			name: "Trance se corta si < 5 SV",
			type: "narrative",
		}, {
			name: "-2 Isak cadena",
			type: "isak",
		}],
	}, {
		name: "Transporte de partículas",
		description: "El tecnomante se deshace en una masa de partículas que se desplaza visiblemente hasta una nueva posición a 300 m. Puede colarse por rendijas y percibir mientras avanza. El robotta puede hacerlo aun estando atrapado.",
		cost: "Quema 2 puntos Isak de la cadena y termina en posición empeorada. Tarda tanto en llegar como lo haría en un paseo sereno.",
		difficulty: 15,
		mods: [{
			name: "Transporte de partículas",
			type: "narrative",
		}, {
			name: "-2 Isak cadena",
			type: "isak",
		}, {
			name: "Posición empeorada al salir",
			type: "manual",
		}],
	}];

	static getItem(id: string): SingularityData {
		const item = SingularityStore.items.filter(item => item.name === id);
		return item[0];
	}
}
