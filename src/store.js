import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuOpen: false
  },
  mutations: {
    toggleMenu(state, value){
      value === undefined 
        ? state.isMenuOpen = !state.isMenuOpen
        : state.isMenuOpen = value   
    }
  },
  actions: {

  }
})
