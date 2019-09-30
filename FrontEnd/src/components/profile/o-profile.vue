<template>
    <div class="container-profile">
        <profile-user 
            @reload="reload"
            :email="email"
            :name="nameUser"
            :blogs="blogs"
            :avatar="avatarUser"/>
    </div>
</template>

<script>
import profileUser from "@/components/profile/molecules/m-data-user"

export default {
    name: 'ProfileScreen',
    components: { profileUser },
    methods:{
        async loadUser(){

            const res = await this.$axios('/userLogged')

            const user = res.data.result

            this.email = user.email

            this.nameUser = user.name

            this.avatarUser = user.avatar

        },
        async loadBlog(){

            const res = await this.$axios('/blog/user/')

            this.blogs = res.data.result

        },
        reload(){
            this.loadUser()
            this.loadBlog()   
        }
    },
    data(){
        return {
            email: '',
            nameUser: '',
            avatarUser: '',            
            show: 'profile',
            blogs: []
        }
    },
    mounted(){
        this.loadUser()
        this.loadBlog()
    }
}
</script>

<style scoped>
.container-profile {
    margin: 10px auto;
    width: 80%;
}
</style>