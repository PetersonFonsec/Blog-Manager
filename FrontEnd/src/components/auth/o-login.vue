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
import Alerts from '../../mixins/alert'
import Auth from '@/controller/auth'
import User from '@/controller/user'

export default {
    name:'OrganismsLogin',
    mixins: [ Alerts ],
    components: { Form, FormCreateUser },
    methods:{
        async welcome(user){

            const result = user.newUser 
                ? await User.create(user)
                : await Auth.login(user)

            if(result.success){                    
                
                this.$store.commit('login', result.data.token )

                this.$router.push({ path: '/dashboard' })

            }else{

                this.alertError(result.msg)
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