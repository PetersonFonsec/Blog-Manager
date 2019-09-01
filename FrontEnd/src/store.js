import Vue from 'vue'
import Vuex from 'vuex'
import { userKey } from '@/global'
import axios from 'axios'

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

      axios.defaults.headers.common['authorization'] = `Bearer ${token}`

      localStorage.setItem(userKey, `Bearer ${token}`)
    },
    logout(state){
      state.userLogged = false

      state.isMenuOpen = false,

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
