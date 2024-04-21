function myFunction() {
    // Write your JavaScript code here
    //alert("You clicked the link!");
  console.log("patataaaaaa")
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

