
import { FormControl, FormLabel, Input, Box, VStack, Heading } from "@chakra-ui/react";

type FormObject = Record<string, any>;

const RecursiveBasicForm = ({ object, prefix = "" }: { object: FormObject; prefix?: string }) => {
	// Prepare the fields by iterating through the object
	const fields = Object.entries(object).map(([key, value]) => {
		const fieldName = prefix ? `${prefix}.${key}` : key;

		if (typeof value === "object" && value !== null) {
			// If the value is an object, recurse with a nested form
			return (
				<Box key={fieldName} borderWidth="1px" borderRadius="md" p={4}>
					<Heading size="sm" mb={4}>
						{key}
					</Heading>
					<RecursiveBasicForm object={value} prefix={fieldName} />
				</Box>
			);
		}

		// Otherwise, render a form field for the value
		return (
			<FormControl key={fieldName}>
				<FormLabel>{key}</FormLabel>
				<Input name={fieldName} defaultValue={value} placeholder={`Enter ${key}`} />
			</FormControl>
		);
	});

	// Return the pre-calculated fields inside a vertical stack
	return <VStack align="stretch" spacing={4}>{fields}</VStack>;
};

const RecursiveFormInternal = ({ object, settings, update, prefix = "" }: { object: FormObject; settings: any; update: any, prefix?: string }) => {
	// Prepare the fields by iterating through the object
	const fields = Object.entries(object).map(([key, value]) => {
		const fieldName = prefix ? `${prefix}.${key}` : key;
		const currentSettings = settings[key];
		const name = currentSettings?.name ?? key;
		const display = (currentSettings?.display ?? true) ? "flex" : "none";
		const editable = currentSettings?.editable ?? false;


		if (typeof value === "object" && value !== null) {
			// If the value is an object, recurse with a nested form
			return (
				<Box key={fieldName} borderWidth="1px" borderRadius="md" p={4}>
					<Heading size="sm" mb={4}>
						{name}
					</Heading>
					<RecursiveFormInternal object={value} settings={currentSettings} update={update} prefix={fieldName} />
				</Box>
			);
		}

		// Otherwise, render a form field for the value
		return (
			<FormControl display={display} key={fieldName} flexDirection="row" alignItems="center" >
				<FormLabel>{name}</FormLabel>
				<Input
					name={fieldName}
					value={value}
					placeholder={`Enter ${key}`}
					onChange={(e) => update(fieldName, e.target.value)}
					isDisabled={!editable}
				/>
			</FormControl>
		);
	});

	// Return the pre-calculated fields inside a vertical stack
	return <VStack align="stretch" spacing={4}>{fields}</VStack>;
};

export function RecursiveForm({ object, settings, update}: { object: FormObject; settings: any; update: any }) {
	const updateObject = (path: string, value: any) => {
		update((draft: any) => {
			const keys = path.split(".");
			let current = draft;
			for (let i = 0; i < keys.length - 1; i++) {
				current = current[keys[i]];
			}
			current[keys[keys.length - 1]] = value;
		});
	};

	return (
		<RecursiveFormInternal object={object} settings={settings} update={updateObject}/>
	);
}

