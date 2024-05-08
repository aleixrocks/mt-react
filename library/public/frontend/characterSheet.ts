async function myFunction() {
  console.log("MyFunc function called!");
  console.log("panel name: " +MapTool.getName());
  // TODO consider encoding data https://discord.com/channels/296230822262865920/1228749752565497916/1228762433330348042
  // another way of handling this from a non-async function: MapTool.getUserData().then(obj => console.log(JSON.stringify(obj)));
  const dataStr: string = await MapTool.getUserData();
  const data: any = JSON.parse(dataStr);
  console.log("getUserData: " + dataStr);
  console.log(" - currentTokenId: " + data["currentTokenId"]);
  console.log("=====");
  const rtt = new Robotta("Lazuly");
  console.log(rtt.name);
  console.log(rtt.greet());


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

