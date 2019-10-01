<template>
    <b-form @submit.prevent="createBlog">
        <b-row>
            <b-col md="8">
                <b-form-input 
                    trim
                    id="blog-name"
                    v-model="blog.name"
                    placeholder="Nome do Blog"/>
            </b-col>
            
            <b-col md="2">

                <b-button 
                    type='submit'
                    variant="primary">Criar</b-button>

            </b-col>
        </b-row>
    </b-form>
</template>

<script>
export default {
    name: 'addBlog',
    data(){
        return{
            blog: {}
        }
    },
    methods:{
        createBlog(){
            this.$emit('createBlog', this.blog)
        }
    }
}
</script>

<style>
.container form{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>