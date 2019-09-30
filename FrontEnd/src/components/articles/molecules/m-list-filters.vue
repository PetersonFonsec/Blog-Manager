<template>
  <div class="mb-3">
    <b-form @submit.prevent="filtrate">
        <b-row>
            <b-col xs='12' sm=6 md=4>
                <b-form-group id="group-title" label="Titulo" label-for="title">

                <b-form-input
                    id="title"
                    v-model="filters.title"
                    placeholder="Titulo do artigo" />

                </b-form-group>          
            </b-col>

            <b-col xs='12' sm=6 md=4>
                <b-form-group id="group-blog" label="blog" label-for="blog">

                <b-form-select
                    id="blog"
                    v-model="filters.blog"
                    :options="blogs"
                    placeholder="Titulo do artigo" />

                </b-form-group>          
            </b-col>

            <b-col xs='12' sm=12 md=4>
                <b-form-group id="group-date" label="Data da Publicação" label-for="date">

                    <b-form-input
                        id="date"
                        type="date"
                        v-model="filters.date"
                        placeholder="dd/mm/aa" />

                </b-form-group>          
            </b-col>
        </b-row>
        
        <b-row class="flooat-right" >

          <b-col xs="12" sm="6" md="3">
            <b-button 
                block 
                variant="primary"
                class="mt-1"
                @click="toggleView"> 
                <i class="fa fa-refresh" aria-hidden="true"></i>
             </b-button>
          </b-col>

          <b-col xs="12" sm="6" md="3">
            <b-button block variant="success" class="mt-1" type="submit"> Filtrar </b-button>
          </b-col>

        </b-row>
      </b-form>
  </div>
</template>

<script>
export default {
    name: 'FilterArticles',
    data(){
        return {
            filters: {},
            blogs: {}
        }
    },
    methods:{
        filtrate(){
            this.$emit('filtrate', this.filters)
        },
        toggleView(){
            this.$emit('toggleView')
        },
        async loadBlogs(){

            const blogs = await this.$axios.get('/blog/user/')

            const format2Select = result => ({ text: result.name, value: result._id})

            this.blogs = blogs.data.result.map( format2Select )
        }
    },
    mounted(){
        this.loadBlogs()
    }
}
</script>

<style scoped>
.flooat-right{
    justify-content: flex-end;
}
</style>