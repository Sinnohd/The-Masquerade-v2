import Vue from 'vue';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import moment from 'moment';
import VuetifyConfirm from 'vuetify-confirm';
import TextHighlight from 'vue-text-highlight';
import { clans, generations, disciplines } from './config/enum';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueSessionStorage from 'vue-sessionstorage';
import RestService from './services/rest/rest-services';
import 'vuetify/dist/vuetify.min.css'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(CKEditor);
Vue.use(VueSessionStorage);
Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Accept',
  buttonFalseText: 'Discard',
  color: 'primary',
  icon: 'warning',
  title: 'Warning',
  width: 350,
  property: '$confirm',
  vuetify
});
Vue.component('text-highlight', TextHighlight);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBGBiV3riVMUmKxciE43wLvYyW10U2bs7w',
    libraries: 'places,drawing,visualization', // This is required if you use the Autocomplete plugin
    language: 'en'
  },
  installComponents: true
})

Vue.config.productionTip = false;
Vue.prototype.moment = moment;

// if (process.env.VUE_APP_API === "graphql") {

// }
// else {
Vue.prototype.Service = RestService;
// }

new Vue({
  vuetify,
  router,
  data() {
    return {
      clans: clans,
      generations: generations,
      disciplines: disciplines
    };
  },
  render: h => h(App)
}).$mount('#app');

// enable it to debug webview

// if (typeof console  != "undefined") 
//     if (typeof console.log != 'undefined')
//         console.olog = console.log;
//     else
//         console.olog = function() {};

// console.log = function(message) {
//     console.olog(message);
//     alert(message);
// };
// console.error = console.debug = console.info =  console.log
