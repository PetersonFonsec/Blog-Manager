<template>
  <div class="Form-article">
    <FormAndView>

        <template #left>
            <Form 
                @createArticle="mode"
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
        mode(article){
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
        async updateArticle(){
            // const result = await this.$axios.post('/article', article)
        }
    },
    data(){
        return {
            showRightSide: false
        }
    }
}
</script>