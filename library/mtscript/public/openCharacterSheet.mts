[h: propNames = "calculo, destreza, carisma, firewill, percepcion, fortaleza"]
[frame5("Frame Test"): {
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
    </body>
  </html>
}]
