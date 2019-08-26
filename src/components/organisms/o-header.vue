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
            bg : 'background-image: linear-gradient(to right,#085078,#85D8CE);',
        }
    }
}
</script>

<style scoped>
.title{
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .5)
}
</style>