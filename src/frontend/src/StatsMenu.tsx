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


type StateType = 'editable' | 'editableMax' | 'check' | 'error';


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

type WidgetType = 'name' | 'vitalSupport' | 'energyCells' | 'condition';

//export type ConditionData = {
//	exhausted: boolean,
//	terrorized: boolean,
//	wounded: boolean,
//	severelyWounded: boolean,
//	infected: boolean,
//};

function StateMenuWidget({name}: {name: WidgetType})
{
	const [rtt, updateRtt] = useRobotta();

	const labels = {
		name: "Nombre",
		energyCells: "Energía",
		vitalSupport: "Soporte Vital",

		exhausted: "Exhausto",
		terrorized: "Atterorizado",
		wounded: "Herido",
		severelyWounded: "Herido Severo",
		infected: "Infectado",
	};

	var key: string;
	var defaultValue;
	var onChange = (val: string) => {};
	var stateType: StateType = 'editable';
	var max = 0;
	var com;

	switch(name) {
		case 'name': {
			var label: string = labels[name as keyof typeof labels];
			key = "${property}"
			const property: keyof Robotta = name;
			defaultValue = rtt[property]
			onChange = (nextValue: string) => updateRtt((draft: Robotta) => {
				draft[property] = nextValue;
			});
			stateType = 'editable' as StateType;
			com = (<StateMenuSelect
				key = {key}
				label = {label}
				defaultValue = {defaultValue}
				onChange = {onChange}
				type = {stateType}
				max = {max}
			/>);
			break;
		}
		case 'energyCells':
		case 'vitalSupport': {
			var label: string = labels[name as keyof typeof labels];
			const category: keyof Robotta = "state";
			const property: keyof Robotta[typeof category] = name;
			const maxProperty: keyof Robotta[typeof category] = `${name}Max`;
			key = "${category}_${property}";
			defaultValue = rtt[category][property];
			onChange = (nextValue: string) => updateRtt((draft: Robotta) => {
				draft[category][property] = Number(nextValue);
			});
			max = rtt[category][maxProperty];
			stateType = 'editableMax';
			com = (<StateMenuSelect
				key = {key}
				label = {label}
				defaultValue = {defaultValue}
				onChange = {onChange}
				type = {stateType}
				max = {max}
			/>);
			break;
		}
		case 'condition': {
			com = Object.entries(rtt.conditions).map(([conKey, conVal]) => {
				return (<StateMenuSelect
					key = {"${name}_${conKey}"}
					label = {labels[conKey as keyof typeof labels]}
					defaultValue = {conVal}
					onChange = {onChange}
					type = {stateType}
				/>);
			});
			break;
		}
		default:
			com = (<StateMenuSelect
				key = {'error'}
				label = {'Error'}
				defaultValue = {'Error'}
				onChange = {onChange}
				type = {'error'}
			/>);
	}

	return (<>{com}</>);
}

function StateMenu() {
	const [rtt, updateRtt] = useRobotta();
	return (
	<Grid
		templateColumns="repeat(2, 1fr)"
		gap={4}
	>
		<GridItem>
			<StateMenuWidget name = "name"/>
		</GridItem>
		<GridItem>
			<StateMenuWidget name = "vitalSupport"/>
		</GridItem>
		<GridItem>
			<StateMenuWidget name = "energyCells"/>
		</GridItem>
		<GridItem>
			<StateMenuWidget name = "condition"/>
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
