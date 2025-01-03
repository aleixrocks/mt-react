import React, { useEffect, useState } from 'react';
import './DiceRoller.css'; // Add your custom styles here

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


type DiceRollerProps = {
  predefinedValue: number; // Dice result (1 to 6)
  metric: number;
};

export const DiceRoller: React.FC<DiceRollerProps> = ({ predefinedValue, metric }) => {
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
      }
    }, 100); // Change value every 100ms

    // Cleanup the interval on component unmount
    return () => clearInterval(animation);
  }, [predefinedValue, metric]);

  return (
    <div className="dice-roller">
      <div className={`dice ${rolling ? 'rolling' : ''}`}>
        🎲 {currentValue}
      </div>
    </div>
  );
};

