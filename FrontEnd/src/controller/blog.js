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

    async drop(id){

        try {

            const res = await axios.delete(`${this.router}/${id}`)
            
            return {
                success: true,
                data: res.data
            }

        } catch (error) {
            return this.newError(error.response.data.msg)
        }

    }

    async create(name){
        
        try {

            const res = await axios.post(this.router, name)

            return {
                success: true,
                data: res.data
            }

        } catch (error) {
            return this.newError(error.response.data.msg)
        }

    }

    async loadUserBlogs(){

        try {

            const res = await axios.get(`${this.router}/user/`)
            
            return {
                success: true,
                data: res.data 
            }

        } catch (error) {
            return this.newError(error.response.data.msg)
        }

    }
}

export default new Blog()