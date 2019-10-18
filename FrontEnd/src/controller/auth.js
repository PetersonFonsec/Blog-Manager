import axios from './axios'

class Auth {
    
    constructor(){
        this.router = '/auth'
    }

    newError(mensage){
        return {
            success:  false,
            msg: mensage
        }
    }

    async login(user){ 

        const { email,  password } = user

        if( !email || !password ) 
            return this.newError('Campos email e senha são obrigatórios')

        try{

            const res = await axios.post(this.router, { email, password })

            return {
                success:  true,
                data: res.data
            }

        }catch(error){
            
            return this.newError(error.response.data.msg)
            
        }

    }


}

export default new Auth()