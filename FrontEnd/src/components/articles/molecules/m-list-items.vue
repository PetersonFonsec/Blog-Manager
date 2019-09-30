<template>
  <div class="list-items">

    <div class="container-list-bar" v-if=" type === 'bar' ">
        <template v-for="(article, index) in articles">

            <Bar :key="index"
                :title="article.title"
                :author="article.author.name"
                :data="article.createdAt"
                :description="article.description"
                :imagem="article.photo" />

        </template>
    </div>

    <div class="container-list-card" v-else>
        <template v-for="(article, index) in articles">

            <Card :key="index"
                :title="article.title"
                :author="article.author.name"
                :data="article.createdAt"
                :description="article.description"
                :imagem="article.photo" />

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
    }
}
</script>

<style lang="scss" scoped>
  @import 'm-article';
</style>