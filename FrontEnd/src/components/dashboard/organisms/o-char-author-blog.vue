<template>
  <div class="container-chart">

    <b-card>        
        <canvas id="CharAuthorEachBlog"></canvas>
    </b-card>

  </div>
</template>

<script>
import Chart from 'chart.js'
export default {
    name: 'AuthorEachBlog',
    methods:{
        async loadingChart(){
            const response = await this.$axios.get('/authorsEachBlog')

            const result = response.data.authorsAndBlogs

            const labels = result.map(blog => blog.name)

            const data = result.map(blog => blog.authors)
            
            new Chart( document.getElementById('CharAuthorEachBlog').getContext('2d'), {
                type: 'bar',
                data:{ 
                    labels, 
                    datasets:[
                        {
                            data,
                            label: 'Autores por blogs',
                            backgroundColor: "rgba( 151, 187, 205, 0.8)",
                            borderColor: "rgba( 151, 187, 205, 1)",
                        }
                    ]
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