<template>
  <div class="container-menu">

    <div @click="toggleContainer('profile')" class="item-menu">Perfil</div>  

    <div @click="toggleContainer('security')" class="item-menu">segurança </div>
    
  </div>
</template>

<script>
export default {
  name: 'MenuProfile',
  methods:{
    toggleContainer(container){
      this.$emit('toggleContainer', container)
    }
  }
}
</script>

<style scoped>
  .container-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 250px;
    background: #fff;
    margin: 20px;
  }
  .item-menu {
    width: 100%;
    height: 50px;
    border: 1px solid rgba( 8, 80, 120, 0.4);
    border-left: 3px solid rgba( 8, 80, 120, 0.4);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    transition: .2s linear all;
    padding: 10px;
  }
  .item-menu:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .item-menu:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .item-menu:hover{ 
    transform: translateX(5px);
    text-decoration: none;
    border-left: 5px solid rgba( 8, 80, 120, 1);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  }
</style>