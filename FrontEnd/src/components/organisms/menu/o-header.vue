<template>
    <Header :bg="bg">
        <template v-slot:left>
            <btnToggle bg="#fff"/>
        </template>

        <template v-slot:center>
            <h3 class="title">Pet-Mananger</h3>
        </template>

        <template v-slot:left>
            <btnToggle bg="#fff"/>
        </template>

        <template v-slot:subMenu>
            <ul class="items-menu born">
                <li v-for="( route, key ) in routes" :key="key">
                    <menuItem 
                        :icon="route.icon"
                        :label="route.label"
                        :path="route.path"/>
                <li/>
                <li @click="logout">
                    <i class="fa fa-sign-out" aria-hidden="true"></i> Sair
                </li>
            </ul>
        </template>
    </Header>
</template>

<script>
import '@/css/keyFrames.css'
import menuItem from '@/components/atoms/menu/a-item'
import btnToggle from '@/components/atoms/menu/a-toggle'
import Header from '@/components/atoms/menu/a-header'

export default {
    name: 'O-Header',
    components: { btnToggle, Header, menuItem },
    data(){
        return {
            bg : 'background-image: linear-gradient(to right,#085078,#85D8CE);',
            routes: [
                {
                    icon : 'fa fa-area-chart',
                    label : 'Dashboard',
                    path : '/dashboard',                    
                },
                {
                    icon : 'fa fa-file-o',
                    label : 'Blogs',
                    path : '/blog',                    
                },
                {
                    icon : 'fa fa-user-o',
                    label : 'Perfil',
                    path : '/profile',                    
                },
                {
                    icon : 'fa fa-cogs',
                    label : 'Configurações',
                    path : '/settings',                    
                }
            ]
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

<style scoped>
.title{
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .5)
}
.items-menu {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    padding: 0px;
}
.items-menu li, .items-menu li a {
    padding: 5px 15px;
    border-radius: 5px;
    transition: .2s all linear;
     text-decoration: none;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
    font-size: 18px;    
}
.items-menu li:hover {
    transform: translateY(-5px);
    background-color: rgba(255, 255, 255, .2); 
    text-decoration: none;
}
.born li{
    animation: bornBox .8s;
}

@media only screen and ( max-width:  650px) {
    
    .items-menu {
        flex-direction: column;
        justify-content: center;
        padding:  0 10px;
    }

    .items-menu li {
        text-align: center;
        width: 100%;
        padding: 10px 0;
    }
}
</style>