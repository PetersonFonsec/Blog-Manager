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
}

export default new Blog()