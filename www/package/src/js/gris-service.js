import {
  getJQuery,
  getJQueryTablesorter
} from './gesis-import-async.js';

const lazySetupGrisServiceProjectsTablesorters = async function() {
  // Make projects table sortable
  let grisServiceProjectsTablesorters = null;
  const grisServiceProjectsTableElements = document.querySelectorAll('.sortable-true.gris-service-projects-table');
  if (
    grisServiceProjectsTableElements
    && 'length' in grisServiceProjectsTableElements
    && (grisServiceProjectsTableElements.length >= 1)
  ) {
    const $ = await getJQuery();
    await getJQueryTablesorter();
    grisServiceProjectsTablesorters = [];
    for (const grisServiceProjectsTableElement of grisServiceProjectsTableElements) {
      const grisServiceProjectsTablesorter = $(grisServiceProjectsTableElement).tablesorter({
          dateFormat: "ddmmyyyy",
        });
      grisServiceProjectsTablesorters.push(grisServiceProjectsTablesorter);
    }
  }
  
  return grisServiceProjectsTablesorters;
};

export { lazySetupGrisServiceProjectsTablesorters };
