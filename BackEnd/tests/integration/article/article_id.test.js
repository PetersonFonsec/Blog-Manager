const request = require("supertest")
const blogDb  = require("../../../src/model/blog")
const userDb  = require("../../../src/model/user")
const articleDb  = require("../../../src/model/article")
const { validBlog:blogAnime } = require('../blog/blog_mock')

const app = require("../../../src/server/app")

const user = {
    email: "newUserAuth@mock.com",
    password: "123456",
    name: "User Fulano"
}

const article = {
    title: 'melhor personagem de one piece',
    blog: 'id blog',
    author: 'id author',
    photo: 'path: foto',
    description:'Shanks melhor personagem de one piece',
    content:'<h1>Shanks<h1/>',
    likes:0
}

let userLogged, token, blogCreated, articleCreated = null

beforeAll( async () => {

    const users = await userDb.find({})

    users.forEach( async user => await userDb.findByIdAndDelete(user._id) )

    const blogs = await blogDb.find({})

    blogs.forEach( async blog => await blogDb.findByIdAndDelete(blog._id) )

    const articles = await articleDb.find({})

    articles.forEach( async article => await articleDb.findByIdAndDelete(article._id) )

})

beforeEach( async () => {

    userLogged = await request(app).post("/user").send(user)

    token = `Bearer ${userLogged.body.token}`

    const response = await request(app)
        .post("/blog")
        .set({ authorization: token })
        .send(blogAnime)

    blogCreated = response.body.result

    article.blog = blogCreated._id

    article.author = userLogged.body.result._id

    const responseArticle = await request(app)
        .post("/article")
        .set({ authorization: token })
        .send(article)

    articleCreated = responseArticle.body.result
})

afterEach( async () => {

    const users = await userDb.find({})
    
    users.forEach( async user => await userDb.findByIdAndDelete(user._id) )

    const blogs = await blogDb.find({})
    
    blogs.forEach( async blog => await blogDb.findByIdAndDelete(blog._id) )

    const articles = await articleDb.find({})

    articles.forEach( async article => await articleDb.findByIdAndDelete(article._id) )

})

describe('route /article/:id', ()=>{
    
    describe('GET', () => {

        it("should return stats 401 when header without authorization ", async () => {

            const response = await request(app)
                    .get(`/article/${articleCreated._id}`)
                    .send()

            expect(response.status).toBe(401)

        })

        it("should return a object containg the same blog created in beforeEach ", async () => {

            const response = await request(app)
                    .get(`/article/${articleCreated._id}`)
                    .set({ authorization: token })
                    .send()

            expect(response.body.result.title).toEqual(articleCreated.title)

        })

        it("should return status 200 when id is valid and token sended", async () => {

            const response = await request(app)
                    .get(`/article/${articleCreated._id}`)
                    .set({ authorization: token })
                    .send()

            expect(response.status).toEqual(200)

        })

        it("should return status 501 when id is invalid", async () => {

            const idInvalid = 'id is invalid'

            const response = await request(app)
                    .get(`/article/${idInvalid}`)
                    .set({ authorization: token })
                    .send()

            expect(response.status).toEqual(501)

        })

    })

    describe('POST', () => {

        it("should return stats 401 when header without authorization ", async () => {

            const response = await request(app)
                    .post(`/article/${articleCreated._id}`)
                    .send()

            expect(response.status).toBe(401)

        })

        it("should add more one like ", async () => {

            const response = await request(app)
                    .post(`/article/${articleCreated._id}`)
                    .set({ authorization: token })
                    .send()

            const { likes } = response.body.result

            expect(likes).toEqual( (articleCreated.likes + 1) )

        })

        it("should return status 200 when id is valid and token sended", async () => {

            const response = await request(app)
                    .post(`/article/${articleCreated._id}`)
                    .set({ authorization: token })
                    .send()

            expect(response.status).toEqual(200)

        })

        it("should return status 501 when id is invalid", async () => {

            const idInvalid = 'id is invalid'

            const response = await request(app)
                    .post(`/article/${idInvalid}`)
                    .set({ authorization: token })
                    .send()

            expect(response.status).toEqual(501)

        })

    })

    describe('PUT', () => {

        it("should return stats 401 when header without authorization ", async () => {

            const response = await request(app)
                    .put(`/article/${articleCreated._id}`)
                    .send()

            expect(response.status).toBe(401)

        })

        it("should return a object with field updated", async () => {

            const newTitle = 'other Title'

            const response = await request(app)
                    .put(`/article/${articleCreated._id}`)
                    .set({ authorization: token })
                    .send({ title: newTitle })

            expect(response.body.result.title).toEqual(newTitle)

        })

        it("should return status 200 when id is valid and token sended", async () => {

            const newTitle = 'other Title'

            const response = await request(app)
                    .put(`/article/${articleCreated._id}`)
                    .set({ authorization: token })
                    .send({ title: newTitle })

            expect(response.status).toEqual(200)

        })

        it("should return status 401 when sended field author", async () => {

            const response = await request(app)
                    .put(`/article/${articleCreated._id}`)
                    .set({ authorization: token })
                    .send({ author: 'Eu que fiz'})

            expect(response.status).toEqual(401)

        })

        it("should return status 401 when sended field blog", async () => {

            const response = await request(app)
                    .put(`/article/${articleCreated._id}`)
                    .set({ authorization: token })
                    .send({ blog: 'x blog'})

            expect(response.status).toEqual(401)

        })

        it("should return status 501 when id is invalid", async () => {

            const idInvalid = 'id is invalid'

            const response = await request(app)
                    .put(`/article/${idInvalid}`)
                    .set({ authorization: token })
                    .send()

            expect(response.status).toEqual(501)

        })

    })

    describe('DELETE', () => {

        it("should return stats 401 when header without authorization ", async () => {

            const response = await request(app)
                    .delete(`/article/${articleCreated._id}`)
                    .send()

            expect(response.status).toBe(401)

        })

        it("should return status 200 when id is valid and token sended", async () => {

            const response = await request(app)
                    .delete(`/article/${articleCreated._id}`)
                    .set({ authorization: token })
                    .send()

            expect(response.status).toEqual(200)

        })

        it("should return status 501 when id is invalid", async () => {

            const idInvalid = 'id is invalid'

            const response = await request(app)
                    .delete(`/article/${idInvalid}`)
                    .set({ authorization: token })
                    .send()

            expect(response.status).toEqual(501)

        })

    })
})