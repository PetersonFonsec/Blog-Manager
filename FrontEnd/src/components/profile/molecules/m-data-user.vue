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
                                    @change="uploadAvatar"
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
                            
                            <editField 
                                label="nome"
                                :value="name"
                                @editedField="changeName"/>

                        </div>

                        <div class="changeField">

                            <editField 
                                label="email" 
                                :value="email" 
                                @editedField="changeEmail"/>
                        
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

                                    <b-button 
                                        variant="danger" 
                                        @click="dropBlog(blog._id)"> 

                                        <i class="fa fa-trash"></i>

                                    </b-button>

                                </li>

                            </template>
                        </ul>
                    </div>
                </b-card>
            </b-col>
        </b-row>

    </div>
</template>

<script> 
import editField from '@/components/utils/atoms/a-edit-field'
import User from '@/controller/user'
import Blog from '@/controller/blog'
import Alert from '@/mixins/alert'
import Image from '@/mixins/image'

export default {
    name: 'DataUser',
    mixins: [ Alert, Image ],
    components: { editField },
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
        changeName(newName){
            this.updateUser('name', newName)
        },
        changeEmail(newEmail){
            this.updateUser('email', newEmail)
        },
        async updateUser(field, newValue){

            let newField = {}

            newField[field] = newValue

            const result = await User.update(newField)

            if(result.success){
                this.editName = false
                
                this.alertSuccess(`${field} alterado com sucesso`)
                
                this.$emit('reload')
            }else{
                this.alertError(result.msg)
            }

        },
        async changePassword(){

            const { password, confirmPassword, newPassword } = this

            if( !this.confirm ) return this.alertError('Senhas não conferem')

            const result = await User.changePassword(password, confirmPassword, newPassword)

            result.success
                ? this.alertSuccess('Senha alterada com Sucesso')
                : this.alertError(result.msg)

            this.resetFields()

        },
        async dropBlog(id){

            const result = await Blog.drop(id)

            result.success
                ? this.alertSuccess('Blog excluido com sucesso')
                : this.alertError(result.msg)

            this.$emit('reload')

        },
        resetFields(){
            this.confirm = ''
            this.confirmPassword =''
            this.newPassword = ''
            this.password =''
            this.newName = ''
        },
        validatePassword(value){
            this.confirm = !!(this.newPassword === value)
        },
    }
}
</script>

<style lang="scss" scoped>
    @import 'profile';
</style>