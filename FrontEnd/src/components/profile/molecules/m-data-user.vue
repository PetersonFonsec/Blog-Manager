<template>
    <div class="container-profile">
        <b-row>
            <b-col xs="12" sm="12" md="6" lg="6">
      
                <b-col class="mb-2" xs="12">
                    <b-card>
                        <div class="container-user-data">
                            <h3>Foto</h3>

                            <b-img :src="src"
                                v-bind="mainProps"
                                rounded="circle"
                                alt="avatar" />

                            <b-form-group
                                id="group-img"
                                label="mudar foto de perfil"
                                class="mt-3"
                                label-for="img">

                                <b-form-file
                                    id="img"
                                    @change="uploadImg"
                                    placeholder="Faça um upload da imagem" />

                            </b-form-group>
                        </div>
                    </b-card>
                </b-col>

                <b-col xs="12">
                    <b-card>
                        <div class="container-user-password">

                            <b-form-group
                                id="group-user-password"
                                label="Senha atual"
                                labe-for="user-password">

                                <b-form-input
                                    id="user-password"
                                    type="password" 
                                    required
                                    v-model="password"/>
                            </b-form-group>

                            <b-form-group
                                id="group-user-newPassword"
                                label="Nova Senha"
                                labe-for="user-newPassword">

                                <b-form-input
                                    id="user-newPassword"
                                    type="password" 
                                    required
                                    v-model="newPassword"/>
                            </b-form-group>

                            <b-form-group
                                id="group-user-ConfirmPassword"
                                label="Confirme sua Senha"
                                labe-for="user-ConfirmPassword">

                                <b-form-input
                                    id="user-ConfirmPassword"
                                    type="password" 
                                    required
                                    :state="confirm"
                                    @input="validatePassword"
                                    v-model="confirmPassword"/>
                            </b-form-group>

                            <b-button variant="success" @click="changePassword"> Alterar senha </b-button>
                        </div>
                    </b-card>
                </b-col>
            </b-col>

            <b-col class="mb-2 mt-2" xs="12" md="6" lg="6">
                <b-card>
                    <div class="container-user-data">
                        <h3>Sobre você</h3>

                        <div class="changeField mb-3">
                            <editField label="nome" :value="name" @editedField="changeName"/>
                        </div>

                        <div class="changeField">
                            <editField label="email" :value="email" @editedField="changeEmail"/>
                        </div>
                    </div>
                </b-card>
            
                <b-card class="mt-2">
                    <div class="container-blogs">

                        <h3>Seus BLogs</h3>

                        <ul>
                            <template v-for="(blog,i) in blogs" >
                                <li :key="i"> 
                                    <span class="name-blog">
                                        {{ blog.name }} 
                                    </span>

                                    <b-button variant="danger" @click="dropBlog(blog._id)"> 
                                        <i class="fa fa-trash"></i>
                                    </b-button>
                                </li>
                            </template>
                        </ul>
                    </div>
                </b-card>
            </b-col>
        </b-row>

        <b-row>
        </b-row>
    </div>
</template>

<script> 
import { baseURL, userKey } from '@/global'
import axios from 'axios'
import editField from '@/components/utils/atoms/a-edit-field'
export default {
    name: 'DataUser',
    components: { editField },
    computed:{
        src(){
            const images = require.context('@/assets', false, /\.jpg$/)
     
            return  `${baseURL}/${this.avatar}` || images('./avatar-default.jpg')
        }
    },
    props:{
        name:{
            type: String,
            required: true
        },
        blogs: {
            type: Array,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        avatar:{
            type: String,
        }
    },
    data(){
        return{
            editName: false,
            editEmail: false,
            newName: '',
            confirm: '',
            confirmPassword:'',
            password:'',
            newPassword: '',
            mainProps: {
                width: 200,
                height: 200,
                class: 'm1'
            }
 
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

            const result = await axios.post(`${baseURL}/upload/avatar`, form, config)

            if(result.status === 200){

                this.$bvToast.toast('Upload feito', {
                    title: 'Upload realizado com sucesso',
                    variant: 'success',
                    solid: true
                })

            }

            this.article.photo = result.data.file.toString()

        },
        async changeName(newName){
            
            const result = await this.$axios.put('/userLogged', { name: newName })

            if(result.status === 200){
                this.editName = false
                this.$emit('reload')
            } 
        },
        async changeEmail(newEmail){
            
            const result = await this.$axios.put('/userLogged', { email: newEmail })

            if(result.status === 200){
                this.editName = false
                this.$emit('reload')
            }
        },
        async dropBlog(id){
            const result = await this.$axios.delete(`/blog/${id}`)

            if(result.status === 200) {
                
                this.$bvToast.toast('Blog escluido com sucesso', {
                    title: 'Sucesso',
                    variant: 'success',
                    solid: true
                })

                this.$emit('reload')
            }
        },
        async changePassword(){

            const { password, confirmPassword, newPassword } = this

            if( !password || !confirmPassword || !newPassword ) 
                return this.showInfo('Campo invalido', 'Todos os Campos são obrigatórios')

            if( !this.confirm || confirmPassword !== newPassword ) 
                return this.showDanger('Campo invalido', 'senha não confere')

            const validPassword = await this.$axios.post('/userLogged', { password })

            if( validPassword.status !== 200  ) 
                return this.showDanger('Senha Incorreta', 'Senha atual está incorreta')
            
            const result = await this.$axios.put('/userlogged/changepassword', { newPassword })

            result.status === 200
                ? this.showSuccess('Sucesso', 'Senha alterada com sucesso')
                : this.showDanger('Erro', 'Senha Invalida')

            this.newName = ''
            this.confirm = ''
            this.confirmPassword =''
            this.password =''
            this.newPassword = ''
        },
        validatePassword(value){
            this.confirm = !!(this.newPassword === value)
        },
        showToast(title, msg, type){
            this.$bvToast.toast(msg, {
                title: title,
                solid: true,
                variant: type.toString()
            })            
        },
        showInfo(title, msg){
            this.showToast(title, msg,'info')
        },
        showDanger(title, msg){
            this.showToast(title, msg,'danger')
        },
        showSuccess(title, msg){
            this.showToast(title, msg,'success')
        },
    }
}
</script>

<style lang="scss" scoped>
    @import 'profile';
</style>