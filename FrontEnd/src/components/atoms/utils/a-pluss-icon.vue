<template>  
    <span class="plus-icon"></span>
</template>

<script>
export default {
    name: 'plus-icon'
}
</script>

<style scoped>
.plus-icon:before{
	content: '';
    width: 20px;
    height: 5px;
    background-color: #000;
    position: absolute;
    border-radius: 10px;
    top: 22px;
    left: 15px;
    transform: rotate(90deg);
}
.plus-icon:after{
	content: '';
    width: 20px;
    height: 5px;
    background-color: #000;
    position: absolute;
    border-radius: 10px;
    top: 22px;
    left: 15px;
}
</style>