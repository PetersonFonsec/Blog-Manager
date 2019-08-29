<template>
  <div class="container-blogs">
    <h3 class="mb-3">Seus Blogs</h3>

    <hr/>

    <div class="blogs">
        <LoadBlog/>
        <addBlogs/>
    </div>
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
.container-blogs {
    width: 90%;
    height: 100%;
    margin: 10px auto;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 0px 5px rgba(49, 49, 49, 0.692);
    background-color: #fff;
    text-align: center;
}
.blogs{    
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>