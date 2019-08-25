<template>
    <header>
        <div class="header">
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
    </header>
</template>

<script>
export default {
    name: 'M-Header'
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 45px;
    transition: linear all .3s;
    background-color: rgba( 0,0,0, 0.6 );
    display: flex;
    align-items: center;
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
</style>