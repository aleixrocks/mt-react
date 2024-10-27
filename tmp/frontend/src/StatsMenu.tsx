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

function SimpleEditableField({name, value, onChange}: {name: String, value: String | Number, onChange: any}) {
	return (
		<Flex alignItems="center">
			<Text fontWeight="bold" mr={2}>
				{name}
			</Text>
			<Editable defaultValue={value.toString()} onChange = {onChange}>
				<EditablePreview />
				<EditableInput />
			</Editable>
		</Flex>
	)
}

function SimpleEditableMaxField({name, value, max, onChange}: {name: String, value: Number, max: Number, onChange: any}) {
	return (
		<Flex alignItems="center">
			<Text fontWeight="bold" mr={2}>
				{name}
			</Text>
			<Editable defaultValue={value.toString()} onChange = {onChange}>
				<EditablePreview />
				<EditableInput />
			</Editable>
			<Text fontWeight="bold" mr={2}>
				| {max.toString()}
			</Text>
		</Flex>
	)
}

function StateMenuOld() {
	const [rtt, updateRtt] = useRobotta();
	return (<>
		<HStack>
			<VStack>
				<SimpleEditableField name = "Nombre" value = {rtt.name} onChange = {(x: any) => updateRtt((draft: Robotta)=> {draft.name = x})}/>
				<SimpleEditableField name = "Diseño" value = {rtt.design} onChange = {(x: any) => updateRtt((draft: Robotta)=> {draft.design = x})}/>
			</VStack>
			<VStack>
				<SimpleEditableMaxField
					name = "Soporte Vital"
					value = {rtt.state.vitalSupport}
					max   = {rtt.state.vitalSupportMax}
					onChange = {(x: any) => updateRtt((draft: Robotta)=> {draft.state.vitalSupport = x})}
				/>
				<SimpleEditableMaxField
					name = "Células de Energía"
					value = {rtt.state.energyCells}
					max   = {rtt.state.energyCellsMax}
					onChange = {(x: any) => updateRtt((draft: Robotta)=> {draft.state.energyCells = x})}
				/>
			</VStack>
		</HStack>
	</>);
}

function StateMenuValue<
	p1 extends keyof Robotta,
	p2 extends keyof Robotta[p1]
>({name, property1, property2} : {
	name: string,
	property1: p1,
	property2: p2 | null
}) {
	const [rtt, updateRtt] = useRobotta();
	return (
	<Grid
		h="200px"
		templateColumns="repeat(3, 1fr)"
		gap={4}
	>
		<GridItem>
			<Text> {name} </Text>
		</GridItem>
		<GridItem>
			<Editable
				defaultValue={(property2 ? rtt[property1][property2] : rtt[property1]) as string}
				onChange = {(value : any) => updateRtt((draft: Robotta) => {
					if (property2) {
						draft[property1][property2] = value;
					} else {
						draft[property1] = value;
					}
				})}
			>
				<EditablePreview />
				<EditableInput />
			</Editable>
		</GridItem>
		<GridItem>
			<Text> {"Max"} </Text>
		</GridItem>
	</Grid>
	);
}


function StateMenu() {
	const [rtt, updateRtt] = useRobotta();
	return (
	<Grid
		h="200px"
		templateColumns="repeat(2, 1fr)"
		gap={4}
	>
		<GridItem>
			<StateMenuValue name = "Name" property1 = "name" property2 = {null}/>
		</GridItem>
		<GridItem>
			<StateMenuValue name = "Design" property1 = "design" property2 = {null} />
		</GridItem>
		<GridItem>
			<StateMenuValue name = "Soporte Vital" property1 = "state" property2 = "vitalSupport" />
		</GridItem>
		<GridItem>
			<StateMenuValue name = "Energy" property1 = "state" property2 = "energyCells" />
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
