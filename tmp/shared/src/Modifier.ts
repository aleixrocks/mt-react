// needs to support applying one effect or another
// needs objective (self, target, group)
// needs duration (permanent, for the duration)

export type Modifier = {
	name: string;
	type: "attribute" | "narrative" | "isak" | "manual" | "";
}
