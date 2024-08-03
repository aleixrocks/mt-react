import { Button, Box } from '@chakra-ui/react';
import { ButtonMouseEvent } from './Common';
import { useImmer } from 'use-immer';
import { Robotta } from 'shared/dist/Robotta';

export type RollModifier = {
	name: string;
	value: number;
}

export type RollState = {
	values: number[];
	mods: RollModifier[];
	ndices: number;
	rerolled: boolean;
};

// TODO I'm trying to use Roll as plain object. I need to to this becase
// working with objects as a React state is a pain. I have tried with Immer,
// but I need to adapt my class to immer completerly using "produce" (see
// https://immerjs.github.io/immer/complex-objects/). Instead of using a
// "immerable" object, I prefer to try with plain objects. i,e, a object
// containig the roll data but no functions. Functions to manipulate roll data
// live in the RollUtils class as static methods. This is shit.

export class Roll {
	ndices: number
	mods: RollModifier[]
	values: number[]
	rerolled: boolean

	static rollDice(): number {
		return Math.floor(Math.random() * 10 + 1);
	}

	constructor() {
		this.ndices = 0;
		this.mods = [];
		this.values = [];
		this.rerolled = false;
	}

	roll(mods: RollModifier[], trait: boolean) {
		this.mods = mods;
		this.ndices = trait ? 4 : 3;

		for (let i = 0; i < this.ndices; i++) {
			const roll = Roll.rollDice();
			this.values.push(roll);
		}
	}

	isValid(): boolean {
		return this.values.length > 0;
	}

	reroll(index: number): boolean {
		this.rerolled = true;
		const newval = Roll.rollDice();
		if (newval > this.values[index]) {
			this.values[index] = newval;
			return true;
		}
		return false
	}

	getRerolled(): boolean {
		return this.rerolled;
	}

	getNumDices(): number {
		return this.ndices;
	}

	getValues(): number[] {
		return this.values;
	}

	getState(): RollState {
		const state: RollState = {
			ndices: this.ndices,
			mods: this.mods,
			values: this.values,
			rerolled: this.rerolled,
		}
		return state;
	}
}

function Dice({isActive, onClick, key, children}: {isActive: boolean, onClick: (e: any) => void, key: number, children: number}) {
	return (
		<Button
			boxSize = "40px"
			variant = "outline"
			borderWidth = "4px"
			margin = "2px"
			colorScheme = "teal"
			onClick = {e=>onClick(e)}
			isActive = {isActive}
			key = {key}
		>
			{children}
		</Button>
	);
}

export function RollMenu({rtt, roll, setRollState}: {rtt: Robotta, roll: Roll, setRollState: any}) {
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

	console.log(`getRerolled: ${roll.getRerolled()}`)
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
	</>);
}

