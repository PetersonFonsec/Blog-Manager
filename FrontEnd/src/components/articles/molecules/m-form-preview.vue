<template>
    <div class="preview">

        <div class="header">
            <h3> Visualização Previa </h3>
            
            <b-button variant="primary" @click="view = !view">
                <i class="fa fa-refresh" aria-hidden="true"></i>
            </b-button>
        </div>

        <template v-if="view">
            <Card :title="ArticlePreview.title" 
                :description="ArticlePreview.description" 
                :data="ArticlePreview.data" 
                :author="ArticlePreview.author"
                :imagem="ArticlePreview.imagem"/>
        </template>
            
        <template v-else>
            <Bar :title="ArticlePreview.title" 
                :description="ArticlePreview.description" 
                :data="ArticlePreview.data" 
                :author="ArticlePreview.author"
                :imagem="ArticlePreview.imagem"/>
        </template>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/articles/molecules/m-item-bar'
import Bar  from '@/components/articles/molecules/m-item-card'

export default {
    name: 'Preview',
    components: { Card, Bar },
    data(){
        return {
            view: true
        }
    },
    computed: { 
        ...mapState(['ArticlePreview'])
    }
}
</script>

<style lang="scss" scoped>
    @import 'm-article';
</style>