<template>
  <div class="filter-articles">
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
        
            <b-col xs='12' sm=2>          
                <b-form-group id="group-date" label="Data da Publicação" label-for="date">

                    <b-form-input
                        id="date"
                        type="date"
                        v-model="filters.date"
                        placeholder="dd/mm/aa" />

                </b-form-group>          
            </b-col>

          <b-col sm="2" class="center">
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
            blogs: {},
            filters: {}
        }
    },
    methods:{
        filtrate(){
            this.$emit('filtrate', this.filters)
        }
    }
}
</script>

<style scoped>
.center {
    justify-content: center;
    display: flex;
    align-items: center;
}
</style>