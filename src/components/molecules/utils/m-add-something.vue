<template>
	<cSomething>
		<div class="btn">
			<plusIcon/>
		</div>
	</cSomething>  
</template>

<script>
import plusIcon from '../atoms/utils/a-pluss-icon'
import cSomething from '../atoms/utils/a-conteiner-box'
export default {
    name: 'addSomething',
    components:{ plusIcon, cSomething }
}
</script>

<style scoped>
.btn{
    width: 50px;
    height: 50px;
    background-image: radial-gradient( #fbcc9b, #ff8404 );
    background-color: #606060;
    border-radius: 50%;
    position: relative;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>