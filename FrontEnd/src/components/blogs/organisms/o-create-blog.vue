 <template>
  <div id="CreateBlog">
    <Popover 
      :title="title"
      :target="target"
      :container="container"
      :refTarget="refTarget" >
      
      <template #trigger>
        <addSomething/>
      </template>

      <template #content>
        <formBlog @createBlog="createBlog"/>
      </template>

    </Popover>
  </div>
</template>

<script>
  import Popover from '@/components/utils/atoms/a-popover'
  import formBlog from '@/components/blogs/atoms/a-form-create'
  import addSomething from '@/components/utils/molecules/m-add-something'
  import Blog from '@/controller/blog'
  import Alert from '@/mixins/alert'

  export default {
    name: 'CreateBlog',
    mixins: [ Alert ],
    components: { Popover, addSomething, formBlog },
    data(){
      return {
          title: 'Criar novo Blog',
          target: 'add',
          container: 'box-create-blog',
          refTarget: 'CreateBlog'
      }
    },
    methods:{
      async createBlog(blogName){
        
        const result = await Blog.create(blogName)
        
        if(result.success){
          
          this.alertSuccess('Blog Criado Com sucesso')
          
          this.$emit('blogCreated', true)
        
        }else{
        
          this.alertError(result.msg)
        
        }

      }
    }
  }
</script>