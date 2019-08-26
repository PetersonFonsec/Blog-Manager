 <template>
  <div id="LoadBlog">
    <Popover 
      :title="title"
      :target="target"
      :container="container"
      :ref="ref"
      :refTarget="refTarget"
      >
      
      <template v-slot:trigger>
        <blog BlogName="ppets" />
      </template>

      <template v-slot:content>
        <actions/>
      </template>

    </Popover>
  </div>
</template>

<script>
  import Popover from '../molecules/m-popover-something'
  import blog    from '../molecules/m-load-blog'
  import actions from '../molecules/m-blog-actions'

  export default {
    name: 'LoadBlog',
    components: { Popover, blog, actions },
    data(){
      return {
          title: 'O que fazer ?',
          target: 'carregar',
          container: 'box-load-blog',
          ref: 'popover-actions',
          refTarget: 'LoadBlog'
      }
    }
  }
</script>