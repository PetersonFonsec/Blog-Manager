 <template>
  <div id="LoadBlog">
    <Popover 
      :title="title"
      :target="target"
      :container="container"
      :ref="ref"
      :refTarget="refTarget"
      >

      <template #trigger>

        <blog :BlogName="BlogName" />

      </template>

      <template #content>

        <actions 
          @addArticles="addArticles"
          @giveAcess="giveAcess"/>

      </template>

    </Popover>
  </div>
</template>

<script>
  import Popover from '@/components/utils/atoms/a-popover'
  import blog    from '@/components/blogs/molecules/m-box'
  import actions from '@/components/blogs/atoms/a-form-actions'

  export default {
    name: 'LoadBlog',
    components: { Popover, blog, actions },
    props: {
      BlogName :{
        type: String,
        required: true,
      },
      idBlog :{
        type: String,
        required: true,
      }
    },
    data(){
      return {
        title: 'O que fazer ?',
        target: `carregar-${(Math.random() * 10).toFixed()}`,
        container: `box-load-blog-${(Math.random() * 10).toFixed()}`,
        ref: `popover-actions-${(Math.random() * 10).toFixed()}`,
        refTarget: `LoadBlog-${(Math.random() * 10).toFixed()}`
      }
    },
    methods:{
      giveAcess(){
        const idBlog = this.idBlog
        
        this.$router.push({ path: `/blog/${idBlog}/authores` })
      },
      addArticles(){        
        const idBlog = this.idBlog
        
        this.$router.push({ path: `/blog/${idBlog}/articles` })
      }
    }
  }
</script>