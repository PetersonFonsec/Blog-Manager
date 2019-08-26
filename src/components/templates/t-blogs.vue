<template>
  <div class="container-blogs">
      <LoadBlog/>
      <addBlogs/>
  </div>
</template>

<script>
import LoadBlog from '../organisms/o-load-blog'
import addBlogs from '../organisms/o-create-blog'
export default {
    name:'ContainerBlogs',
    components: { addBlogs, LoadBlog }
}
</script>

<style scoped>
.container-blogs{
    display: flex;
}
</style>