<template>
  <div id="app">
    <Header />
  </div>
</template>

<script>
import Header from '@/components/organisms/menu/o-header'

export default {
  components: { Header },
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
