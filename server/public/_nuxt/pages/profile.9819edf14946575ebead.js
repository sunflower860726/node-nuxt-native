webpackJsonp([7],{"7PhA":function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=s("aiWX"),a=s("XOgD"),l=!1;var r=function(t){l||s("8KWZ")},n=s("VU/8")(e.a,a.a,!1,r,null,null);n.options.__file="pages/profile.vue",i.default=n.exports},"8KWZ":function(t,i,s){var e=s("JNd5");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);s("rjj0")("361b05f4",e,!1)},JNd5:function(t,i,s){(t.exports=s("FZ+f")(!1)).push([t.i,"a.button.is-rounded{height:40px;width:40px;border-radius:20px}",""])},XOgD:function(t,i,s){"use strict";var e=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("section",{staticClass:"section"},[s("div",{staticClass:"container"},[s("div",{staticClass:"level is-mobile"},[s("div",{staticClass:"level-left"},[s("div",{staticClass:"level-item"},[s("nuxt-link",{staticClass:"button is-rounded",attrs:{to:"/"}},[s("b-icon",{attrs:{icon:"arrow-left"}})],1)],1)]),s("div",{staticClass:"level-right"})]),s("div",{staticClass:"columns"},[t._m(0),s("div",{staticClass:"column"},[s("b-field",{attrs:{label:"Name"}},[s("b-input",{attrs:{disabled:!t.isEditing},model:{value:t.profile.name,callback:function(i){t.$set(t.profile,"name",i)},expression:"profile.name"}})],1),s("b-field",{attrs:{label:"Email"}},[s("b-input",{attrs:{disabled:!t.isEditing},model:{value:t.profile.email,callback:function(i){t.$set(t.profile,"email",i)},expression:"profile.email"}})],1),s("b-field",{attrs:{label:"Office / Clinic Address"}},[s("b-input",{attrs:{disabled:!t.isEditing},model:{value:t.profile.streetAddress,callback:function(i){t.$set(t.profile,"streetAddress",i)},expression:"profile.streetAddress"}})],1),s("div",{staticClass:"level is-mobile"},[s("div",{staticClass:"level-left"}),s("div",{staticClass:"level-right"},[t.isEditing?t._e():s("div",{staticClass:"field is-grouped"},[s("div",{staticClass:"control"},[s("a",{staticClass:"button is-primary",on:{click:function(i){i.stopPropagation(),t.isEditing=!t.isEditing}}},[t._v("Edit")])])]),t.isEditing?s("div",{staticClass:"field is-grouped"},[s("div",{staticClass:"control"},[s("a",{staticClass:"button is-primary",on:{click:function(i){t.save()}}},[t._v("Save")])]),s("div",{staticClass:"control"},[s("a",{staticClass:"button is-white",on:{click:function(i){t.isEditing=!t.isEditing}}},[t._v("Cancel")])])]):t._e()])])],1)])])])};e._withStripped=!0;var a={render:e,staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"column is-one-quarter",staticStyle:{"border-right":"1px #f0f0f0 solid"}},[i("div",{staticClass:"has-text-right"},[i("h3",{staticClass:"title is-5"},[this._v("PROFILE")])])])}]};i.a=a},aiWX:function(t,i,s){"use strict";var e=s("//Fk"),a=s.n(e),l=s("fZjL"),r=s.n(l),n=s("woOf"),o=s.n(n),c=s("Dd8w"),d=s.n(c),u=s("NYxO");i.a={layout:"authenticated",data:function(){return{isEditing:!1,profile:{}}},mounted:function(){this.user&&this.getProfile(this.user.hcp._id)},computed:d()({},Object(u.mapGetters)({hcp:"hcps/current"}),{user:function(){return this.$store.state.auth.user}}),watch:{user:function(){this.user&&this.getProfile(this.user.hcp._id)},hcp:function(){this.profile=o()({},this.hcp)}},methods:d()({},Object(u.mapActions)({getProfile:"hcps/get",updateProfile:"hcps/patch",updateUser:"users/patch"}),{save:function(){var t=this,i={},s={};this.user.email!==this.profile.email&&(i.email=this.profile.email),this.hcp.email!==this.profile.email&&(s.email=this.profile.email),this.hcp.name!==this.profile.name&&(s.name=this.profile.name),this.hcp.streetAddress!==this.profile.streetAddress&&(s.streetAddress=this.profile.streetAddress);var e=[];r()(i).length>0&&e.push(this.updateUser([this.user._id,i])),r()(s).length>0&&e.push(this.updateProfile([this.hcp._id,s])),e.length>0?a.a.all(e).then(function(){t.isEditing=!t.isEditing}):this.isEditing=!this.isEditing}})}}});