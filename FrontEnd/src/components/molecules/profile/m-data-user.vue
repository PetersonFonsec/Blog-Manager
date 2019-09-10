<template>
    <div style="display: flex">

        <b-col sm="12" md="6">
            <b-card>
                <div class="container-user-data">
                    <h3>Sobre você</h3>

                    <div class="changeField">
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

        <b-col sm="12" md="6">
            <b-card>

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
            </b-card>
        </b-col>
        
    </div>
</template>

<script>
import editField from '@/components/atoms/utils/a-edit-field'
export default {
    name: 'DataUser',
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
            newPassword: ''
        }
    },
    methods:{
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

            return result.status === 200
                ? this.showSuccess('Sucesso', 'Senha alterada com sucesso')
                : this.showDanger('Erro', 'Senha Invalida')
        }
    }
}
</script>

<style scoped>
.container-blogs {
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.container-blogs h3{
    margin: 5px auto;
}
.container-blogs ul {
    width: 100%;
}
.container-blogs li{
    list-style: none;
    margin: 10px 0;
    transition: .2s linear all;
}
.changeField {
    margin: 10px 0;
    width: 300px;
}
.container-blogs li:hover{
    transform: translateY(-5px)
}
.name-blog {
    display: inline-block;
    width: 80%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    padding: 5px;
    margin-right: 10px;
}
.container-user-data{
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>