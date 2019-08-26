import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuOpen: false,
    userLogged: true
  },
  mutations: {
    toggleMenu(state, value){
      value === undefined 
        ? state.isMenuOpen = !state.isMenuOpen
        : state.isMenuOpen = value   
    },
    login(state){
      state.userLogged = true
    },
    logout(state){
      state.userLogged = false
    }
  },
  actions: {

  }
})
