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
        <blog :BlogName="BlogName" />
      </template>

      <template v-slot:content>
        <actions/>
      </template>

    </Popover>
  </div>
</template>

<script>
  import Popover from '@/components/atoms/utils/a-popover'
  import blog    from '@/components/molecules/blogs/m-box'
  import actions from '@/components/atoms/blogs/a-form-actions'

  export default {
    name: 'LoadBlog',
    components: { Popover, blog, actions },
    props: ['BlogName'],
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