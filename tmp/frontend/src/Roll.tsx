import { Button, Box } from '@chakra-ui/react';
import { ButtonMouseEvent } from './Common';
import { useImmer } from 'use-immer';
import { Robotta } from 'shared/dist/Robotta';

// TODO fix possible names of "attribute"
// TODO merge RollModifierProfession with RollModifierTrait
type RollModifierAttribute = {
	type: "attribute" | "profession";
	name: string;
	value: number;
};

type RollModifierPassion = {
	type: "passion";
}

type RollModifierTrait = {
	type: "trait";
	name: string;
	mode: number;
};

export type RollModifier = RollModifierAttribute | RollModifierTrait | RollModifierPassion;

export type RollState = {
	values: number[];
	mods: RollModifier[];
	rerolled: boolean;
	exploded: number;
};

type RollBreakdown = {
	name: string;
	value: number;
};

// TODO I'm trying to use Roll as plain object. I need to to this becase
// working with objects as a React state is a pain. I have tried with Immer,
// but I need to adapt my class to immer completerly using "produce" (see
// https://immerjs.github.io/immer/complex-objects/). Instead of using a
// "immerable" object, I prefer to try with plain objects. i,e, a object
// containig the roll data but no functions. Functions to manipulate roll data
// live in the RollUtils class as static methods. This is shit.

export class Roll {
	state: RollState;

	static rollDice(): number {
		return Math.floor(Math.random() * 10 + 1);
	}

	static initialState(): RollState {
		return {
			mods: [],
			values: [],
			rerolled: false,
			exploded: 0,
		}
	}

	constructor() {
		this.state = Roll.initialState();
	}

	reset(): RollState {
		this.state = Roll.initialState();
		return this.state;
	}

	/**
	 * Rolls dices according to the roll configuration.
	 * @param mods - Array of roll properties
	 */
	roll(mods: RollModifier[]) {
		this.state.mods = mods;

		const trait = this.getTrait();
		const ndices = trait ? 4 : 3;
		let roll: number;

		// Basic roll
		for (let i = 0; i < ndices; i++) {
			roll = Roll.rollDice();
			this.state.values.push(roll);
		}
		this.state.values.sort((a, b) => a - b);

		console.log(`base roll: ${this.state.values}`);

		// TODO check for critic or failed rolls
		this.checkPassion();
	}

	/**
	 * Rolls the dice indicated in the arguments and check for passion. Only
	 * rerolls greater than the base roll will affect the base roll.
	 * @param indexes - An array of Ids of  dice to be rerolled
	 * @returns Wether the reroll actually modified the original roll or not.
	 */
	reroll(indexes: number[]): boolean {
		this.state.rerolled = true;
		let changed = false;

		for (let index of indexes) {
			const oldval = this.state.values[index];
			const newval = Roll.rollDice();

			console.log(`reroll(${oldval}) => ${newval}`);
			if (newval > oldval) {
				this.state.values[index] = newval;
				changed = true;
			}
		}
		this.state.values.sort((a, b) => a - b);
		this.checkPassion();

		return changed;
	}

	/**
	 * Checks if passion applies to the current roll. Passion can only be
	 * checked for if the user selected passion and we have not suceeded in a
	 * previou passion check before.
	 */
	checkPassion() {
		const passion = this.isPassion();

		if (!passion)
			return;

		if (this.state.exploded)
			return;

		for (let i = 0; i < this.state.values.length; i++) {
			let roll = this.state.values[i];
			if (roll === 10) {
				do {
					this.state.exploded++;
					roll = Roll.rollDice();
					console.log(`passion roll: ${roll}`);
				} while (roll === 10);
				this.state.values[i] = roll;
				this.state.values.sort((a, b) => a - b);
				return;
			}
		}
	}

	/**
	 * Rolls dices according to the roll configuration.
	 * @returns Wether the user uses passion or not
	 */
	isPassion(): boolean {
		const passion = this.state.mods.find(e=>e.type === "passion");
		return passion ? true : false;
	}

	isValid(): boolean {
		return this.state.values.length > 0;
	}

	getRerolled(): boolean {
		return this.state.rerolled;
	}

	getNumDices(): number {
		return this.state.values.length;
	}

	getValues(): number[] {
		return this.state.values;
	}

	getExploded(): number {
		return this.state.exploded;
	}

	getTrait(): RollModifierTrait | undefined {
		return this.state.mods.find(m => m.type === "trait") as (RollModifierTrait | undefined);
	}

	getState(): RollState {
		const state = {...this.state};
		return state;
	}

	/**
	 * Returns the middle dice of the current roll. If using traits positively,
	 * it returns the second best value. If using traits negatively, it returns
	 * the second worst value.
	 * @returns Middle dice value of the current roll
	 */
	getMiddleDiceValue(): number {
		const trait = this.getTrait();
		const sortedValues = this.state.values.slice();

		if (trait && trait.mode > 0)
			sortedValues.reverse();

		return sortedValues[1];
	}

	/**
	 * Calculates the middle value of the current roll and returns its index
	 * @returns Middle dice Index of the current roll
	 */
	getMiddleDiceIndex(): number {
		const middleValue = this.getMiddleDiceValue();
		let index = -1;
		for (let i = 0; i < this.state.values.length; i++) {
			if (this.state.values[i] === middleValue) {
				index = i;
				break;
			}
		}

		// if first and second dices are the same, select the second for aesthetics.
		if (index === 0 && this.state.values[1] === middleValue)
			index = 1;

		if (index === -1)
			console.error("getMIddleDiceIndex failed to find middleValue");

		return index;
	}

	/**
	 * Computes the breakdown of all values that add up to the final value and
	 * returns a list of them plus the final value.
	 * @returns An array of factors that influence the final roll value
	 */
	getBreakdown(): RollBreakdown[] {
		const passion = this.state.exploded;
		const middle = this.getMiddleDiceValue();
		const mods = this.state.mods.filter(m => m.type === "attribute" || m.type === "profession") as (RollModifierAttribute[])
		let breakdown: RollBreakdown[] = [];

		// Build breakdown
		breakdown.push({
			name: "middle",
			value: middle,
		});

		if (passion) {
			breakdown.push({
				name: "passion",
				value: passion * 10,
			});
		}

		for (let mod of mods) {
			breakdown.push({
				name: mod.name,
				value: mod.value,
			});
		}

		return breakdown;
	}

	getFinal(): number {
		let final = 0;
		const breakdown = this.getBreakdown();
		return breakdown.reduce((acc, val) => acc + val.value, 0);
	}
}

function Dice({isActive, isDisabled = false, onClick, color = "teal", children}: {
		isActive: boolean, isDisabled?: boolean, onClick: (e: any) => void, color?: string, children: number
}) {
	return (
		<Button
			boxSize = "40px"
			variant = "outline"
			borderWidth = "4px"
			margin = "2px"
			colorScheme = {color}
			onClick = {e=>onClick(e)}
			isActive = {isActive}
			isDisabled = {isDisabled}
		>
			{children}
		</Button>
	);
}

export function RollMenu({rtt, roll, setRollState, resetState}: {rtt: Robotta, roll: Roll, setRollState: any, resetState: () => void}) {
	const ndices = roll.getNumDices();
	const values = roll.getValues();
	const [reroll, updateReroll] = useImmer<boolean[]>(Array.from({length: ndices}, ()=>false));
	const diceSelected: boolean = reroll.find(dice=>dice) ? true : false
	const rerolled = roll.getRerolled();
	const trait = roll.getTrait();
	const middleIndex = roll.getMiddleDiceIndex();
	const breakdown = roll.getBreakdown();
	const final = roll.getFinal();


	const explodedDices = Array.from({length: roll.getExploded()}, (x, i) => (
		<Dice
			isActive = {false}
			isDisabled = {true}
			onClick = {(e)=>{}}
			key = {i}
			color = "red"
		>
			{10}
		</Dice>
	));
	
	const dices = values.map((value, index) => {
		const handleDiceSelect = (e: ButtonMouseEvent) => {
			updateReroll(draft => {
				draft[index] = ! draft[index];
			});
		};

		return (
			<Dice
				isActive = {reroll[index]}
				onClick = {e => handleDiceSelect(e)}
				key = {index}
				color = {index === middleIndex ? "pink" : "teal"}
			>
				{value}
			</Dice>
		);
	});

	const handleReroll = (e: ButtonMouseEvent) => {
		if (!diceSelected) {
			console.error("handleReroll called, but no button selected!");
			return;
		}

		let toReroll: number[] = [];
		for (let i = 0; i < reroll.length; i++) {
			if (!reroll[i])
				continue;

			toReroll.push(i);
		}
		roll.reroll(toReroll);
		updateReroll(draft => draft.fill(false));
		setRollState(roll.getState());
	};

	const breakdownSummary = breakdown.map(elem => `${elem.name}(${elem.value})`);

	return (<>
		<Box>
			{trait ? (`Tirada con Rásgo de Carácter ${trait.name} de forma ${trait.mode > 0 ? "Positiva" : "Negativa"}`) : ""}
		</Box>
		<Box>
			{roll.isPassion() ? (explodedDices.length ? "Passión Consumida!" : "Passión sin consumir!") : "Tirada Normal"}
		</Box>
		<Box>
			You rolled: {explodedDices} {explodedDices.length ? " | " : " "} {dices}
		</Box>
		<Box>
			Determination {rtt.state.determinationPoints}/{rtt.state.determinationPointsMax}
		</Box>
		<Box>
			<Button
				isDisabled = {!diceSelected || rerolled}
				onClick = {e => handleReroll(e)}
			>
				Usar Determinación
			</Button>
		</Box>
		<Box>
			{breakdownSummary.join(" + ")} = {final}
		</Box>
		<Box mt={4}>
			<Button
				colorScheme = "red"
				onClick = {e=>resetState()}
			>
				Fin
			</Button>
		</Box>
	</>);
}

