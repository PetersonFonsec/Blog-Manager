<template>
  <div class="container-chart-authors">
      <char 
        :labels="labels"
        :datasets="datasets"
        type="bar"
        id="CharAuthorEachBlog"/>
  </div>
</template>

<script>
import char from '@/components/atoms/utils/a-chart'
export default {
    name: 'AuthorEachBlog',
    components: { char },
    methods:{
        async loadingChart(){
            const response = await this.$axios.get('/authorsEachBlog')

            const result = response.data.authorsAndBlogs

            const labels = result.map(blog => blog.name)

            const data = result.map(blog => blog.authors)

            this.datasets = [{
                data,
                label: 'Autores por Blog',
                backgroundColor: "rgba( 151, 187, 205, 0.8)",
            }]

            this.labels = labels

            console.log(this.datasets)
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
.container-chart-authors{
    width: 100%;
    max-width: 600px;
    height: 300px;
    margin: 0 20px 20px 10px;
}
</style>