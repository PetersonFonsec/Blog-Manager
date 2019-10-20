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
        const a = article
        a
    }
}

export default new Article()