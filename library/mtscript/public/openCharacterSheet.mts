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
      [macroLink("roll", "basicRoll@this", "none", basicRollArgs)]
    </body>
  </html>
}]
