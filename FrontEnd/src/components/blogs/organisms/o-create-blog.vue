 <template>
  <div id="CreateBlog">
    <Popover 
      :title="title"
      :target="target"
      :container="container"
      :refTarget="refTarget" >
      
      <template v-slot:trigger>
        <addSomething/>
      </template>

      <template v-slot:content>
        <formBlog @createBlog="createBlog"/>
      </template>

    </Popover>
  </div>
</template>

<script>
  import Popover from '@/components/atoms/utils/a-popover'
  import addSomething from '@/components/molecules/utils/m-add-something'
  import formBlog from '@/components/blogs/atoms/a-form-create'

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