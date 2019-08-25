<template>
    <Header>
        <template v-slot:left>
            <btnToggle bg="#fff"/>
        </template>

        <template v-slot:center>
            <h1 class="title">Pet-Mananger</h1>
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
    components: { btnToggle, Header }
}
</script>

<style scoped>
.title{
    color: #fff;
}
</style>