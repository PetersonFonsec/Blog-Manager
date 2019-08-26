<template>
    <ul class="list-action">
        <li @click="edit"> Editar </li>
        <li @click="drop"> exluir </li>
    </ul>
</template>

<script>
export default {
    name: 'blogAction',
    methods:{
        edit(){},
        drop(){}
    }
}
</script>

<style scoped>
.list-action {
    padding: 0px;
}
.list-action li{
    text-decoration: none;
    width: 100%;
    padding: 5px 0px;
    text-align: center;
}
.list-action li:hover{
    background-color: rgba( 200, 200, 200, .5);
}
</style>