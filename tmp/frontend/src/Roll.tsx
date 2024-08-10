import { Button, Box } from '@chakra-ui/react';
import { ButtonMouseEvent } from './Common';
import { useImmer } from 'use-immer';
import { Robotta } from 'shared/dist/Robotta';

type RollModifierAttribute = {
	name: "attribute" | "passion" | "profession";
	value: number;
}

type RollModifierTrait = {
	name: "trait";
	value: string;
	mode: number;
}

export type RollModifier = RollModifierAttribute | RollModifierTrait;

export type RollState = {
	values: number[];
	mods: RollModifier[];
	rerolled: boolean;
	exploded: number;
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
		const trait = mods.find(e=>e.name === "trait");
		this.state.mods = mods;
		const ndices = trait ? 4 : 3;
		let roll: number;

		// Basic roll
		for (let i = 0; i < ndices; i++) {
			roll = Roll.rollDice();
			this.state.values.push(roll);
		}

		console.log(`roll base: ${this.state.values}`);

		// TODO check for critic or failed rolls
		this.checkPassion();
	}

	/**
	 * Rolls the dice indicated in the arguments and check for passion. Only
	 * rerolls greater than the base roll will affect the base roll.
	 * @param index - Id of the dice to reroll
	 * @returns Wether the reroll actually modified the original roll or not.
	 */
	reroll(index: number): boolean {
		this.state.rerolled = true;
		const newval = Roll.rollDice();
		let changed = false;
		if (newval > this.state.values[index]) {
			this.state.values[index] = newval;
			changed = true;
		}
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
				return;
			}
		}
	}

	/**
	 * Rolls dices according to the roll configuration.
	 * @returns Wether the user uses passion or not
	 */
	isPassion(): boolean {
		const passion = this.state.mods.find(e=>e.name === "passion");
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

	getState(): RollState {
		const state = {...this.state};
		return state;
	}

	getStaged(): boolean[] {
		const ndices = this.state.values.length;
		const trait = this.state.mods.find(e=>e.name === "trait") as (RollModifierTrait | undefined);
		let staged = Array.from({length: ndices}, ()=>false)

		const secondBest = (values: number[]) => {
			const best = Math.max(...values);
			for (let i = 0; i < values.length; i++) {
				
			}
		};
		const secondWorst = (values: number[]) => {
			const best = Math.min(...values);
			for (let i = 0; i < values.length; i++) {
				
			}
		};

		if (trait) {
			if (trait.mode > 0) {
				// Get second best value
			} else if (trait.mode < 0) {
				// Get second worst value

			} else {
				// TODO report error
			}
		} else {
			// Get second best value

		}


		for (let i = 0; i < ndices; i++) {
			
		}
		return staged;
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
		const handleClick = (e: ButtonMouseEvent) => {
			updateReroll(draft => {
				draft[index] = ! draft[index];
			});
		};

		return (
			<Dice
				isActive = {reroll[index]}
				onClick = {e => handleClick(e)}
				key = {index}
				isDisabled = {value === 10 || rerolled}
			>
				{value}
			</Dice>
		);
	});

	const handleReroll = (e: ButtonMouseEvent) => {
		if (!diceSelected) {
			// TODO add error
			return;
		}

		for (let i = 0; i < reroll.length; i++) {
			if (!reroll[i])
				continue;

			roll.reroll(i);
		}
		setRollState(roll.getState());
	};

	return (<>
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

