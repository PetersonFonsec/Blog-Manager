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
    </Header>
</template>

<script>
import btnToggle from '../molecules/m-button-toggle'
import Header from '../molecules/m-header'
export default {
    name: 'O-Header',
    components: { btnToggle, Header },
    data(){
        return{
            bg : 'background-image: linear-gradient(to left,#283048,#859398);',
        }
    }
}
</script>

<style scoped>
.title{
    color: #fff;
}
</style>