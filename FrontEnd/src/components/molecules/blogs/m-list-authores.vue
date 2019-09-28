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
                @click="send">Liberar acesso</b-button>
            
            <b-button variant="danger">Cancelar</b-button>
        </b-card>
  </div>
</template>

<script>
import author from '@/components/atoms/blogs/a-item-author'
export default {
    components:{
        author
    },
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

            const route = `/blog/${this.$route.params.id}`

            const authors = this.selected

            if(!isValid) return

            await this.$axios.post(route, { authors })

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

<style scoped>
.container-list-authores{
    padding : 0px 40px
}
.list-authores {
    padding: 0px;
    list-style: none;
}
.item-list{
    transition: linear all .2s;
}
.selected{
    transform: translateX(10px);
    border-radius: 5px;
    background: #8c898936;
}
@media only screen and ( max-width:  650px) {
    .list-authores {
        padding : 0px;
    }
}
</style>