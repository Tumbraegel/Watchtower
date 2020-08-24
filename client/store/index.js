// Main Vuex store
import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth_module';
import { search } from './search_module';
import { film } from './film_module';
import { statistics } from './statistics_module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    search,
    film,
    statistics
  }
});
