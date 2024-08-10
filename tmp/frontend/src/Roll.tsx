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

	roll(mods: RollModifier[]) {
		const trait = mods.find(e=>e.name === "trait");
		this.state.mods = mods;
		const ndices = trait ? 4 : 3;

		for (let i = 0; i < ndices; i++) {
			const roll = Roll.rollDice();
			this.state.values.push(roll);
		}
	}

	isValid(): boolean {
		return this.state.values.length > 0;
	}

	reroll(index: number): boolean {
		this.state.rerolled = true;
		const newval = Roll.rollDice();
		if (newval > this.state.values[index]) {
			this.state.values[index] = newval;
			return true;
		}
		return false
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

function Dice({isActive, onClick, children}: {isActive: boolean, onClick: (e: any) => void, children: number}) {
	return (
		<Button
			boxSize = "40px"
			variant = "outline"
			borderWidth = "4px"
			margin = "2px"
			colorScheme = "teal"
			onClick = {e=>onClick(e)}
			isActive = {isActive}
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
			You rolled: {dices}
		</Box>
		<Box>
			Determination {rtt.state.determinationPoints}/{rtt.state.determinationPointsMax}
		</Box>
		<Box>
			<Button
				isDisabled = {!diceSelected || roll.getRerolled()}
				onClick = {e => handleReroll(e)}
			>
				reroll
			</Button>
		</Box>
		<Box mt={4}>
			<Button
				colorScheme = "red"
				onClick = {e=>resetState()}
			>
				End
			</Button>
		</Box>
	</>);
}

