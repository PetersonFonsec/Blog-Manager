<template>
  <div class="list-articles">
    <b-card>
      <Filters @filtrate="filters" @toggleView="typeChange"/>
      <ListItems :articles="articles" :type="typeViewList"/>
    </b-card>
  </div>
</template>

<script>
  import Filters from '@/components/articles/molecules/m-list-filters'
  import ListItems from '@/components/articles/molecules/m-list-items'
  export default {
    name: 'ListaArticle',
    components: { Filters, ListItems },
    data(){
      return {
        articles: {},
        typeViewList: 'bar'
      }
    },
    methods:{
      async filters(allFilter){

        const filterTitle = allFilter.title

        const filterBlog = allFilter.blog

        const dateBr = allFilter.date 
          ? allFilter.date.replace(/-/g,'/')
          : false

        const allArticles = await this.loadArticles()

        const articlesFiltred = allArticles.filter( Article => {
        
          let validDate = true

          let validTitle = true

          let validBlog = true

          if( dateBr ) validDate = new Date(Article.createdAt) <= new Date(dateBr)
                  
          if(filterTitle) validTitle = Article.title.includes(filterTitle)

          if(filterBlog) validBlog = Article.blog === filterBlog

          if( validTitle && validDate && validBlog) return true
        })

        this.articles = articlesFiltred
      },
      typeChange(){
        this.typeViewList = this.typeViewList === 'bar' ? 'card' : 'bar'
      },
      ajustFormatData(data){
        return data.split('T')[0].replace(/-/g,'/')
      },
      async loadArticles(){

        const articles = await this.$axios.get('/article')

        const newsArticles = articles.data.result.map(article => {
      
          article.createdAt = this.ajustFormatData(article.createdAt) 
          
          return article
      
        })

        this.articles = newsArticles

        return newsArticles

      },
    },
    mounted(){
      this.loadArticles()
    }
  }
</script>

<style scoped>
.list-articles{
  width: auto;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>