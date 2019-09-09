<template>
    <div class="container-data-user">
        <b-card>
            <div class="container-user-data">
                <h3>Sobre você</h3>

                <div class="changeField">
                    <editField label="nome" :value="name" @editedField="changeName"/>
                </div>

                <div class="changeField">
                    <editField label="email" :value="email" @editedField="changeEmail"/>
                </div>
            </div>

            <div class="container-blogs">

                <h3>Seus BLogs</h3>

                <ul>
                    <template v-for="(blog,i) in blogs" >
                        <li :key="i"> 
                            <span class="name-blog">
                                {{ blog.name }} 
                            </span>

                            <b-button variant="danger" @click="dropBlog(blog._id)"> 
                                <i class="fa fa-trash"></i>
                            </b-button>
                        </li>
                    </template>
                </ul>
            </div>
        </b-card>
    </div>
</template>

<script>
import editField from '@/components/atoms/utils/a-edit-field'
export default {
    name: 'DataUser',
    components: { editField },
    props:{
        name:{
            type: String,
            required: true
        },
        blogs: {
            type: Array,
            required: true
        },
        email:{
            type: String,
            required: true
        }
    },
    data(){
        return{
            editName: false,
            editEmail: false,
            newName: '',
        }
    },
    methods:{
        async changeName(newName){
            
            const result = await this.$axios.put('/userLogged', { name: newName })

            if(result.status === 200){
                this.editName = false
                this.$emit('reload')
            } 
        },
        async changeEmail(newEmail){
            
            const result = await this.$axios.put('/userLogged', { email: newEmail })

            if(result.status === 200){
                this.editName = false
                this.$emit('reload')
            }
        },
        async dropBlog(id){
            const result = await this.$axios.delete(`/blog/${id}`)

            if(result.status === 200) {
                
                this.$bvToast.toast('Blog escluido com sucesso', {
                    title: 'Sucesso',
                    variant: 'success',
                    solid: true
                })

                this.$emit('reload')
            }
        }
    }
}
</script>

<style scoped>
.container-blogs {
    width: 400px;
}
.container-blogs h3{
    margin: 5px auto;
}
.container-blogs ul {
    padding: 0px;
}
.container-blogs li{
    list-style: none;
    margin: 10px 0;
    transition: .2s linear all;
}
.changeField {
    margin: 10px 0;
    width: 300px;
}
.container-blogs li:hover{
    transform: translateY(-5px)
}
.name-blog {
    display: inline-block;
    width: 80%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    padding: 5px;
    margin-right: 10px;
}
.container-user-data{
    width: 50%;
}
</style>