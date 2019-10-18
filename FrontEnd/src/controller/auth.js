import axios from './axios'

class Auth {
    
    constructor(){
        this.router = '/auth'
    }

    login(email, password){

        axios.post('/auth', { email, password })
            .then( res => console.table(res.data))
            .catch( error => console.log('error', error) )

    }


}

export default new Auth()