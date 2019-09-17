<template>
  <div class="Form-article">
    <FormAndView>

        <template v-slot:left>
            <Form 
                @createArticle="mode"
                :preview="true" />
        </template>
        
        <template v-slot:right>
            <Preview />
        </template>

    </FormAndView>
  </div>
</template>

<script>
import FormAndView from '@/components/atoms/utils/a-form-view'
import Form from '@/components/molecules/articles/m-form-create'
import Preview from '@/components/molecules/articles/m-form-preview'

export default {
    name: 'FormArticles',
    components: { Form, Preview, FormAndView },
    methods:{
        mode(article){
            article.mode === 'save' 
                ? this.createArticle(article)
                : this.updateArticle(article)
        },
        async createArticle(article){

            const { id } = this.$route.params

            const newArticle = {
                blog: id,
                ...article
            }

            const result = await this.$axios.post('/article', newArticle)
            
            if(result.status === 200){
                this.$bvToast.toast('Article salvo com sucesso', {
                    title: 'Sucesso',
                    variant: 'success',
                    solid: true
                })

                this.$route.push({ path: '/blog' })
            }
        },
        async updateArticle(article){
            const result = await this.$axios.post('/article', article)
        }
    },
    data(){
        return {
            showRightSide: false
        }
    }
}
</script>