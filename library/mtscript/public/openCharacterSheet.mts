[h: propNames = "calculo, destreza, carisma, firewill, percepcion, fortaleza"]
[frame5("Character Sheet"): {
  <html>
    <head>
      <link rel="stylesheet" type="text/css" href="lib://com.gitlab.aleixrocks.robotta/characterSheetStyle.css">
      <title>Character Sheet</title>
    </head>
    <body>
      <table id="stats">
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
        [h: class = "oddRow"]
        [foreach(prop, propNames, ""), code: {
          <tr class="[r:class]">
            <td>[r: prop]</td>
            <td>[r: getProperty(prop)]</td>
          </tr>
          [h: class = if(class=="oddRow", "evenRow", "oddRow")]
        }]
      </table>
      [h: basicRollArgs = json.set("", "addBonus", "{}", "usePassion", 0, "useTrait", 0, "previousRolls", "[]", "toRepeatRollIndexes", "[]")]
      <pre>[r: json.indent(basicRollArgs,2)]</pre>
      [h: tokenId = currentToken()]
      <pre>Current Token ID: [r: tokenId]</pre>
      <pre>[macroLink("static MTScript call", "basicRoll@this", "none", basicRollArgs)]</pre>
      <pre>[macroLink("static JS call", "evaluateMacro@this", "none", '[r: js.evalURI("com.gitlab.aleixrocks.robotta", "lib://com.gitlab.aleixrocks.robotta/test.js", "'+tokenId+'")]')]</pre>
      <pre><a href="#" onclick="myFunction()">Frame5 js function call</a></pre>
      <pre><a href="#" onclick="callMacro('[r: currentToken()]')">MTScript Async Macro Call</a></pre>
    </body>
  </html>

  <script type="text/javascript">
    // Define the JavaScript function to be executed
    [r: '
    function myFunction() {
        // Write your JavaScript code here
        //alert("You clicked the link!");
      console.log("patataaaaaa")
    }
    async function callMacro(macro) {
      try {
          console.log("### calling callMacro!");
          //let uri = "macro:EvaluateMacro@lib:net.dovesoft.notebook";
          //let uri = "macro:evaluateMacro@this";
          //let uri = "lib://com.gitlab.aleixrocks.robotta/evaluateMacro.mts";
          let uri = "macro:evaluateMacro@lib:com.gitlab.aleixrocks.robotta";
          let r = await fetch(uri, { method: "POST", body: macro });
          let result = await r.text();
          console.log("### callMacro result="+result);
          return result;
      } catch (error) {
          console.log("### callMacro error: " + error.stack);
      }
    }
    ']
  </script>

}]
