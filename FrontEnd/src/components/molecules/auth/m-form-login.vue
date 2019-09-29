<template>
    <div class="form-auth">
        <b-form @submit.prevent="loging">
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

            <div class="center">
                <b-button variant="primary" type="submit"> Entrar </b-button>
                
                <b-button
                    variant="success"
                    @click="userNotExist"
                    class="ml-2"> Crie uma conta !! </b-button>
                
                <b-button
                    variant="info"
                    @click="forgetPassword"
                    class="mt-2 btn-block"> esqueci a minha senha </b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
export default {
    name:'FormLogin',
    data(){
        return {
            user: {}
        }
    },
    methods:{
        loging(){
            this.$emit('loging', this.user )
        },
        userNotExist(){
            this.$emit('userNotExist', true)
        },
        forgetPassword(){
            this.$emit('ForgetPassword', true)
        },
    }
}
</script>

<style lang="scss">
    @import 'm-auth';
</style>