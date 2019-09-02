<template>
  <div class="list-items">

    <div class="container-list-bar" v-if=" type === 'bar' ">
        <template v-for="(article, index) in articles">

            <Bar :key="index"
                :title="article.title"
                :author="article.author"
                :data="article.data"
                :description="article.description"
                :imagem="article.imagem" />

        </template>
    </div>

    <div class="container-list-card" v-else>
        <template v-for="(article, index) in articles">

            <Card :key="index"
                :title="article.title"
                :author="article.author"
                :data="article.data"
                :description="article.description"
                :imagem="article.imagem" />

        </template>
    </div>
  </div>
</template>

<script>
import Bar from '@/components/molecules/articles/m-item-bar'
import Card from '@/components/molecules/articles/m-item-card'
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
    }
}
</script>

<style scoped>
.container-list-card{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}
</style>