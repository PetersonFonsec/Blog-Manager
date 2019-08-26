<template>
  <div class="profile-blog">
    {{ title }}
    <hr>
    <div class="info">
      <strong>{{ author }}</strong>
      {{ data }}
    </div>
  </div>
</template>

<script>
export default {
    name: 'totalBlog',
    props:{
      title: {
        type: String,
        require: true
      },
      author:{
        type: String,
        require: true
      },
      data:{
        type: String,
        require: true
      }
    }
}
</script>

<style>
.info{
  display: flex;
}
</style>