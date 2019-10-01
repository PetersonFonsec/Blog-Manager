<template>
    <router-link :to='path'>

        <i :class="icon" aria-hidden="true"></i> 
        
        {{ label }}

    </router-link>
</template>

<script>
export default {
    name: 'menuItem',
    props:{
        icon:{
            type:String,
            required: true
        },
        label:{
            type:String,
            required: true
        },
        path:{
            type:String,
            required: true
        }
    }
}
</script>
