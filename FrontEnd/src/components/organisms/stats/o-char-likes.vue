<template>
  <div class="container-chart-likes">
      <char 
        :labels="labels"
        :datasets="datasets"
        type="bar"
        id="CharLikeArticle"/>
  </div>
</template>

<script>
import char from '@/components/atoms/utils/a-chart'
export default {
    name: 'likesArthicles',
    components: { char },
    methods:{
        async loadingChart(){
            const response = await this.$axios.get('/likesAndArticles')

            const result = response.data.likesAndArticles

            const labels = result.map(blog => blog.title)

            const data = result.map(blog => blog.likes)

            this.datasets = [{
                data,
                label: 'Likes por Artigos',
                backgroundColor: "rgba( 151, 187, 205, .8)",
            }]

            this.labels = labels

        }
    },
    data(){
        return {
            labels: [],
            datasets: [],
        }
    },
    mounted(){
        this.loadingChart()
    }
}
</script>

<style scoped>
.container-chart-likes{
    width: 500px;
    height: 300px;
}
</style>