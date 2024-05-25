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

async function init() {
	// Retrieve user data
	const dataStr: string = await MapTool.getUserData();
	const data: any = JSON.parse(dataStr);
	const tokenId = data["currentTokenId"]

	// Load Robotta
	const rtt = await loadRobotta(tokenId);
	
	// Load DOM
	const buttonAbilityCheck = document.querySelector('#buttonAbilityCheck');
	const divRollMenu = document.querySelector('#divRollMenu');
	const spanTest = document.querySelector('#spanTest') as HTMLSpanElement;
	if (!buttonAbilityCheck || !divRollMenu) {
		console.log("not buttonAbilityCheck or divRollMenu found");
		return;
	}

	if (!spanTest) {
		console.log("not spanTest found");
		return;
	}

	if (!rtt) {
		console.log("no robotta loaded");
		return;
	}

	spanTest.innerText = rtt.name;

	buttonAbilityCheck.addEventListener("click", e => {
		divRollMenu.classList.toggle('hidden');
	});
}

try {
	init();
} catch (error: any) {
	console.log("Error during Init:\n" + error.stack);
}
