<template>
	<div class="btn-toggle">
		<span class="pipe"></span>
		<span class="pipe"></span>
		<span class="pipe"></span>
	</div>  
</template>

<style scoped>
.pipe {
    height: 10px;
    width: 100%;
    background-color: #000;
    display: block;
    margin: 3px 0px;
    border-radius: 5px;
    transition: .5s linear all;
}
.btn-toggle {
    height: 30px;
    padding: 3px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: .5s linear all;
}
.btn-toggle:hover .pipe:nth-child(2){
    opacity: 0;
    cursor: pointer;
}
.btn-toggle:active .pipe:nth-child(1){
    transform: translateY(10px) rotate(45deg);
}
.btn-toggle:active .pipe:nth-child(3){
    transform: translateY(-10px) rotate(-45deg);
}
</style>