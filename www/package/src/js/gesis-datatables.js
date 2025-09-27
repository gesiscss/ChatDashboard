import {
  getLanguage,
} from './gesis-helpers.js';

import {
  getGesisDataTable,
  getDataTableLanguageEn,
  getDataTableLanguageDe,
} from './gesis-import-async.js';

const lazySetupGesisDataTables = async function() {
  let initializedGesisDataTables = null;
  const gesisDataTableElements = document.querySelectorAll('.gesis-datatable table');
  if (
    gesisDataTableElements
    && 'length' in gesisDataTableElements
    && (gesisDataTableElements.length >= 1)
  ) {
    // only import GesisDataTable when there exists at least one element requiring it
    const GesisDataTable = await getGesisDataTable();
    
    initializedGesisDataTables = [];
    for (const gesisDataTableElement of gesisDataTableElements) {
      
      // check if this table element is not yet initialized as a DataTable
      // see https://datatables.net/manual/tech-notes/3#Object-instance-retrieval
      if ( ! GesisDataTable.isDataTable(gesisDataTableElement) ) {
        // WORKAROUND-DATATABLES: During initialization, DataTables creates a wrapper around the table element and its controls.
        // this messes up CSS styling rules for a potentially existing "table-responsive" div wrapper,
        // including the scroll faders on the left and right side.
        // to work around this issue, we first remove the "table-responsive" wrapper,
        // then later, gesis-datatable-extend.js' extended DataTable implementation
        // initializes the the custom DataTable instance with a specially crafted 'dom' option
        // which wraps the table in a "table-responsive" wrapper.
        const gesisDatatableElementParent = gesisDataTableElement.parentElement;
        const isTableResponsiveWrapped = gesisDatatableElementParent.classList.contains('table-responsive');
        if (isTableResponsiveWrapped) {
          gesisDatatableElementParent.insertAdjacentElement('beforebegin', gesisDataTableElement);
          gesisDatatableElementParent.remove();
        }
        
        const language = getLanguage();
        const datatablesLanguage = language === 'de' ? await getDataTableLanguageDe() : await getDataTableLanguageEn();
        
        const initializedGesisDataTable = new GesisDataTable(gesisDataTableElement, {
          language: datatablesLanguage,
          // avoid alert modal when trying to initialize an already initialized Datatable
          // see https://datatables.net/manual/tech-notes/3#retrieve
          retrieve: true,
        });
        
        initializedGesisDataTables.push(initializedGesisDataTable);
      }
      
    }
  }
  return initializedGesisDataTables;
};

export {
  lazySetupGesisDataTables,
};
