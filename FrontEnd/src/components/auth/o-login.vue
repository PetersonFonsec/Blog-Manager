<template>
  <div class="container-Login">
    
    <template v-if="login">
        <h3>Entrar</h3>
        <Form 
            @loging="welcome"
            @userNotExist="login = false"/>
    </template>

    <template v-else>
        <h3>Criar Conta</h3>
        <FormCreateUser
            @create="welcome"
            @userExist="login = true"/>
    </template>

  </div>
</template>

<script>
import Form from '@/components/auth/m-form-login'
import FormCreateUser from '@/components/auth/m-form-create'
import Auth from '@/controller/auth'

export default {
    name:'OrganismsLogin',
    components: { Form, FormCreateUser },
    methods:{
        async welcome(user){
            const router = user.newUser ? '/user' : '/auth'
            
            const { email, password } = user

            const result = new Auth.login(email, password)

            console.table('result',result)

            if(result.status === 200){                    

                this.$store.commit('login', result.data.token )

                this.$router.push({ path: `/dashboard`})

            }else{                
                this.$bvToast.toast(result.data.msg, {
                    title: 'Opss...',
                    variant: 'danger',
                    solid: true
                })                
            }                


        },
    },
    data(){ 
        return{
            login: true
        }
    }
}
</script>

<style lang="scss">
    @import 'login';
</style>