<template>
  <div class="Form-article">
    <FormAndView>

        <template v-slot:left>
            <Form :preview="true" />
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
    data(){
        return {
            showRightSide: false
        }
    }
}
</script>