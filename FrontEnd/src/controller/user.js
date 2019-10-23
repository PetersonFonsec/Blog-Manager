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
            
            const res = await axios.post(this.router, { email, name, password })
            
            return {
                success:  true,
                data: res.data
            }
        } catch (error) {
            return this.newError(error.response.data.msg)
        }
    }

    async update(fieldUpdate){
        
        try {

            const res = await axios.put('/userLogged', { ...fieldUpdate })

            return {
                success:  true,
                data: res.data
            }
    
        }catch(error) {
            return this.newError(error.response.data.msg)
        }
        
    }

    async changePassword(password, confirmPassword, newPassword){

        if( !password || !confirmPassword || !newPassword ) 
            return this.newError('Todos os Campos são obrigatórios')

        if( confirmPassword !== newPassword ) 
            return this.newError('as senhas não conferem')

        try {

            const validPassword = await axios.post('/userLogged', { password })

            if( validPassword.status !== 200  ) return this.newError('Senha Incorreta')

            const res = await axios.put('/userlogged/changepassword', { newPassword })

            return {
                success:  true,
                data: res.data
            }

        } catch (error) {
            return this.newError(error.response.data.msg)
        }

    }

    async listAll(){

        try {

            const res = await axios(this.router)

            return {
                success: true,
                data: res.data
            }

        } catch (error) {
            return this.newError(error.response.data.msg)
        }

    }

    async getUserLogged(){

        try {

            const res = await axios('/userLogged')

            return {
                success: true,
                data: res.data
            }

        } catch (error) {
            return this.newError(error.response.data.msg)
        }

    }
}

export default new User()