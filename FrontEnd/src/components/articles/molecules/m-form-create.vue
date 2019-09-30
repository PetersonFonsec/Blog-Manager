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
                @change="uploadImg"
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
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
import { userKey, baseURL } from '@/global'
export default {
    name:'FormArticle',
    components: { VueEditor },
    props:['mode', 'preview'],
    watch:{
      article:{
        handler(article){
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
        return this.article.description.length <= 80 ? null : false
      },
      rulesTitle(){
        return this.article.title.length <= 80 ? null : false
      }
    },
    data(){
      return {
        linkImg: false,
        fileSelected: null,
        article: {
          description: '',
          title: '',
        },
      }
    },
    methods:{
      async uploadImg(event){
        const img = event.target.files[0]

        const limit = 2 * 1024 * 1024

        if(img.size > limit){
          return this.$bvToast.toast('Tamanho maximo da imagem é de 2 mb', {
            title: 'Tamanho maximo exedido',
            variant: 'danger',
            solid: true
          })
        }

        const form = new FormData()

        form.append('avatar', img, img.name)

        const token = localStorage.getItem(userKey)

        var config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'authorization': `Bearer ${token}`
          }
        };

        const result = await axios.post(`${baseURL}/upload/coverArticle`, form, config)

        if(result.status === 200){

          this.$bvToast.toast('Upload feito', {
            title: 'Upload realizado com sucesso',
            variant: 'success',
            solid: true
          })

        }

        this.article.photo = result.data.file.toString()

      },
      _submit(){
        const mode = this._mode === 'save' ? 'save' : 'update'
        
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