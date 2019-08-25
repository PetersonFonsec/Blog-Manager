<template>
	<div 
        class="btn-toggle"
        :class="{'close': isOpen}"
         @click="isOpen = !isOpen">
		<span :style="style" class="pipe"></span>
		<span :style="style" class="pipe"></span>
		<span :style="style" class="pipe"></span>
	</div>  
</template>

<script>
export default {
    name:'btnToggle',
    props: ['bg'],
    computed:{
        style(){
            return `background-color: ${this.bg};`
        }
    },    
    data(){
        return {
            isOpen: false
        }
    }
}
</script>

<style scoped>
.pipe {
    height: 3px;
    width: 100%;
    background-color: #000;
    display: block;
    margin: 3px 0px;
    border-radius: 5px;
    transition: .2s linear all;
}
.btn-toggle {
    height: 30px;
    padding: 3px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: .2s linear all;
    cursor: pointer;
}
.close .pipe:nth-child(2){
    opacity: 0;
}
.close .pipe:nth-child(1){
    transform: translateY(8px) rotate(45deg);
}
.close .pipe:nth-child(3){
    transform: translateY(-10px) rotate(-45deg);
}
</style>