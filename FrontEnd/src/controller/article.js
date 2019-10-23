import axios from './axios'

class Article {

    constructor(){
        this.router = '/article'
    }

    newError(mensage){
        return {
            success:  false,
            msg: mensage
        }
    }

    async create(idBlog, article){

        if(!idBlog || !article) 
            return this.newError('Blog ou artigo não informados')

        const newArticle = {
            blog: idBlog,
            ...article
        }

        try {
            const res = await axios.post(this.router, newArticle)
            
            return {
                success: true,
                data: res.data
            }

        } catch (error) {
            return this.newError(error.response.data.msg)
        }

    }

    async update(article){

        const { _id } = article

        try{
            const res = await axios.put(`${this.router}/${_id}`, article)

            return {
                success: true,
                data: res.data
            }

        }catch(error){
            return this.newError(error.response.data.msg)
        }
    }

    async findOne(id){
        
        if( !id ) return this.newError('Id Não encontrado')

        try{

            const res = await axios(`${this.router}/${id}`)
            
            return {
                success: true,
                data: res.data
            }

        }catch(error){
            return this.newError(error.response.data.msg)
        }

    }

    async listAll(){

        try {

            const res = await axios.get(this.router)
            
            return {
                success: true,
                data: res.data,
            }

        } catch (error) {
            return this.newError(error.response.data.msg)
        }
    }

}

export default new Article()