[h, code: {"<!--
	Robotta basic roll function. Performs a core roll, adds all modifiers
	and allows the user to reroll dices if using "Determination" points.

	Arguments

	addBonus: A dictionary of bonuses to add to the roll
	usePassion: Explode on 10.
	useTrait: Use an additional dice.
	previousRolls: List of previous rolls that we keep for the final result.

	Return

	rolls: The list of obtained rolls
	value: The final value
-->"}]

[h: addBonus      = json.get(macro.args, "addBonus")]
[h: usePassion    = json.get(macro.args, "usePassion")]
[h: useTrait      = json.get(macro.args, "useTrait")]
[h: previousRolls = json.get(macro.args, "previousRolls")]
[h: toRepeatRollIndexes = json.get(macro.args, "toRepeatRollIndexes")]


[h: msg = json.indent(macro.args,2)]
[h: broadcast(msg)]

[h: coreRollArgs = json.set("",
	"usePassion", usePassion,
	"useTrait", useTrait,
	"previousRolls", previousRolls,
	"toRepeatRollIndexes", toRepeatRollIndexes
)]

[h, macro("coreRoll@this"): coreRollArgs]
