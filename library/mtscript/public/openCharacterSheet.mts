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
      [macroLink("roll", "basicRoll@this", "none", basicRollArgs)]
      [macroLink("roll.js", "evalMacro@this", "none", '[r: js.evalURI("com.gitlab.aleixrocks.robotta", "lib://com.gitlab.aleixrocks.robotta/test.js", "'+tokenId+'")]')]
      <a href="#" onclick="myFunction()">Click me</a>
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
    ']
  </script>

}]
