import { baseURL, userKey } from '@/global'
import axios from 'axios'
import alertMixins from "./alert"

export default {
    mixins: [ alertMixins ],
    computed:{
        src(){
            const images = require.context('@/assets', false, /\.jpg$/)
     
            return  this.avatar 
                ? `${baseURL}/${this.avatar}`
                : images('./avatar-default.jpg')
        }
    },
    data(){
        return {
            limit: 2 * 1024 * 1024
        }
    },
    methods:{
        validFile(event){

            const firstFile = e => e.target.files[0]

            const img = firstFile(event)

            if( img.size > this.limit ){
                
                this.alertError('Tamanho maximo da imagem é de 2 mb')
                
                return false
            }

            return img

        },
        uploadAvatar(event){
            this.uploadImg(event, '/upload/avatar', 'avatar')
        },
        uploadCoverArticle(event){
            this.uploadImg(event, '/upload/coverArticle`', 'avatar')
        },
        async uploadImg(event, url, fieldName){

            const img = this.validFile(event)
                
            const form = new FormData()

            form.append(fieldName, img, img.name)

            const token = localStorage.getItem(userKey)

            try {
             
                const result = await axios.post(`${baseURL}${url}`, form,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'authorization': token
                    }
                });

                if(result.status === 200){
                    this.alertSuccess('Upload realizado com sucesso')
                }   

            } catch (error) {
                this.alertError(error.msg)
            }

            this.$emit('reload')

        },
    }
}