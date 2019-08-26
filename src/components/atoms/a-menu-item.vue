<template>
  <div class="menu-item">
      <router-link :to='path' tag="li">
          <div class="conteiner-item">
              <img :src="icon" :alt="alt"/>
              
              {{ label }}
          </div>
      </router-link>
  </div>
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
        },
        alt:{
            type:String,
            required: true
        }
    }
}
</script>

<style>
.conteiner-item{
    display: flex;
    align-items: center;
}
</style>