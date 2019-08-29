<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import { userKey } from './global'
import Header from '@/components/organisms/menu/o-header'

export default {
  components: { Header },
  created(){
    const user = localStorage.getItem(userKey)

    if(!user) return this.$router.push({ path: '/auth' })
    
    this.$store.commit( 'login' )
  }
}
</script>

<style>
body{
  padding: 0px;
  margin:  0px;
  background-color: #f2f2f2;
}
.content{
  padding-top: 50px; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
