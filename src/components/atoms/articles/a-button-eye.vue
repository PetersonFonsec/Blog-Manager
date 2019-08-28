<template>
   <div class="showEye">
        <i v-if="show" class="fa fa-eye-slash"  aria-hidden="true"></i>
        <i v-else class="fa fa-eye"  aria-hidden="true"></i>
    </div>
</template>

<script>
export default {
    name: 'buttonEye',
    props: {
        show: {
            type: Boolean,
            required: true,
        }
    },
}
</script>

<style>
.showEye {        
    background-color:#007bff;
    width: 50px;
    text-align: center;
    border-radius: 50%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.showEye i {
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
}
</style>