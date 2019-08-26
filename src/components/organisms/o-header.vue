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
                        :path="route.path"
                        :alt="route.alt"/>
                <li/>
            </ul>
        </template>
    </Header>
</template>

<script>
import menuItem from '../atoms/a-menu-item'
import btnToggle from '../molecules/m-button-toggle'
import Header from '../molecules/m-header'
export default {
    name: 'O-Header',
    components: { btnToggle, Header, menuItem },
    data(){
        return{
            bg : 'background-image: linear-gradient(to right,#085078,#85D8CE);',
            routes: [
                {
                    icon : 'fa fa-area-chart',
                    label : 'Dashboard',
                    path : '/dashboard',
                    alt :  'icone dashboard'
                },
                {
                    icon : 'fa fa-file-o',
                    label : 'Blogs',
                    path : '/blog',
                    alt :  'icone blog'
                },
                {
                    icon : 'fa fa-user-o',
                    label : 'Perfil',
                    path : '/profile',
                    alt :  'icone perfil'
                },
                {
                    icon : 'fa fa-cogs',
                    label : 'Configurações',
                    path : '/settings',
                    alt :  'icone Configurações'
                },
                {
                    icon : 'fa fa-sign-out',
                    label : 'Sair',
                    path : '/logout',
                    alt :  'icone logout'
                }
            ]
        }
    }
}
</script>

<style scoped>
.title{
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .5)
}
.items-menu{
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    padding: 0px;
}
.items-menu li {
    padding: 5px 15px;
    border-radius: 5px;
    transition: .2s all linear;
}
.items-menu li:hover {
    transform: translateY(-5px);
    background-color: rgba(255, 255, 255, .2); 
}
@keyframes born {
    0%{
        transform: scale(0);
    }
    50%{
        transform: scale(1.1);
    }
    100%{
        transform: scale(1);
    }
}
.born li{
    animation: born .8s;
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