<template>
    <div class="container-author">
        <div class="photo">
            
            <b-img 
                :src="src(author.avatar)"
                v-bind="imgProps"
                rounded="circle"
                alt="avatar" />

            </div>
        
        <div class="container-data">
            <div>{{ author.name }}</div>
        
            <div>{{ author.email }}</div>
        </div>
    </div>
</template>

<script>
import { baseURL } from '@/global'
export default {
    props:{
        author:{
            type: Object,
            require: true
        }
    },
    methods:{
        src(avatar){
            const images = require.context('@/assets', false, /\.jpg$/)
     
            return avatar === 'avatar-default' 
                ? images('./avatar-default.jpg')
                : `${baseURL}/${avatar}`
        },
    },
    data(){
        return {
            imgProps: {
                width: 50,
                height: 50,
                class: 'm1'
            }
        }
    }

}
</script>

<style lang="scss" scoped>
    @import 'a-blog.scss';
</style>