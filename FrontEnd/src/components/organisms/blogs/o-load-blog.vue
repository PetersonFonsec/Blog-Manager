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
        <actions 
          @editBlog="editBlog"
          @removeBlog="removeBlog"
          @seerArticles="seerArticles"
          @addArticles="addArticles"
          @giveAcess="giveAcess"/>
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
      editBlog(){
        
        const params = this.idBlog
        
        this.$router.push({ path: '/blog/edit', params })
      },
      removeBlog(){
        this.$axios.delete(`/blog/${this.idBlog}`).then( () => this.$emit('actionTaken') )
      },
      seerArticles(){        
        this.$router.push({ path: '/listArticles' })
      },
      giveAcess(){
        const params = this.idBlog
        
        this.$router.push({ path: '/blog/authores', params })
      },
      addArticles(){        
        const idBlog = this.idBlog
        
        this.$router.push({ path: `/blog/${idBlog}/articles` })
      }
    }
  }
</script>