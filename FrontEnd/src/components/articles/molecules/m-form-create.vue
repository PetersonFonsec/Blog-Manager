<template>
  <div class="form-article">
      <b-form @submit.prevent="_submit" @reset="reset">

        <b-row>
          <b-col sm='12' md=6>
            <b-form-group id="group-title" label="Titulo" label-for="title">
              <b-form-input 
                id="title"
                :state="rulesTitle"
                v-model="article.title"
                placeholder="Titulo do artigo" />
            </b-form-group>
          </b-col>
          
          <b-col sm='12' md=6>
            <b-form-group id="group-img" label="Imagem" label-for="img">
              <b-form-file
                id="img"
                @change="CoverArticle"
                v-model="fileSelected"
                placeholder="Faça um upload da imagem" />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="12">
            <b-form-group id="group-description" label="Descrião" label-for="name">
              <b-form-input 
                id="description"
                :state="rulesDescription"
                v-model="article.description"
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Uma breve descrição do artigo..." 
                trim
                />

              <b-form-invalid-feedback id="input-live-feedback">
                Maximo de 80 caracteres
              </b-form-invalid-feedback>

              <b-form-text id="input-live-help">Max 80 caracteres.</b-form-text>

            </b-form-group>
          </b-col>
        </b-row>
        
        <b-row>
          <b-col sm="12" class="mt-3 mb-3">
            <VueEditor v-model="article.content" placeholder="Conteudo do Artigo..." />
          </b-col>
        </b-row>
        
        <b-row>
          <b-col sm="12" class="mt-3 mb-3 center">

            <b-button variant="primary" type="submit"> 
              {{ _mode === 'save' ? 'Salvar' : 'Alterar' }}
            </b-button>

            <b-button variant="danger" class="ml-3" @click="reset"> Resetar </b-button>

          </b-col>
        </b-row>

      </b-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import ImagemMixin from '@/mixins/image'
import { mapState } from 'vuex'

export default {
    name:'FormArticle',
    components: { VueEditor },
    mixins: [ ImagemMixin ],
    props: {
      mode: {
        type: String,
        default: 'save'
      },
      preview:{
        type: Boolean,
        default: true
      }
    },
    watch:{
      article:{
        handler(article){
          if(this.preview) this.$store.commit('updatePreview', article)
        },
        deep: true
      }
    },
    computed:{

      ...mapState(['defaultImage']),

      _mode(){
        return this.mode || 'save'
      },
      rulesDescription(){ 
        return this.article.description.length <= 80 ? null : false
      },
      rulesTitle(){
        return this.article.title.length <= 80 ? null : false
      },

    },
    data(){
      return {
        fileSelected: null,
        article: {
          description: '',
          title: '',
          content: '',
          photo: '',
        },
      }
    },
    methods:{
      async CoverArticle(event){
        const res = await this.uploadCoverArticle(event)
        
        this.article.photo = res.data.file

      },
      _submit(){
        const mode = this._mode === 'save' ? 'save' : 'update'
        
        this.article.photo = this.article.photo || this.defaultImage

        const article = { mode, ...this.article }
                
        this.$emit('createArticle', article)
      },
      reset(){
        this.article = {}
      },
    }
}
</script>

<style lang="scss" scoped>
  @import 'm-article';
</style>