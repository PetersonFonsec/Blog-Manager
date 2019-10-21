<template>
  <div class="Form-article">
    <FormAndView>

        <template #left>
            <Form 
                @submit="midleware"
                :mode="mode"
                :preview="true" />
        </template>
        
        <template #right>
            <Preview />
        </template>

    </FormAndView>
  </div>
</template>

<script>
import FormAndView from '@/components/utils/atoms/a-form-view'
import Form from '@/components/articles/molecules/m-form-create'
import Preview from '@/components/articles/molecules/m-form-preview'
import Article from '@/controller/article'
import AlertMixin from '@/mixins/alert'

export default {
    name: 'FormArticles',
    components: { Form, Preview, FormAndView },
    mixins: [ AlertMixin ],
    methods:{
        midleware(article){
            article.mode === 'save' 
                ? this.createArticle(article)
                : this.updateArticle(article)
        },
        async createArticle(article){

            const { id } = this.$route.params
            
            const res =  await Article.create(id, article)
            
            if(res.success){

                this.alertSuccess('Article salvo com sucesso')

                this.$router.push({ path: '/blog' })

            }else{                
                this.alertError(res.msg)
            }

        },
        async updateArticle(article){
            
            if(!article._id) return this.alertError('Id do artigo não informado')

            const res = await Article.update(article)

            if(res.success){

                this.alertSuccess('Article alterado com sucesso')

                this.$router.push({ path: '/blog' })

            }else{                
                this.alertError(res.msg)
            }

        }
    },
    data(){
        return {
            showRightSide: false,
            mode: 'save'
        }
    },
    created(){

        const { id } = this.$route.query

        if( id ) this.mode = 'update'

    }
}
</script>