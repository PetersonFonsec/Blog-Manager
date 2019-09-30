<template>
  <div class="container-blogs">
    <h3 class="mb-3">Seus Blogs</h3>

    <hr/>

    <div class="blogs">
        
      <template v-for="(blog, index) in blogs ">
        <LoadBlog 
          @actionTaken="refresh"
          :idBlog="blog._id"
          :key="index"
          :BlogName="blog.name"/>
      </template>

      <addBlogs @blogCreated="refresh"/>
    </div>
  </div>
</template>

<script>
import LoadBlog from '@/components/blogs/organisms/o-load-blog'
import addBlogs from '@/components/blogs/organisms/o-create-blog'

export default {
    name:'ContainerBlogs',
    components: { addBlogs, LoadBlog },
    data(){
      return {
        blogs: []
      }
    },
    methods:{
      async loadBlogs(){
        const blogs = await this.$axios.get('/blog/user/')        
        
        this.blogs = blogs.data.result
      },
      refresh(){
        this.loadBlogs()
      }
    },
    mounted(){
      this.loadBlogs()
    }
}
</script>

<style lang="scss" scoped>
  @import 't-blog';
</style>