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

  Flex,
  Text,

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

function StateMenu() {
	const [rtt, updateRtt] = useRobotta();
	return (<>
		<SimpleEditableField name = "Nombre" value = {rtt.name} onChange = {(x: any) => updateRtt((draft: Robotta)=> {draft.name = x})}/>
		<SimpleEditableField name = "Diseño" value = {rtt.design} onChange = {(x: any) => updateRtt((draft: Robotta)=> {draft.design = x})}/>
	</>);
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
