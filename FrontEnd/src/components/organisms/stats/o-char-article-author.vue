<template>
  <div class="container-chart-article-authors">
    <b-card>
        <canvas id="CharArticleForAuthor"></canvas>
    </b-card>
  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
    name: 'ArticleForAuthor',
    methods:{
        async loadingChart(){
            const res = await this.$axios.get('/articlesEachAuthor')
                
            const result = res.data.result

            const labels = result.map(blog => blog.name)

            const data = result.map(blog => blog.amountArticles)

            new Chart( document.getElementById('CharArticleForAuthor').getContext('2d'), {
                type: 'horizontalBar',
                data:{ 
                    labels, 
                    datasets:[{
                        data,
                        label: 'Artigos por Autores',
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

<style scoped>
.container-chart-article-authors{
    animation: bornHeder linear .4s;
    width: 100%;
    max-width: 550px;
    height: 300px;
    margin: 10px;
}
</style>