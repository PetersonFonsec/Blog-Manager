<template>
	<div 
        v-if="userLogged"
        class="btn-toggle"
        :class="{'close': isMenuOpen }"
         @click="toggle">
		<span :style="style" class="pipe"></span>
		<span :style="style" class="pipe"></span>
		<span :style="style" class="pipe"></span>
	</div>  
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'btnToggle',
    props: ['bg'],
    computed: {
        style(){
            return `background-color: ${this.bg};`
        },
        ...mapState(['isMenuOpen', 'userLogged'])
    },
    methods:{
        toggle(){
            this.$store.commit('toggleMenu')
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
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 1);
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