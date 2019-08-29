import Vue from 'vue'
import Vuex from 'vuex'

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
    login(state){
      state.userLogged = true
    },
    logout(state){
      state.userLogged = false
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
