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
                :state="rules.title"
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
                :state="rules.description"
                v-model="article.description"
                placeholder="Uma breve descrição do artigo..." />
            </b-form-group>
          </b-col>
        </b-row>
        
        <b-row>
          <b-col sm="12" class="mt-3 mb-3">
            <VueEditor v-model="article.content" laceholder="Conteudo do Artigo..." />
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
      }
    },
    data(){
      return {
        linkImg: false,
        article: {},
        rules: {
          name: 'none',
          description: 'none',
        }
      }
    },
    methods:{
      _submit(){
        const mode = this._mode === 'save' ? 'save' : 'update'
        const article = { mode, ...this.article }

        this.$emit('submit', article)
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