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
                    v-model="user.email"/>
            </b-form-group>

            <b-form-group
                id="group-user-password"
                label="Senha"
                labe-for="user-password">

                <b-form-input
                    id="user-password"
                    type="password" 
                    v-model="user.password"/>
            </b-form-group>

            <b-form-group
                id="group-user-ConfirmPassword"
                label="Confirme sua Senha"
                labe-for="user-ConfirmPassword">

                <b-form-input
                    id="user-ConfirmPassword"
                    type="password" 
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
            this.$emit('create', this.user )
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