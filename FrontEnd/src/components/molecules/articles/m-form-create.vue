<template>
  <div class="form-article">
      <b-form @submit.prevent="_submit" @reset="reset">

        <b-row>
          <b-col sm='12' class="button-img">             
            <template v-if="linkImg">
              <b-button variant="primary" @click="linkImg = !linkImg">
                <i class="fa fa-paperclip" aria-hidden="true"></i> Importar imagem
              </b-button>
            </template>

            <template v-else>
              <b-button variant="primary" @click="linkImg = !linkImg">
                <i class="fa fa-link" aria-hidden="true"></i> Linkar imagem
              </b-button>
            </template>
          </b-col>
        </b-row>

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
            <template v-if="linkImg">
              <b-form-group id="group-link-img" label="Link da IMG" label-for="linkImg">
                <b-form-input
                  id="linkImg"
                  v-model="article.linkImg"
                  placeholder="Link da image capa do artigo" />
              </b-form-group>
            </template>

            <template v-else>
              <b-form-group id="group-img" label="Imagem" label-for="img">
                <b-form-file
                  id="img"
                  @change="uploadImg"
                  v-model="article.img"
                  placeholder="Faça um upload da imagem" />
              </b-form-group>
            </template>
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
import '@/css/keyFrames.css'
import { VueEditor } from 'vue2-editor'
export default {
    name:'FormArticle',
    components: { VueEditor },
    props:['mode', 'preview'],
    watch:{
      article:{
        handler: function(article){
          if(this.preview) this.$store.commit('updatePreview', article)
        },
        deep: true
      }
    },
    computed:{
      _mode(){
        return this.mode || 'save'
      },
      rulesDescription(){ 
        return this.article.description.length <= 80 ? 'none' : false
      },
      rulesTitle(){
        return this.article.title.length <= 80 ? 'none' : false
      }
    },
    data(){
      return {
        linkImg: false,
        imageUploaded: null,
        article: {
          description: '',
          title: '',
        },
      }
    },
    methods:{
      uploadImg(event){
        const img = event.target.files[0]

        const limit = 2 * 1024 * 1024

        if(img.size > limit){
          this.$bvToast.toast('Tamanho maximo da imagem é de 2 mb', {
            title: 'Tamanho maximo exedido',
            variant: 'danger',
            solid: true
          })
        }
        
        this.$axios.post('/upload/coverArticle', { avatar: img })

        this.imageUploaded = img

      },
      _submit(){
        const mode = this._mode === 'save' ? 'save' : 'update'
        
        const photo = this.imageUploaded || this.article.linkImg

        const article = { mode, photo, ...this.article }

        this.$emit('createArticle', article)
      },
      reset(){
        this.article = {}
      },
    }
}
</script>

<style scoped>
  .form-article{
    animation: bornBox .4s linear;
    width: 100%;
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba( 200, 200, 200, .8 );
    display: flex;
    justify-content: center;
  }
  .center{
    display:flex;
    justify-content: center;
    align-content: center;
  }
  .button-img{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 5px;
  }
</style>