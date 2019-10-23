<template>
  <div class="container-list-authores">

        <ul class="list-authores">
            <li class="item-list m-1" 
                v-for="(author, index) in authores" :key="index"
                :class="{ 'selected' : selected.includes(author._id)}"
                @click="appendAuthor(author._id)">
                
                <author :author="author"/>

            </li>
        </ul>
      
        <b-card>
            <b-button 
                variant="success"
                class="mr-3"
                @click="send">
                
                Liberar acesso
            
            </b-button>
            
            <b-button variant="danger">
            
                Cancelar
            
            </b-button>
        </b-card>
  </div>
</template>

<script>
import author from '@/components/blogs/atoms/a-item-author'
import Blog from '@/controller/blog'

export default {
    components:{ author },
    props:{
        authores: {
            type: Array,
            required: true
        }
    },
    methods:{
        appendAuthor(id){
            this.selected.includes(id)
                ? this.selected = this.selected.filter( _id => _id !== id)
                : this.selected.push(id)
        },
        async send(){
            const isValid = this.selected[0]

            if(!isValid) return null

            const res = await Blog.giveAcess(this.$route.params.id, this.selected)

            if(!res.success) return this.alertError(res.msg)

            this.$route.push('/blog')
        }
    },
    data(){
        return {
            selected: []
        }
    }
}
</script>

<style lang="scss" scoped>
  @import 'm-blogs';
</style>