webpackJsonp([9],{"8KQb":function(t,s,i){(t.exports=i("FZ+f")(!1)).push([t.i,"",""])},TI02:function(t,s,i){var e=i("8KQb");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);i("rjj0")("11c574a4",e,!1)},XyyL:function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"is-auth-form"},[i("div",{staticClass:"container"},[t._m(0),i("b-field",{attrs:{label:"Email"}},[i("b-input",{model:{value:t.email,callback:function(s){t.email=s},expression:"email"}})],1),i("b-field",{attrs:{label:"Password"}},[i("b-input",{attrs:{type:"password","password-reveal":""},model:{value:t.password,callback:function(s){t.password=s},expression:"password"}})],1),i("div",{staticClass:"level is-mobile"},[i("div",{staticClass:"level-left"},[i("div",{staticClass:"control"},[i("a",{staticClass:"button is-primary",on:{click:function(s){t.login()}}},[t._v("Login")])])]),i("div",{staticClass:"level-right"},[i("div",[i("div",{staticStyle:{"text-align":"right"}},[i("nuxt-link",{attrs:{to:"reset-password"}},[t._v("RESET PASSWORD")])],1),i("div",{staticStyle:{"text-align":"right"}},[i("nuxt-link",{attrs:{to:"signup"}},[t._v("SIGN UP")])],1)])])])],1)])};e._withStripped=!0;var a={render:e,staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticStyle:{"text-align":"center",padding:"50px"}},[s("img",{attrs:{src:"/img/logo.png",width:"128"}})])}]};s.a=a},bIR0:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=i("chfC"),a=i("XyyL"),n=!1;var o=function(t){n||i("TI02")},r=i("VU/8")(e.a,a.a,!1,o,null,null);r.options.__file="pages/login.vue",s.default=r.exports},chfC:function(t,s,i){"use strict";var e=i("Dd8w"),a=i.n(e),n=i("NYxO");s.a={data:function(){return{email:null,password:null}},computed:{user:function(){return this.$store.state.auth.user}},watch:{user:function(){this.user&&-1!==this.user.roles.indexOf("hcp")?this.user.isVerified?this.$router.push("/"):(this.signout(),this.$toast.open({duration:5e3,message:"Please verify your e-mail first",position:"is-bottom",type:"is-danger"})):(this.signout(),this.$toast.open({duration:5e3,message:"You are not authorized to access this page",position:"is-bottom",type:"is-danger"}))}},methods:a()({},Object(n.mapActions)({signout:"auth/logout",authenticate:"auth/authenticate"}),{login:function(){var t=this;null!==this.password&&0!==this.password.length?this.authenticate({strategy:"local",email:this.email,password:this.password}).then(function(t){}).catch(function(s){t.$toast.open({duration:5e3,message:s.message,position:"is-bottom",type:"is-danger"})}):this.$toast.open({duration:5e3,message:"Missing password",position:"is-bottom",type:"is-danger"})}})}}});