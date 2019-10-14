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

let generateArticle = null

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

    generateArticle = title => {
        return {
            ...articleCreated,
            title: title
        }
    }
})

afterEach( async () => {

    const users = await userDb.find({})
    
    users.forEach( async user => await userDb.findByIdAndDelete(user._id) )

    const blogs = await blogDb.find({})
    
    blogs.forEach( async blog => await blogDb.findByIdAndDelete(blog._id) )

    const articles = await articleDb.find({})

    articles.forEach( async article => await articleDb.findByIdAndDelete(article._id) )

})

describe('route /article', ()=>{
    
    describe('GET', () => {

        it("should return stats 401 when header without authorization ", async () => {

            const response = await request(app)
                    .get(`/article`)
                    .send()

            expect(response.status).toBe(401)

        })

        it("should return an array with all article of a given blog", async () => {

            const article_one = generateArticle('novo titulo_1')

            const article_two = generateArticle('novo titulo_2')
            
            await request(app)
                .post("/article")
                .set({ authorization: token })
                .send(article_one)

            await request(app)
                .post("/article")
                .set({ authorization: token })
                .send(article_two)
            
            const response = await request(app)
                .get(`/article`)
                .set({ authorization: token })
                .send()

            const { result } = response.body

            expect(result.length).toEqual(3)

        })

        it("should return stats 200 when send token", async () => {
            
            const response = await request(app)
                .get(`/article`)
                .set({ authorization: token })
                .send()

            expect(response.status).toEqual(200)

        })

    })

    describe('POST', () => {

        it("should return stats 401 when header without authorization ", async () => {

            const response = await request(app)
                    .post(`/article`)
                    .send()

            expect(response.status).toBe(401)

        })

        it("should return the article created", async () => {

            const article_one = generateArticle('novo titulo_1')

            const response = await request(app)
                    .post(`/article`)
                    .set({ authorization: token })
                    .send(article_one)

            const articleCreated = response.body.result

            expect(articleCreated.title).toEqual(article_one.title)

        })

        it("should return stats 501 when tried create two article with the same title  ", async () => {

            const response = await request(app)
                .post(`/article`)
                .set({ authorization: token })
                .send(articleCreated)

            expect(response.status).toBe(501)

        })
        
    })
})