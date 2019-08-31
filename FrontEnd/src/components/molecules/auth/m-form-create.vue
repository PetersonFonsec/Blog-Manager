<template>
    <div class="form-create">
        <b-form @submit.prevent="create">
            <b-form-group 
                id="group-user-email"
                label="Email do Usuários"
                labe-for="user-email">
                
                <b-form-input
                    id="user-email"
                    type="email" 
                    required
                    v-model="user.email"/>
            </b-form-group>

            <b-form-group 
                id="group-user-name"
                label="Nome do Usuários"
                labe-for="user-name">
                
                <b-form-input
                    id="user-name"
                    required
                    v-model="user.name"/>
            </b-form-group>

            <b-form-group
                id="group-user-password"
                label="Senha"
                labe-for="user-password">

                <b-form-input
                    id="user-password"
                    type="password" 
                    required
                    v-model="user.password"/>
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
                    v-model="user.confirmPassword"/>
            </b-form-group>

            <div class="center">
                <b-button variant="primary" type="submit"> Criar </b-button>
                <b-button variant="success"
                    @click="login"
                    class="ml-2"> Já tem conta ? entre !! </b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
export default {
    name:'FormLogin',
    data(){
        return {
            user: {},
            confirm: 'none'
        }
    },
    methods:{
        create(){
            const user = {
                ...this.user,
                newUser: true
            }

            if( this.confirm && this.confirm !== 'none'){
                this.$emit('create', user)
            }            
        },
        validatePassword(value){
            this.confirm = !!(this.user.password === value)
        },
        login(){
            this.$emit('userExist')
        }
    }
}
</script>

<style>
.form-create{
 display: flex;
 flex-direction: column;
 padding: 10px;
}
.center {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>