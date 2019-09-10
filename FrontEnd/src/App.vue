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
  methods:{
    async validToken(){

      const token = localStorage.getItem(userKey)

      if(!token) return this.$router.push({ path: '/auth' })
      
      this.$store.commit( 'login', token )

      const res = await this.$axios.get('/validToken')

      if(!res.data) return this.$store.commit( 'logout' )

    }
  },
  mounted(){
    this.validToken()
  }
}
</script>

<style scoped>
body{
  padding: 0px;
  margin:  0px;
  background-color: #f2f2f2;
  overflow-x: hidden;
}
.content{
  padding-top: 50px; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
