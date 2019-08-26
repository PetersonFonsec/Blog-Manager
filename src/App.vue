<template>
  <div id="app">
    <Header />
    
    <div class="content">
      <blogs/>
    </div>

  </div>
</template>

<script>
import Header from '@/components/organisms/o-header'
import blogs  from '@/components/templates/t-blogs'
export default {
  components: { Header, blogs },
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
