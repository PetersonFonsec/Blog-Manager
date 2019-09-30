<template>
    <list :authores="authores"/>
</template>

<script>
import list from '@/components/blogs/molecules/m-list-authores'
export default {
    components: { list },
    data(){
        return {
            authores: []
        }
    },
    methods:{
        async loadAuthores(){

            const allAuthores = await this.$axios('/user')

            this.authores = allAuthores.data.result

        }
    },
    mounted(){
        this.loadAuthores()
    }
}
</script>