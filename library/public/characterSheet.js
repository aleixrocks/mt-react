function myFunction() {
  console.log("MyFunc function called!");
  console.log("panel name: " +MapTool.getName());
  MapTool.getUserData().then(obj => console.log(JSON.stringify(obj)));
  console.log("getUserData: " + JSON.stringify(data));
  console.log("window.value: " +JSON.stringify(window.value));
}

async function callMTScriptMacro(macro) {
  try {
      console.log("### calling callMTScriptMacro!");
      let uri = "macro:evaluateMacro@lib:com.gitlab.aleixrocks.robotta";
      let r = await fetch(uri, { method: "POST", body: macro });
      let result = await r.text();
      console.log("### callMTScriptMacro result="+result);
      return result;
  } catch (error) {
      console.log("### callMTScriptMacro error: " + error.stack);
  }
}

