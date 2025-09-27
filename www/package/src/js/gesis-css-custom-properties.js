const injectColorTable = function() {
  const gesisCssCustomProperties = Array.from(document.getElementsByClassName('gesis-css-custom-properties'));
  if (gesisCssCustomProperties.length >= 1) {
    const colorProperties = Array.from(document.styleSheets)
      .filter(
        sheet =>
        sheet.href === null || sheet.href.startsWith(window.location.origin)
      )
      .reduce(
        (acc, sheet) =>
        (acc = [
          ...acc,
          ...Array.from(sheet.cssRules).reduce(
            (def, rule) =>
            (def =
              rule.selectorText === ":root" ? [
                ...def,
                ...Array.from(rule.style).filter(name =>
                   //name.startsWith("--gesis-color")
                   //name.match("--gs\-\-color")
                   name.match(new RegExp('--gs--(color|gradient)'))
                )
              ] :
              def), []
          )
        ]), []
      ).reduce((accu, current) => {
        const pair = {
          [current]: getComputedStyle(document.documentElement)
            .getPropertyValue(current).trim()
        };
        const result = {
          ...accu,
          ...pair
        };
        return result;
      }, {});

    let html = `
    <table><tbody>
    `.trim();

    for (const [key, value] of Object.entries(colorProperties)) {
      html += `<tr><td><code>${key}</code></td><td><code>${value}</code></td><td style="background: ${value}"></td></tr>`;
    }

    html += `
    </tbody></table>
    `.trim();

    gesisCssCustomProperties[0].innerHTML = html;
  }
};

export {
  injectColorTable
};
