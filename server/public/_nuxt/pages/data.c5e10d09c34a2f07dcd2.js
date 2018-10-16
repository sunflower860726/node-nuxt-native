/*! For license information please see LICENSES */
webpackJsonp([1],{"812o":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section"},[n("div",{staticClass:"container"},[n("div",{staticClass:"columns"},[n("div",{staticClass:"column"},[n("div",{staticStyle:{"background-color":"#f4f4f4",padding:"10px"}},[n("b-field",{attrs:{label:"Patients"}},[n("b-taginput",{attrs:{autocomplete:"",data:t.filteredPatients,icon:"label",placeholder:"Add a tag",field:"title","open-on-focus":t.openOnFocus},on:{typing:t.getFilteredPatients},model:{value:t.selectedPatients,callback:function(e){t.selectedPatients=e},expression:"selectedPatients"}})],1)],1)]),n("div",{staticClass:"column is-one-fifth"},[n("div",{staticStyle:{"background-color":"#f4f4f4",padding:"10px"}},[n("b-field",{attrs:{label:"Start date"}},[n("b-datepicker",{attrs:{placeholder:"Click to select...",icon:"calendar-today"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}})],1)],1)]),n("div",{staticClass:"column is-one-fifth"},[n("div",{staticStyle:{"background-color":"#f4f4f4",padding:"10px"}},[n("b-field",{attrs:{label:"End date"}},[n("b-datepicker",{attrs:{placeholder:"Click to select...",icon:"calendar-today",position:"is-bottom-left"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}})],1)],1)])])]),n("div",{staticClass:"container"},[t.allowDownload?n("div",{staticClass:"level is-mobile",staticStyle:{"min-height":"200px","line-height":"200px"}},[n("div",{staticClass:"level-item has-text-centered"},[n("a",{staticClass:"button is-primary",on:{click:function(e){t.downloadUAS()}}},[t._v("UAS")]),n("a",{staticClass:"button is-primary",staticStyle:{"margin-left":"10px"},on:{click:function(e){t.downloadAAS()}}},[t._v("AAS")]),n("a",{staticClass:"button is-primary",staticStyle:{"margin-left":"10px"},on:{click:function(e){t.downloadCT()}}},[t._v("Control Test")]),n("a",{staticClass:"button is-primary",staticStyle:{"margin-left":"10px"},on:{click:function(e){t.downloadUQOL()}}},[t._v("Urticaria Quality of life")]),n("a",{staticClass:"button is-primary",staticStyle:{"margin-left":"10px"},on:{click:function(e){t.downloadAQOL()}}},[t._v("Angioedema Quality of life")])])]):n("div",{staticClass:"has-text-centered",staticStyle:{"min-height":"200px","line-height":"200px"}},[t._v("\n      Select information to retrieve data.\n    ")])])])};a._withStripped=!0;var i={render:a,staticRenderFns:[]};e.a=i},LGuY:function(t,e){t.exports=function(){throw new Error("define cannot be used indirect")}},R5Cj:function(t,e,n){var a=n("aBZx");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("55d02a2c",a,!1)},VylR:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("vMAU"),i=n("812o"),s=!1;var o=function(t){s||n("R5Cj")},r=n("VU/8")(a.a,i.a,!1,o,null,null);r.options.__file="pages/data.vue",e.default=r.exports},aBZx:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,".input,.taginput .taginput-container.is-focusable,.textarea{-webkit-box-shadow:none;box-shadow:none}.taginput .taginput-container.is-focusable{height:2.25em;padding-top:0;padding-bottom:0}",""])},lDdF:function(t,e,n){var a,i=i||function(t){"use strict";if(!(void 0===t||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var e=function(){return t.URL||t.webkitURL||t},n=t.document.createElementNS("http://www.w3.org/1999/xhtml","a"),a="download"in n,i=/constructor/i.test(t.HTMLElement)||t.safari,s=/CriOS\/[\d]+/.test(navigator.userAgent),o=function(e){(t.setImmediate||t.setTimeout)(function(){throw e},0)},r=function(t){setTimeout(function(){"string"==typeof t?e().revokeObjectURL(t):t.remove()},4e4)},c=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t},l=function(l,d,u){u||(l=c(l));var f,p=this,h="application/octet-stream"===l.type,v=function(){!function(t,e,n){for(var a=(e=[].concat(e)).length;a--;){var i=t["on"+e[a]];if("function"==typeof i)try{i.call(t,n||t)}catch(t){o(t)}}}(p,"writestart progress write writeend".split(" "))};if(p.readyState=p.INIT,a)return f=e().createObjectURL(l),void setTimeout(function(){var t,e;n.href=f,n.download=d,t=n,e=new MouseEvent("click"),t.dispatchEvent(e),v(),r(f),p.readyState=p.DONE});!function(){if((s||h&&i)&&t.FileReader){var n=new FileReader;return n.onloadend=function(){var e=s?n.result:n.result.replace(/^data:[^;]*;/,"data:attachment/file;");t.open(e,"_blank")||(t.location.href=e),e=void 0,p.readyState=p.DONE,v()},n.readAsDataURL(l),void(p.readyState=p.INIT)}f||(f=e().createObjectURL(l)),h?t.location.href=f:t.open(f,"_blank")||(t.location.href=f);p.readyState=p.DONE,v(),r(f)}()},d=l.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,n){return e=e||t.name||"download",n||(t=c(t)),navigator.msSaveOrOpenBlob(t,e)}:(d.abort=function(){},d.readyState=d.INIT=0,d.WRITING=1,d.DONE=2,d.error=d.onwritestart=d.onprogress=d.onwrite=d.onabort=d.onerror=d.onwriteend=null,function(t,e,n){return new l(t,e||t.name||"download",n)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);void 0!==t&&t.exports?t.exports.saveAs=i:null!==n("LGuY")&&null!==n("nErl")&&(void 0===(a=function(){return i}.call(e,n,e,t))||(t.exports=a))},nErl:function(t,e){(function(e){t.exports=e}).call(e,{})},vMAU:function(t,e,n){"use strict";var a=n("Dd8w"),i=n.n(a),s=n("NYxO"),o=n("Eoz/"),r=n.n(o),c=n("lDdF");n.n(c);e.a={layout:"authenticated",data:function(){return{filteredPatients:[],selectedPatients:[],selectedPatientsMap:{},startDate:null,endDate:null,openOnFocus:!0}},mounted:function(){var t=this;this.findPatients().then(function(e){t.filteredPatients=t.formattedPatients}).catch(function(e){console.log(e.message),e&&401===e.code&&t.$router.push("login")})},computed:i()({},Object(s.mapGetters)({patients:"patients/list"}),{formattedPatients:function(){return this.patients.map(function(t){return{patient:t,title:t.name+"<"+t.email+">"}})},allowDownload:function(){return this.selectedPatients.length>0&&this.startDate&&this.endDate}}),methods:i()({},Object(s.mapActions)({findPatients:"patients/find",getUAS:"uas/find",getAAS:"aas/find",getCT:"ct/find",getUQOL:"uqol/find",getAQOL:"aqol/find"}),{getFilteredPatients:function(t){this.filteredPatients=this.formattedPatients.filter(function(e){return e.title.indexOf(t)>-1})},downloadUAS:function(){var t=this,e=this.selectedPatients.map(function(t){return t.patient._id});this.getUAS({query:{startDate:r()(this.startDate,"YYYY-MM-DD"),endDate:r()(this.endDate,"YYYY-MM-DD"),patients:e}}).then(function(e){t.uasToCSV(e)})},downloadAAS:function(){var t=this,e=this.selectedPatients.map(function(t){return t.patient._id});this.getAAS({query:{startDate:r()(this.startDate,"YYYY-MM-DD"),endDate:r()(this.endDate,"YYYY-MM-DD"),patients:e}}).then(function(e){t.aasToCSV(e)})},downloadCT:function(){var t=this,e=this.selectedPatients.map(function(t){return t.patient._id});this.getCT({query:{startDate:r()(this.startDate,"YYYY-MM-DD"),endDate:r()(this.endDate,"YYYY-MM-DD"),patients:e}}).then(function(e){t.resultsToCSV(e,"ct.csv")})},downloadUQOL:function(){var t=this,e=this.selectedPatients.map(function(t){return t.patient._id});this.getUQOL({query:{startDate:r()(this.startDate,"YYYY-MM-DD"),endDate:r()(this.endDate,"YYYY-MM-DD"),patients:e}}).then(function(e){t.resultsToCSV(e,"uqol.csv")})},downloadAQOL:function(){var t=this,e=this.selectedPatients.map(function(t){return t.patient._id});this.getAQOL({query:{startDate:r()(this.startDate,"YYYY-MM-DD"),endDate:r()(this.endDate,"YYYY-MM-DD"),patients:e}}).then(function(e){t.resultsToCSV(e,"aqol.csv")})},objectToCSV:function(t,e){var n="";return t.forEach(function(t){n+=e(t)+"\n"}),n},uasToCSV:function(t){var e=this,n="Patient,Date,Hive,Itch\n";n+=this.objectToCSV(t,function(t){return e.selectedPatientsMap[t.patientId].name+","+t.date+","+t.hive+","+t.itch});var a=new Blob([n],{type:"text/csv;charset=utf-8"});c.saveAs(a,"uas.csv")},aasToCSV:function(t){var e=this,n="Patient,Date,Q1,Q2,Q3,Q4\n";n+=this.objectToCSV(t,function(t){return e.selectedPatientsMap[t.patientId].name+","+t.date+","+t.results[0]+","+t.results[1]+","+t.results[2]+","+t.results[3]});var a=new Blob([n],{type:"text/csv;charset=utf-8"});c.saveAs(a,"aas.csv")},resultsToCSV:function(t,e){var n=this,a="Patient,Date,Results\n";if(t.length>0){a+=this.objectToCSV(t,function(t){return n.selectedPatientsMap[t.patientId].name+","+t.date+","+t.results})}var i=new Blob([a],{type:"text/csv;charset=utf-8"});c.saveAs(i,e)}}),watch:{selectedPatients:function(){var t={};this.selectedPatients.forEach(function(e){t[e.patient._id]=e.patient}),this.selectedPatientsMap=t},startDate:function(){},endDate:function(){}}}}});