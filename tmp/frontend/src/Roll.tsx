import { Button } from '@chakra-ui/react';
import { ButtonMouseEvent } from './Common';
import { useImmer } from 'use-immer';

export type RollModifier = {
	name: string;
	value: number;
}

export class Roll {
	private values: number[];
	private mods: RollModifier[];
	private ndices: number;

	static rollDice(): number {
		return Math.floor(Math.random() * 10 + 1);
	}

	constructor() {
		this.values = [];
		this.mods = [];
		this.ndices = 0;
	}

	roll(mods: RollModifier[], trait: boolean): Roll {
		this.mods = mods;
		this.values = [];
		this.ndices = trait ? 4 : 3;

		for (let i = 0; i < this.ndices; i++) {
			const roll = Roll.rollDice();
			this.values.push(roll);
		}

		return this;
	}

	isValid(): boolean {
		return this.values.length > 0;
	}

	reroll(index: number): boolean {
		const newval = Roll.rollDice();
		if (newval > this.values[index]) {
			this.values[index] = newval;
			return true;
		}
		return false
	}

	getNumDices(): number {
		return this.ndices;
	}

	getValues(): number[] {
		return this.values;
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

export function RollMenu({roll, setRoll}: {roll: Roll, setRoll: any}) {
	const ndices = roll.getNumDices();
	const values = roll.getValues();
	const [reroll, updateReroll] = useImmer<boolean[]>(Array.from({length: ndices}, ()=>false));

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
			>
				{value}
			</Dice>
		);
	});

	const handleReroll = (e: ButtonMouseEvent) => {
		let changed = false;
		for (let i = 0; i < values.length; i++) {
			if (!values[i])
				continue;

			roll.reroll(i);
		}
		setRoll(roll);
	};

	return (<>
		You rolled: {dices}
		<Button
			isDisabled = {reroll.length === 0}
			onClick = {e => handleReroll(e)}
		>
			reroll
		</Button>
	</>);
}

