function myFunction() {
  console.log("MyFunc function called!")
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

