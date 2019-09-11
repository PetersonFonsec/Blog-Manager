<template>
  <div class="list-articles">
    <b-card>
      <Filters @filtrate="filters" @toggleView="typeChange"/>
      <ListItems :articles="articles" :type="typeViewList"/>
    </b-card>
  </div>
</template>

<script>
  import Filters from '@/components/molecules/articles/m-list-filters'
  import ListItems from '@/components/molecules/articles/m-list-items'
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
      filters(){
        this.articles
      },
      typeChange(){
        this.typeViewList = this.typeViewList === 'bar' ? 'card' : 'bar'
      },
      ajustFormatData(data){
        return data.split('T')[0].replace(/\-/g,'/')
      },
      async loadArticles(){

        const articles = await this.$axios.get('/article')

        this.articles = articles.data.result.map(article => {
      
          article.createdAt = this.ajustFormatData(article.createdAt) 
          
          return article
      
        })

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