import axios from './axios'

class Blog {

    constructor(){
        this.router = '/blog'
    }

    newError(mensage){
        return {
            success:  false,
            msg: mensage
        }
    }

    newSuccess(data){
        return {
            success:  true,
            data
        }
    }

    async newRequest(method, url, params){
        try {
            
            let _params = {}

            const keys = Object.keys(params)

            keys.forEach( key => _params[key] = params[key] )

            const res = await axios[method](url, _params)
            
            return this.newSuccess(res.data)

        } catch (error) {
            return this.newError(error.response.data.msg)
        }
    }

    async drop(id){

        try {

            const res = await axios.delete(`${this.router}/${id}`)
            
            return this.newSuccess(res.data)

        } catch (error) {
            return this.newError(error.response.data.msg)
        }

    }

    async create(name){
        
        try {

            const res = await axios.post(this.router, name)

            return this.newSuccess(res.data)

        } catch (error) {
            return this.newError(error.response.data.msg)
        }

    }

    async loadUserBlogs(){

        try {

            const res = await axios.get(`${this.router}/user/`)
            
            return this.newSuccess(res.data)

        } catch (error) {
            return this.newError(error.response.data.msg)
        }

    }

    async giveAcess(id, authors){
        
        if(!id) return this.newError('Blog não informado')

        if(!authors[0]) return this.newError('Nenhum author informado')

        try {

            const res = await axios.post(`${this.router}/${id}`, { authors })
            
            return this.newSuccess(res.data)

        } catch (error) {
            return this.newError(error.response.data.msg)
        }
    }

}

export default new Blog()