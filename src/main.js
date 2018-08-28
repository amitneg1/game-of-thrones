// Import IIIrd party dependencies
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './global-style.css'
import router from './router'
import axios from 'axios';

// Configurations for above imported packages
axios.defaults.baseURL = 'https://www.anapioficeandfire.com/api';
Vue.config.productionTip = false
Vue.use(BootstrapVue);

const pluralizeUtil = function(count, itemName) {
    if(count && count !== 1)
        return count + ' ' + itemName + 's';
    else
        return '1 ' + itemName;
}

Vue.filter('pluralize', pluralizeUtil);

// Import custom child components
import App from './App.vue'

import store from './store'

// Instantiate a new Vue instance
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
