async function myFunction() {
  console.log("MyFunc function called!");
  console.log("panel name: " +MapTool.getName());
  // TODO consider encoding data https://discord.com/channels/296230822262865920/1228749752565497916/1228762433330348042
  // another way of handling this from a non-async function: MapTool.getUserData().then(obj => console.log(JSON.stringify(obj)));
  let data = await MapTool.getUserData();
  console.log("getUserData: " + JSON.stringify(data));
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

