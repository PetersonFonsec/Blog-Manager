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
            @create="creatUser"
            @userExist="login = true"/>
    </template>

  </div>
</template>

<script>
import '@/css/keyFrames.css'
import Form from '@/components/molecules/auth/m-form-login'
import FormCreateUser from '@/components/molecules/auth/m-form-create'

export default {
    name:'OrganismsLogin',
    components: { Form, FormCreateUser },
    methods:{
        creatUser(user){

        },
        welcome(user){

        },
    },
    data(){ 
        return{
            login: false
        }
    }
}
</script>

<style>
.container-Login {
    animation: bornBox .4s linear;
    width: 300px;
    height: 400px;
    box-shadow: 0 1px 5px #AAA;
    background-color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 50px auto;

    font-family: 'Roboto', sans-serif;
}
</style>