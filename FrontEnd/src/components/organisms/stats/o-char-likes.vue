<template>
  <div class="container-chart-likes">
     <b-card>
        <canvas id="CharLikeArticle"></canvas>
    </b-card>
  </div>
</template>

<script>
export default {
    name: 'likesArthicles',
    methods:{
        async loadingChart(){
            const response = await this.$axios.get('/likesAndArticles')

            const result = response.data.likesAndArticles

            const labels = result.map(blog => blog.title)

            const data = result.map(blog => blog.likes)

            const canvas = document.getElementById('CharLikeArticle').getContext('2d')

            // eslint-disable-next-line
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

<style scoped>
.container-chart-likes{
    animation: bornHeder linear .4s;
    width: 100%;
    max-width: 550px;
    height: 300px;
    margin-bottom: 10px;
}
</style>