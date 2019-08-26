<template>
  <div id="app">
    <Header />
    
      <BoxPost title="Pet Script" author="Peterson F. Simião" data="26/08/19"/>

  </div>
</template>

<script>
import Header from '@/components/organisms/o-header'
import BoxPost  from './components/molecules/m-total-box-post'
export default {
  components: { Header, BoxPost },
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
