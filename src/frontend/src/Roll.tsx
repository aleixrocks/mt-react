import React, { useEffect, useState } from 'react';

import './DiceRoller.css';
import { Button } from '@chakra-ui/react'

export class Roll {
	static dices: number[] = [12, 10, 8, 6, 4];

	static getCurrentDice(clock: number): number {
		const currentDice = Roll.dices[Math.trunc(clock/4)];
		return currentDice;
	}

	static roll(metric: number) {
		return Math.trunc(Math.random() * metric + 1);
	}
}

function Dice({
	disabled = false,
	onClick = (e: any) => {},
	color = "teal",
	value}
: {
	disabled?: boolean,
	onClick?: (e: any) => void,
	color?: string,
	value: number
}) {
	return (
		<Button
			boxSize = "40px"
			variant = "outline"
			borderWidth = "4px"
			margin = "2px"
			colorPalette = {color}
			onClick = {e=>onClick(e)}
			disabled = {disabled}
		>
			{value}
		</Button>
	);
}


type DiceRollerProps = {
	predefinedValue: number; // Dice result (1 to 6)
	metric: number;
	onEnd: () => void;
};

export const DiceRoller: React.FC<DiceRollerProps> = ({ predefinedValue, metric, onEnd }) => {
	const [rolling, setRolling] = useState(true);
	const [currentValue, setCurrentValue] = useState(1); // Temporary dice value during animation

	useEffect(() => {
		let counter = 0;
		const animation = setInterval(() => {
			// Generate random values between 1 and 6
			const randomValue = Math.floor(Math.random() * metric) + 1;
			setCurrentValue(randomValue);
			counter++;

			// Stop animation after a few frames
			if (counter > 10) {
				clearInterval(animation);
				setRolling(false);
				setCurrentValue(predefinedValue); // Show the predefined value
				onEnd();
			}
		}, 100); // Change value every 100ms

		// Cleanup the interval on component unmount
		return () => clearInterval(animation);
	}, [predefinedValue, metric, onEnd]);
	
	return (
		<div className="dice-roller">
			<div className={`dice ${rolling ? 'rolling' : ''}`}>
				<Dice value = {currentValue} />
			</div>
		</div>
	);
};

