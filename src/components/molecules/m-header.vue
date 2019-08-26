<template>
    <header>
        <div class="header shadow born" :style="bg" >
            <span class="left">
                <slot name="left"></slot>
            </span>

            <span class="center">
                <slot name="center"></slot>
            </span>

            <span class="right">
                <slot name="right"></slot>
            </span>
        </div>

        <template v-if="isMenuOpen">
            <div class="sub-menu" :class="{'close': !isMenuOpen }" :style="bg" >
                <slot name="subMenu"></slot>            
            </div>
        </template>

    </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'M-Header',
    props: ['bg'],
    computed: {
        style(){
            return `background-color: ${this.bg}`
        },
        ...mapState(['isMenuOpen'])
    },
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    padding: 0 10px 0 10px;
    box-shadow: 0px 2px 1px rgba(0, 0, 0, 1);    
}
.left{
    justify-self: flex-end;
}
.center{
    justify-self: center;
    text-align: center;
    flex: 1;
}
.right{
    justify-self: flex-start;
}
.sub-menu{
    width: 100%;
    min-height: 60px;
    background-color: rgba( 0,0,0, 0.6 );
    transition: linear all .3s;
}
.sub-menu.close {
    height: 0px;
}
@keyframes born {
    0%{
        transform: translateY( -45px );
    }
    100%{
        transform: translateY( 0px );
    }
}
.born{
    animation: born .3s linear;
}
</style>