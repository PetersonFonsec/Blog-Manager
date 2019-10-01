<template>

	<div class="add-something hide" rel="add-something">
    
        <slot></slot>
	
    </div>  

</template>

<script>
export default {
    name: 'cSomething',
}
</script>

<style scoped>
.add-something{
    width: 130px;
    height: 130px;
    background-image: radial-gradient( rgba( 96,96,96, 0 ) , rgba( 96,96,96, .1 ) );
    box-shadow: 0 0px 5px #606060;
    border-radius: 20px;
    margin: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: .2s linear all;
}
.add-something:hover{
    transform: scale(1.1);
}
.hide{
    animation: bornBox .5s;
}
</style>