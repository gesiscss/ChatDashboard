/*! For license information please see 491.js.LICENSE.txt */
"use strict";(self.webpackChunk_gesis_web_gesis_web_frontend=self.webpackChunk_gesis_web_gesis_web_frontend||[]).push([[491],{491:(a,e,t)=>{t.r(e),t.d(e,{GesisDataTable:()=>n.A})
var s=t(692),i=/*#__PURE__*/t.n(s),n=t(846)
i().extend(!0,n.A.defaults,{autoWidth:!1,dom:'<"row row-cols-auto my-2 gy-2"<"col"l><"col"f>><"table-responsive"t>ip',renderer:"gesisweb"}),i().extend(n.A.ext.classes,{sWrapper:"dataTables_wrapper dt-gesisweb",sInfo:"dataTables_info my-2",sPaging:"dataTables_paginate my-2 paging_",sPageButton:"page-item"}),n.A.ext.renderer.pageButton.gesisweb=function(a,e,t,s,d,l){var r,o,g,b,p=new n.A.Api(a),u=a.oClasses,c=a.oLanguage.oPaginate,f=a.oLanguage.oAria.paginate||{},_=function(e,s){var n,b,v,w,x=function(a){a.preventDefault(),i()(a.currentTarget).hasClass("disabled")||p.page()==a.data.action||p.page(a.data.action).draw("page")}
for(n=0,b=s.length;n<b;n++)if(w=s[n],Array.isArray(w))_(e,w)
else{switch(r="",o="",w){case"ellipsis":r="&#x2026;",o="disabled"
break
case"first":r=c.sFirst,o=w+(d>0?"":" disabled"),g=f.first
break
case"previous":r=c.sPrevious,o=w+(d>0?"":" disabled"),g=f.previous
break
case"next":r=c.sNext,o=w+(d<l-1?"":" disabled"),g=f.next
break
case"last":r=c.sLast,o=w+(d<l-1?"":" disabled"),g=f.last
break
default:const a=w+1
r=a,g=`${f.page} ${a}`}if(r){var h=-1!==o.indexOf("disabled")
v=i()("<li>",{class:d===w?u.sPageButton+" active":u.sPageButton,id:0===t&&"string"==typeof w?a.sTableId+"_"+w:null}).append(i()("<a>",{href:h?null:"#",title:g,"aria-controls":a.sTableId,"aria-disabled":h?"true":null,"aria-label":g,"aria-current":d===w?"page":null,"data-dt-idx":w,tabindex:h?"-1":a.iTabIndex}).html(r)).appendTo(e),a.oApi._fnBindAction(v,{action:w},x)}}},v=i()(e)
try{b=v.find(document.activeElement).data("dt-idx")}catch(a){}var w=v.find("ul")
w.length?w.empty():(w=v.html(`<nav aria-label="${f.tablepagination}"><ul/></nav>`),(w=v.find("ul")).addClass("pagination")),_(w,s),void 0!==b&&v.find("[data-dt-idx="+b+"]").trigger("focus")}}}])

//# sourceMappingURL=491.js.map