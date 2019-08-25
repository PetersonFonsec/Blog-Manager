 <template>
  <div id="CreateBlog">
    <Popover title="Criar um novo blog">
      
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
  }
</script>