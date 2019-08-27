<template>
    <div class="list-action">
        <ul>
            <li @click="edit"> Editar </li>
            <li @click="drop"> exluir </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'blogAction',
    methods: {
        edit(){},
        drop(){}
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
}
.list-action li:hover{
    background-color: rgba( 200, 200, 200, .5);
}
</style>