<template>
  <div class="menu-item">
      <router-link :to='path'>
          <div class="container-item">
              <i :class="icon" aria-hidden="true"></i>
              
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
.menu-item a{
    text-decoration: none;
    color: #fff;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
    font-size: 18px;    
}
.menu-item a:hover {
    text-decoration: none;
    
}
</style>