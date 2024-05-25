async function myFunction() {
	try {
		console.log("MyFunc function called!");
		console.log("panel name: " +MapTool.getName());
		// TODO consider encoding data https://discord.com/channels/296230822262865920/1228749752565497916/1228762433330348042
		// another way of handling this from a non-async function: MapTool.getUserData().then(obj => console.log(JSON.stringify(obj)));
		const dataStr: string = await MapTool.getUserData();
		const data: any = JSON.parse(dataStr);
		const tokenId = data["currentTokenId"]
		console.log("getUserData: " + dataStr);
		console.log(" - currentTokenId: " + tokenId);
		console.log("=====");
		const rttStr: any = await callMTScriptMacro('[r: js.getRobotta("'+tokenId+'")]');
		console.log("value returned: " + rttStr);
		const rttObj: RobottaData = JSON.parse(rttStr);
		const lazuly: any = new Robotta(rttObj);
		console.log("object created: " + JSON.stringify(lazuly));

		console.log("armas:");
		for (let weaponSlot of lazuly.weapons) {
			const id = weaponSlot.id;
			const weapon = WeaponStore.getItem(id);
			console.log(" - "+JSON.stringify(weapon));
		}

		console.log("armaduras:");
		for (let armorSlot of lazuly.armors) {
			const id = armorSlot.id;
			const armor = ArmorStore.getItem(id);
			console.log(" - "+JSON.stringify(armor));
		}

		console.log(`exos (max:${lazuly.exos.max})`);
		for (let exoSlot of lazuly.exos.slots) {
			const id = exoSlot.id;
			const exo = ExoStore.getItem(id);
			console.log(" - "+JSON.stringify(exo));
		}
		console.log("Singularidad:");
		for (let singularity of SingularityStore.items) {
			console.log(" - "+JSON.stringify(singularity));
		}
		console.log("Isaak:");
		console.log(` - points: ${JSON.stringify(lazuly.state.isak)}`);
		for (let point of lazuly.state.isak) {
			const node = IsakChain.getItem(point);
			console.log(` - point ${node.id}: ${node.description}`);
			for (let nextPoint of node.links) {
				const nextNode = IsakChain.getItem(nextPoint);
				console.log(`   - next: ${nextNode.id}: ${nextNode.description}`);
			}
		}
		console.log("done!");
	}catch (error: any) {
		console.log("Error: Myfunction: backtrace:\n" + error.stack);
	}
	// this does not work! The whole script refuses to run without a single
	// error. I think that I should use a try catch block
	//console.log("token: " + JSON.stringify(token));
}

async function callMTScriptMacro(macro: string) {
  try {
      console.log("### calling callMTScriptMacro!");
      let uri = "macro:evaluateMacro@lib:com.gitlab.aleixrocks.robotta";
      let r = await fetch(uri, { method: "POST", body: macro });
      let result = await r.text();
      console.log("### callMTScriptMacro result="+result);
      return result;
  } catch (error: any) {
      console.log("### callMTScriptMacro error: " + error.stack);
  }
}

async function loadRobotta(tokenId: string): Promise<Robotta> {
	const rttStr: any = await callMTScriptMacro('[r: js.getRobotta("'+tokenId+'")]');
	const rttObj: RobottaData = JSON.parse(rttStr);
	const rtt: any = new Robotta(rttObj);
	return rtt;
}

function attributeButtonSelect(rtt: Robotta, div: HTMLDivElement)
{
	var selected: HTMLButtonElement | null = null;

	// Create a button for each attribute in the Robotta
	for (const [key, value] of Object.entries(rtt.attributes)) {
		const button = document.createElement('button');
		button.name = key;
		button.value = value.toString();
		button.innerText = `${key} ${value}`;
		button.classList.add('buttonAttribute', 'toggleButton');
		div.appendChild(button);
	}

	// Manage the selected value. Only one value is permitted.
	div.addEventListener("click", event => {
		const element = event.target as HTMLElement;
		if (!element) {
			console.log("no event!");
			return;
		}
		if (element.tagName != "BUTTON") {
			console.log("element is not a button!");
		}
		// Toggle selected button
		const button = element as HTMLButtonElement;
		if (button.classList.toggle("active")) {
			selected?.classList.remove("active");
			selected = button;
		} else {
			selected = null;
		}

		event.stopPropagation();
	});
}

function professionButtonSelect(rtt: Robotta, div: HTMLDivElement)
{
	var selected: HTMLButtonElement | null = null;

	// Create a button for each profession in the Robotta
	for (const profession of rtt.professions) {
		const button = document.createElement('button');
		button.name = profession.name;
		button.value = profession.value.toString();
		button.innerText = `${profession.name} ${profession.value}`;
		button.classList.add('buttonProfession', 'toggleButton');
		div.appendChild(button);
	}

	// Manage the selected value. Only one value is permitted.
	div.addEventListener("click", event => {
		const element = event.target as HTMLElement;
		if (!element) {
			console.log("no event!");
			return;
		}
		if (element.tagName != "BUTTON") {
			console.log("element is not a button!");
		}
		// Toggle selected button
		const button = element as HTMLButtonElement;
		if (button.classList.toggle("active")) {
			selected?.classList.remove("active");
			selected = button;
		} else {
			selected = null;
		}

		event.stopPropagation();
	});
}

async function init() {
	// Retrieve user data
	const dataStr: string = await MapTool.getUserData();
	const data: any = JSON.parse(dataStr);
	const tokenId = data["currentTokenId"]

	// Load Robotta
	const rtt = await loadRobotta(tokenId);
	if (!rtt) {
		console.log(`Error: Could not load Robotta with id ${tokenId}`);
		return;
	}
	
	// Load DOM main character sheet
	const buttonAbilityCheck = document.querySelector('#buttonAbilityCheck');
	const divRollMenu = document.querySelector('#divRollMenu');
	if (!buttonAbilityCheck || !divRollMenu) {
		console.log("Error: buttonAbilityCheck, divRollMenu not found");
		return;
	}
	buttonAbilityCheck.addEventListener("click", event => {
		divRollMenu.classList.toggle('hidden');
	});

	// Build DOM of "Accion de caracterisitca"
	const divAttributes = document.querySelector('#divRollMenu > .divAttributes') as HTMLDivElement;
	if (!divAttributes) {
		console.log("Error: divAttributes not found!");
		return;
	}
	attributeButtonSelect(rtt, divAttributes);
	const divProfessions = document.querySelector('#divRollMenu > .divProfessions') as HTMLDivElement;
	if (!divProfessions) {
		console.log("Error: divProfessions not found!");
		return;
	}
	professionButtonSelect(rtt, divProfessions);
}

try {
	init();
} catch (error: any) {
	console.log("Error during Init:\n" + error.stack);
}
