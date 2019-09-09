<template>
    <div class="container-profile">
        <profile-user @reload="reload" :email="email" :name="nameUser" :blogs="blogs"/>
    </div>
</template>

<script>
import profileUser from "@/components/molecules/profile/m-data-user"
import MenuProfile from '@/components/molecules/profile/m-menu'
import Security from "@/components/molecules/profile/m-security-user"

export default {
    name: 'ProfileScreen',
    components: { MenuProfile, profileUser, Security },
    methods:{
        async loadUser(){

            const res = await this.$axios('/userLogged')

            const user = res.data.result

            this.email = user.email

            this.nameUser = user.name

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