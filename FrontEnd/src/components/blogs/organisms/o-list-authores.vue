<template>
    <list :authores="authores"/>
</template>

<script>
import list from '@/components/blogs/molecules/m-list-authores'
import User from '@/controller/user'

export default {
    components: { list },
    data(){
        return {
            authores: []
        }
    },
    methods:{
        async loadAuthores(){

            const allAuthores = await User.listAll()

            this.authores = allAuthores.data.result

        }
    },
    mounted(){
        this.loadAuthores()
    }
}
</script>