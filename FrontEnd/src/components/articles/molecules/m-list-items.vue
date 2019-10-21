<template>
  <div class="list-items">

    <div class="container-list-bar" v-if=" type === 'bar' ">
        <template v-for="(article, index) in articles">
            
            <span @click="updateArticle(article._id)" :key="index">

                <Bar :title="article.title"
                     :author="article.author.name"
                     :data="article.createdAt"
                     :description="article.description"
                     :imagem="article.photo" />

            </span>

        </template>
    </div>

    <div class="container-list-card" v-else>
        <template v-for="(article, index) in articles">

            <span @click="updateArticle(article._id)" :key="index">
                
                <Card :title="article.title"
                    :author="article.author.name"
                    :data="article.createdAt"
                    :description="article.description"
                    :imagem="article.photo" />

            </span>

        </template>
    </div>

  </div>
</template>

<script>
import Bar from '@/components/articles/molecules/m-item-bar'
import Card from '@/components/articles/molecules/m-item-card'
export default {
    name: 'ListItems',
    components: { Bar, Card },
    props: {
        articles: {
            required: true
        },
        type:{
            type: String,
            required: true
        },
    },
    methods:{
        updateArticle(id){
            this.$router.push( { path: 'UpdateArticles', query: { id } } )
        }
    }
}
</script>

<style lang="scss" scoped>
  @import 'm-article';
</style>