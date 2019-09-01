<template>
	<div class="load">
        <cSomething>
            <div class="btn">
                <i class="fa fa-file-o"></i>
            </div>
        </cSomething>  
        <h3>{{ BlogName }}</h3>
    </div>
</template>

<script>
import cSomething from '@/components/atoms/utils/a-conteiner-box'
export default {
    name: 'addSomething',
    props: ['BlogName'],
    components:{ cSomething }
}
</script>

<style scoped>
.load{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.load .btn{
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
.load .btn i{
    font-size: 18px;
    font-weight: 800;
}
</style>