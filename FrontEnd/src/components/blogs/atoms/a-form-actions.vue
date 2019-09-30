<template>
    <div class="list-action">
        <ul>
            <li @click="addArticles"> adicionar artigos </li>
            <li @click="giveAcess"> adicionar autores </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'blogAction',
    methods: {
        giveAcess(){
            this.$emit('giveAcess')
        },
        addArticles(){
            this.$emit('addArticles')
        }
    }
}
</script>

<style lang="scss" scoped>
    @import 'a-blog';
</style>