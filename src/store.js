import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: ''
  },
  getters: {
    layout: state => { return state.layout || 'default' }
  },
  mutations: {
    setLayout (state, str) { state.layout = str }
  },
  actions: {
    changeLayout ({ dispatch, commit, state }, name) { commit('setLayout', name) }
  },
  modules: {
  }
})
