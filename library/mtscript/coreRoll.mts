[h, code: {"<!--
	Robotta core roll function  

	Arguments

	usePassion: Explode on 10.
	useTrait: Use an additional dice.
	previousRolls: Complete list of previous rolls that we might need to reroll.
	toRepeatRolls: Sorted list of indexes of the previousRolls array that need to be rerolled.

	Return

	rolls: List of obtained rolls
-->"}]

[h: broadcast("holaaaa")]

[h: usePassion    = json.get(macro.args, "usePassion")]
[h: useTrait      = json.get(macro.args, "useTrait")]
[h: previousRolls = json.get(macro.args, "previousRolls")]
[h: toRepeatRollIndexes = json.get(macro.args, "toRepeatRollIndexes")]

<!-- Calculate number of dices to roll -->
[h, if(useTrait): numRolls = 4; numRolls = 3]

<!-- The list of dice results of this call -->
[h: rolls = previousRolls]
[h: numPreviousRolls = json.length(previousRolls)]
[h: numToRepeatRolls = json.length(toRepeatRollIndexes)]

[h: assert(numPreviousRolls <= numRolls, "Error: coreRoll: numPreviousRolls > numRolls")]
[h: assert(numToRepeatRolls <= numRolls, "Error: coreRoll: numToRepeatRolls > numRolls")]

[h: broadcast("test for")]

[h, for(i, 0, numRolls), code: {
	[h, if(i < 4), code: {
		[h, if(i < 3), code: {
			[h: broadcast("myiter"+i)]
		}]
	}]
}]


[h: broadcast("before for")]

<!-- Roll all dices as needed -->
[h: pri = 0]
[h, for(i, 0, numRolls), code: {
	[h: broadcast("  iter:" + i)]
	[h: rNew = 1d10]
	[h, if(pri < numToRepeatRolls), code: {
		[h, if(i == json.get(toRepeatRollIndexes, pri)), code: {
			[h: rPrev = json.get(previousRolls, i)]
			[h: rNew = max(rNew, rPrev)]
			[h: pri = pri + 1]
		}]
	}]
	[h: rolls = json.append(rolls, rNew)]
}]
[h: assert(json.length(rolls) == numRolls, "Error: coreRoll: json.length(rolls) != numRolls")]

[h: broadcast("after for")]

<!-- TODO: It is possible to use Determination AND passion in the same roll -->
<!-- TODO: If using Determination to reroll, it is nos possible to use Passion on the second roll -->
<!-- TODO: It is possible to use Traits AND (Determination OR Passion) (see https://vimeo.com/499129936 14:40 -->
<!-- TODO: It is not possible to use Determination to avoid the effects of a failure -->
<!-- TODO: It is not possible to use Determination twice in the same roll -->
<!-- TODO: Rerolling (Determination) cannot worsen the result! -->
<!-- TODO: Exploding dice (passion) does not count neither for ciritcals nor singularity -->

<!-- TODO: Only when not using traits: -->
<!--   TODO: Check for "Critical Success" (two 10s) -->
<!--   TODO: Check for "Critical Epic Success" (three 10s) -->
<!--   TODO: Check for "Critical Failure" (two 1s) -->
<!--   TODO: Check for "Critical Epic Failure" (three 1s) -->
<!-- TODO: Only when using traits: -->
<!--   TODO: Check for "Singularity" (two 1s and two 10s) -->

<!-- Find the maximum and the minimum -->
[h: rmax = round(math.arrayMax(rolls))]
[h: rmin = round(math.arrayMin(rolls))]

<!-- TODO: Remove the maximum and the minimum -->

<!-- TODO: Remove the maximum and the minimum -->

[h: msg = json.indent(rolls)]
[h: broadcast(msg)]
