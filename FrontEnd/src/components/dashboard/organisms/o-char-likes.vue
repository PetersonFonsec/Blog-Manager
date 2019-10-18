<template>
  <div class="container-chart">

    <b-card>
        <canvas id="CharLikeArticle"></canvas>
    </b-card>

  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
    name: 'likesArthicles',
    methods:{
        async loadingChart(){
            const response = await this.$axios.get('/likesAndArticles')

            const result = response.data.likesAndArticles

            const labels = result.map(blog => blog.title)

            const data = result.map(blog => blog.likes)

            const canvas = document.getElementById('CharLikeArticle').getContext('2d')

            new Chart( canvas, {
                type: 'bar',
                data:{ 
                    labels, 
                    datasets:[{
                        data,
                        label: 'likes',
                        backgroundColor: "rgba( 151, 187, 205, 0.8)",
                        borderColor: "rgba( 151, 187, 205, 1)",
                    }]
                }
            });
        }
    },
    mounted(){
        this.loadingChart()
    }
}
</script>

<style lang="scss" scoped>
    @import 'stats';
</style>