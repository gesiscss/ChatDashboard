/*! DataTables GESIS-Web Frontend Framework integration
 adapted from
 https://github.com/DataTables/Dist-DataTables-Bootstrap5/blob/1.13.4/js/dataTables.bootstrap5.mjs
 with many (not all) WCAG ARIA accessibility improvements according to
 https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/
 https://design-system.w3.org/components/pagination.html
 
 TODOS:
 * for sorting by column, instead of adding click event handler on the th elements,
   it may be better to have dedicated buttons inside the th elements,
   because th's default ARIA role "columnheader" clashes with aria-label
   and an intended interactive element role.
 * the table pagination nav element could provide a more expressive aria-label, e.g.
   by leveraging a possibly existing table caption element, or falling back to a unique datatables table number.
   this would improve landmark navigation when there are multiple tables.
 * A different arrangement/order of
   number-of-rows, search, the actual table, current shown filter info, and pagination
   could possibly improve accessibility. Currently, the table is in-between the controlling widgets,
   possibly complicating accessible interaction
*/
import $ from 'jquery';
import DataTable from 'datatables.net';

/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
  // forbid DataTables to mess with table width (DataTables otherwise adds a literal calculated width to the table element)
  // see https://datatables.net/reference/option/autoWidth
  // see https://datatables.net/forums/discussion/60119/how-to-avoid-datatables-setting-width-of-table
  autoWidth: false,
  // see https://datatables.net/examples/basic_init/dom.html
  dom: '<"row row-cols-auto my-2 gy-2"<"col"l><"col"f>><"table-responsive"t>ip',
  renderer: 'gesisweb'
} );


// see https://legacy.datatables.net/styling/custom_classes
// see https://github.com/DataTables/Dist-DataTables/blob/1.13.5/types/types.d.ts
$.extend( DataTable.ext.classes, {
  sWrapper: "dataTables_wrapper dt-gesisweb",
  sInfo: "dataTables_info my-2",
  sPaging: "dataTables_paginate my-2 paging_",
  sPageButton: "page-item"
} );


DataTable.ext.renderer.pageButton.gesisweb = function ( settings, host, idx, buttons, page, pages ) {
  var api     = new DataTable.Api( settings );
  var classes = settings.oClasses;
  var lang    = settings.oLanguage.oPaginate;
  var ariaLang = settings.oLanguage.oAria.paginate || {};
  var btnDisplay, btnClass;
  var ariaLabel;

  var attach = function( container, buttons ) {
    var i, ien, node, button;
    var clickHandler = function ( e ) {
      e.preventDefault();
      if ( !$(e.currentTarget).hasClass('disabled') && api.page() != e.data.action ) {
        api.page( e.data.action ).draw( 'page' );
      }
    };

    for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
      button = buttons[i];

      if ( Array.isArray( button ) ) {
        attach( container, button );
      }
      else {
        btnDisplay = '';
        btnClass = '';

        switch ( button ) {
          case 'ellipsis':
            btnDisplay = '&#x2026;';
            btnClass = 'disabled';
            break;

          case 'first':
            btnDisplay = lang.sFirst;
            btnClass = button + (page > 0 ?
              '' : ' disabled');
            ariaLabel = ariaLang['first'];
            break;

          case 'previous':
            btnDisplay = lang.sPrevious;
            btnClass = button + (page > 0 ?
              '' : ' disabled');
            ariaLabel = ariaLang['previous'];
            break;

          case 'next':
            btnDisplay = lang.sNext;
            btnClass = button + (page < pages-1 ?
              '' : ' disabled');
            ariaLabel = ariaLang['next'];
            break;

          case 'last':
            btnDisplay = lang.sLast;
            btnClass = button + (page < pages-1 ?
              '' : ' disabled');
            ariaLabel = ariaLang['last'];
            break;

          default:
            const buttonNumber = button + 1;
            btnDisplay = buttonNumber;
            ariaLabel = `${ariaLang['page']} ${buttonNumber}`;
            break;
        }

        if ( btnDisplay ) {
          var disabled = btnClass.indexOf('disabled') !== -1;

          node = $('<li>', {
              'class': page === button ? classes.sPageButton + ' active' : classes.sPageButton,
              'id': idx === 0 && typeof button === 'string' ?
                settings.sTableId +'_'+ button :
                null
            } )
            .append( $('<a>', {
                'href': disabled ? null : '#',
                'title': ariaLabel,
                'aria-controls': settings.sTableId,
                'aria-disabled': disabled ? 'true' : null,
                'aria-label': ariaLabel,
                'aria-current': page === button ? 'page' : null,
                'data-dt-idx': button,
                'tabindex': disabled ? '-1' : settings.iTabIndex,
              } )
              .html( btnDisplay )
            )
            .appendTo( container );

          settings.oApi._fnBindAction(
            node, {action: button}, clickHandler
          );
        }
      }
    }
  };

  var hostEl = $(host);
  // IE9 throws an 'unknown error' if document.activeElement is used
  // inside an iframe or frame. 
  var activeEl;

  try {
    // Because this approach is destroying and recreating the paging
    // elements, focus is lost on the select button which is bad for
    // accessibility. So we want to restore focus once the draw has
    // completed
    activeEl = hostEl.find(document.activeElement).data('dt-idx');
  }
  catch (e) {}

  // var paginationEl = hostEl.children('ul.gs_pagebrowser.gap-2.list-group.list-group-horizontal.flex-wrap');
  var paginationEl = hostEl.find('ul');

  if (paginationEl.length) {
    paginationEl.empty();
  }
  else {
    // initialization
    paginationEl = hostEl.html(`<nav aria-label="${ariaLang['tablepagination']}"><ul/></nav>`);
    paginationEl = hostEl.find('ul');
    paginationEl.addClass('pagination');
  }

  attach(
    paginationEl,
    buttons
  );

  if ( activeEl !== undefined ) {
    hostEl.find('[data-dt-idx='+activeEl+']').trigger('focus');
  }
};

export {
  DataTable as GesisDataTable,
};
