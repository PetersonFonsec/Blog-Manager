<template>
  <div class="list-articles">
    <b-card>
      <Filters @filtrate="filters"/>
      <!-- <List :filters="filters"> -->
    </b-card>
  </div>
</template>

<script>
  import Filters from '@/components/molecules/articles/m-list-filters'

  export default {
    name: 'ListaArticle',
    components: { Filters },
    methods:{
      filters(){}
    },
    data(){
      return {
        articles: {}
      }
    }
  }
</script>

<style scoped></style>