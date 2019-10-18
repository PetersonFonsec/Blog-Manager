import axios from './axios'

class User {

    constructor(){

        this.router = '/user'

    }

    newError(mensage){
        return {
            success:  false,
            msg: mensage
        }
    }

    async create(user){

        const { email, name, password } = user

        if( !email || !name || !password ) 
            return this.newError('Campos email, nome e senha são obrigatórios')
        
        try {
            
            const res = await axios.post(this.router)
            
            return {
                success:  true,
                data: res.data
            }
        } catch (error) {
            return this.newError(error.response.data.msg)
        }
    }
}

export default new User()