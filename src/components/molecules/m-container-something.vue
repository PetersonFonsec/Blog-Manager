<template>
	<div class="add-something">
		<div class="btn">
			<span class="plus-icon"></span>
		</div>
	</div>  
</template>

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
.add-something{
    width: 130px;
    height: 130px;
    background-image: radial-gradient( rgba( 96,96,96, 0 ) , rgba( 96,96,96, .1 ) );
    box-shadow: 0 0px 5px #606060;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>