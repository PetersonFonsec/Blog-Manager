<template>
    <div class="list-action">
        <ul>
            <li @click="edit"> Editar </li>
            <li @click="drop"> exluir </li>
            <li @click="seeArticles"> ver artigos </li>
            <li @click="giveAcess"> adicionar autores </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'blogAction',
    methods: {
        edit(){
            this.$emit('editBlog')
        },
        drop(){
            this.$emit('removeBlog')
        },
        seeArticles(){
            this.$emit('seerArticles')
        },
        giveAcess(){
            this.$emit('giveAcess')
        },
    }
}
</script>

<style scoped>
.list-action ul {
    padding: 0px;
    list-style: none;
}
.list-action li{
    list-style: none;
    text-decoration: none;
    width: 100%;
    padding: 5px 0px;
    text-align: center;
    cursor: pointer;
}
.list-action li:hover{
    background-color: rgba( 200, 200, 200, .5);
}
</style>