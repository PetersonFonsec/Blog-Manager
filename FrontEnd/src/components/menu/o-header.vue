<template>
    <Header :bg="bg">

        <template #left>
            
            <btnToggle bg="#fff"/>

        </template>

        <template #center>

            <h3 class="title">Pet-Mananger</h3>

        </template>

        <template #subMenu>

            <ul class="items-menu born">

                <li>

                    <menu-item 
                        icon="fa fa-area-chart"
                        label="Dashboard"
                        path="/dashboard"/>

                <li/>

                <li>
                   
                   <menu-item
                        icon="fa fa-folder"
                        label="Blogs"
                        path="/blog"/>

                <li/>

                <li>

                   <menu-item  
                        icon="fa fa-file"
                        label="Artigos"
                        path="/listArticles"/>

                <li/>

                <li>

                   <menu-item
                        icon="fa fa-user-o"
                        label="Perfil"
                        path="/profile"/>

                <li/>

                <li @click="logout">
                    
                    <i class="fa fa-sign-out" aria-hidden="true"></i> 
                    
                    Sair

                </li>
            </ul>
        </template>

    </Header>
</template>

<script>
import menuItem from '@/components/menu/atoms/a-item'
import btnToggle from '@/components/menu/atoms/a-toggle'
import Header from '@/components/menu/atoms/a-header'

export default {
    name: 'O-Header',
    components: { btnToggle, Header, menuItem },
    data(){
        return {
            bg : 'background-image: linear-gradient(to right,#085078,#85D8CE);',
        }
    },
    methods:{
        logout(){
            this.$store.commit('logout')
            this.$router.push({ path: '/auth' })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import 'menu';
</style>