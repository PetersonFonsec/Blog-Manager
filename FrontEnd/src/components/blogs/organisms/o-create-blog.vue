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

  export default {
    name: 'CreateBlog',
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
        
        const result = await this.$axios.post('/blog', blogName)

        if(result.status === 200){
          this.$emit('blogCreated', true)
        }
      }
    }
  }
</script>