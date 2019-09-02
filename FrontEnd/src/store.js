import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { userKey } from '@/global'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuOpen: false,
    userLogged: false,
    ArticlePreview: {
      title: 'title default',
      description: 'description default',
      imagem: '@/assets/default-post.png',
      author: 'Pet',
      data: new Date().toLocaleDateString()
    }
  },
  mutations: {
    toggleMenu(state, value){
      value === undefined 
        ? state.isMenuOpen = !state.isMenuOpen
        : state.isMenuOpen = value   
    },
    login(state, token){
      state.userLogged = true

      const tokenFormated = `Bearer ${token}`

      axios.defaults.headers.common['authorization'] = tokenFormated

      localStorage.setItem(userKey, token)
    },
    logout(state){
      state.userLogged = false

      state.isMenuOpen = false

      delete axios.defaults.headers.common['authorization']

      localStorage.removeItem(userKey)
    },
    updatePreview(state, article){
      const preview = state.ArticlePreview

      for( let prop in article ){
        if( article[prop] !== undefined ) preview[prop] = article[prop]
        console.log(state.ArticlePreview[prop])
      }

      state.ArticlePreview = { ...preview }
    }    
  },
  actions: {

  }
})
