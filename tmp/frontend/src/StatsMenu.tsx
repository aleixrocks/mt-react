import { Robotta } from 'shared/dist/Robotta';
import { useRobotta } from './RobottaProvider';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,

  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,

  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Grid,
  GridItem,

  InputLeftAddon
} from '@chakra-ui/react'


type StateType = 'editable' | 'editableMax' | 'radio';


function StateMenuSelect<T>({
	label,
	defaultValue,
	onChange,
	type,
	max = 0,
} : {
	label: string,
	defaultValue: T,
	onChange: (nextValue: string) => void,
	type: StateType
	max?: number,
}) {
	var component;
	switch (type) {
		case 'editable':
			component = (<Grid templateColumns="repeat(3, 1fr)" gap={4} >
				<GridItem>
					<Text> {label} </Text>
				</GridItem>
				<GridItem>
					<Editable defaultValue={`${defaultValue}`} onChange = {onChange}>
						<EditablePreview />
						<EditableInput />
					</Editable>
				</GridItem>
				<GridItem>
				</GridItem>
			</Grid>);
			break;
		case 'editableMax':
			component = (<Grid templateColumns="repeat(3, 1fr)" gap={4} >
				<GridItem>
					<Text> {label} </Text>
				</GridItem>
				<GridItem>
					<Editable defaultValue={`${defaultValue}`} onChange = {onChange}>
						<EditablePreview />
						<EditableInput />
					</Editable>
				</GridItem>
				<GridItem>
					<Text> {max} </Text>
				</GridItem>
			</Grid>);
			break;
		default:
			component = (<Text> Error </Text>);
	}

	return component;
}

function StateMenuCategoryValue<
	c extends keyof Robotta,
	p extends keyof Robotta[c]
>({label, property, category, type = "editable"} : {
	label: string,
	property: p,
	category: c,
	type?: StateType
}) {
	const [rtt, updateRtt] = useRobotta();
	const key = "${property}_${category}";
	const defaultValue = rtt[category][property] as string;
	const onChange = (nextValue: string) => updateRtt((draft: Robotta) => {
		draft[category][property] = nextValue as any;
	});
	const max = type === "editableMax" ? rtt[category][`${String(property)}Max` as keyof Robotta[c]] as number : 0;

	return (<StateMenuSelect
		key = {key}
		label = {label}
		defaultValue = {defaultValue}
		onChange = {onChange}
		type = {type}
		max = {max}
	/>);
}

function StateMenuValue<
	p extends keyof Robotta
>({label, property, type = "editable"} : {
	label: string,
	property: p,
	type?: StateType
}) {
	const [rtt, updateRtt] = useRobotta();
	const key = "${property}"
	const defaultValue = rtt[property] as string;
	const onChange = (nextValue: string) => updateRtt((draft: Robotta) => {
		draft[property] = nextValue as any;
	});
	// TODO fix the "any" below
	const max = type === "editableMax" ? rtt[`${String(property)}Max` as keyof Robotta] as any : 0;

	return (<StateMenuSelect
		key = {key}
		label = {label}
		defaultValue = {defaultValue}
		onChange = {onChange}
		type = {type}
		max = {max}
	/>);
}

function StateMenu() {
	const [rtt, updateRtt] = useRobotta();
	return (
	<Grid
		templateColumns="repeat(2, 1fr)"
		gap={4}
	>
		<GridItem>
			<StateMenuValue label = "Nombre" property = "name" />
		</GridItem>
		<GridItem>
			<StateMenuCategoryValue label = "Soporte Vital" category = "state" property = "vitalSupport" type = "editableMax" />
		</GridItem>
		<GridItem>
			<StateMenuCategoryValue label = "Energia" category = "state" property = "energyCells" type = "editableMax"/>
		</GridItem>
	</Grid>
	);
}

export function StatsMenu() {
	return (
		<Tabs>
			<TabList>
				<Tab>Estado</Tab>
				<Tab>Two</Tab>
				<Tab>Three</Tab>
			</TabList>
			
			<TabPanels>
				<TabPanel>
					<StateMenu/>
				</TabPanel>
				<TabPanel>
					<p>two!</p>
				</TabPanel>
				<TabPanel>
					<p>three!</p>
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}
