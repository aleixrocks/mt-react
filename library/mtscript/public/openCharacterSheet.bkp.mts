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
      <pre><a href="#" onclick="callMTScriptMacro('[r: currentToken()]')">MTScript Async Macro Call</a></pre>
    </body>
  </html>

  <script src="lib://com.gitlab.aleixrocks.robotta/characterSheetScript.js"></script>

}]
