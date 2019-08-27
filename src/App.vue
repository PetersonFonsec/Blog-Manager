<template>
  <div id="app">
    <Header />
    <Form/>
  </div>
</template>

<script>
import Header from '@/components/organisms/menu/o-header'
import Form   from '@/components/organisms/articles/o-form-view'
export default {
  components: { Header, Form },
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
