 <template>
  <div id="CreateBlog">
    <Popover 
      :title="title"
      :target="target"
      :container="container"
      :ref="ref"
      :refTarget="refTarget">
      
      <template v-slot:trigger>
        <addSomething/>
      </template>

      <template v-slot:content>
        <formBlog/>
      </template>

    </Popover>
  </div>
</template>

<script>
  import Popover from '../molecules/m-popover-something'
  import addSomething from '../molecules/m-add-something'
  import formBlog from '../molecules/m-form-blog'

  export default {
    name: 'CreateBlog',
    components: { Popover, addSomething, formBlog },
    data(){
      return {
          title: 'Criar novo Blog',
          target: 'add',
          container: 'box-create-blog',
          ref: 'popover-creat',
          refTarget: 'CreateBlog'
      }
    }
  }
</script>