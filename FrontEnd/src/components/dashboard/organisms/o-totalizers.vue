<template>
  <div class="totalizer-container">

      <blogs :count="blogs"/>
      
      <articles :count="articles"/>

  </div>
</template>

<script>
import blogs from '../molecules/m-totalizer-blogs'
import articles from '../molecules/m-totalizer-articles'

export default {
    name: 'totalizers',
    components: { 
        blogs,
        articles
    },
    data(){
        return {
            blogs: 0,
            articles: 0
        }
    },
    methods:{
        async loadTotalizers(){
            const totalizers = await this.$axios.get('/totalizers')
            
            const { blogs, articles } = totalizers.data.result
            
            this.blogs = blogs

            this.articles = articles
        }
    },
    mounted(){
        this.loadTotalizers()
    }
}
</script>

<style>
.totalizer-container {
    display: flex;
    max-width: 650px;
    width: 100%;
    justify-content: space-around;
    flex-wrap:wrap;
}
</style>