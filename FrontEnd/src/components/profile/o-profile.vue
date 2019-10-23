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
import User from '@/controller/user'
import Blog from '@/controller/blog'
import Alert from '@/mixins/alert'

export default {
    name: 'ProfileScreen',
    components: { profileUser },
    mixins: [ Alert ],
    methods:{
        async loadUser(){  

            const res = await User.getUserLogged()

            if(!res.success) return this.alertError(res.msg)

            const user = res.data.result

            this.email = user.email

            this.nameUser = user.name

            this.avatarUser = user.avatar

        },
        async loadBlog(){

            const res = await Blog.loadUserBlogs()

            if(!res.success) return this.alertError(res.msg)

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
        this.reload()
    }
}
</script>

<style scoped>
.container-profile {
    margin: 10px auto;
    width: 80%;
}
</style>