const request = require("supertest")
const blogDb  = require("../../../src/model/blog")
const userDb  = require("../../../src/model/user")
const { validBlog: blogAnime } = require('./blog_mock')

const app = require("../../../src/server/app")

const user = {
    email: "newUserAuth@mock.com",
    password: "123456",
    name: "User Fulano"
}

let userLogged, token, blogCreated = null

beforeEach( async () => {

    userLogged = await request(app).post("/user").send(user)

    token = `Bearer ${userLogged.body.token}`

    const response = await request(app)
        .post("/blog")
        .set({ authorization: token })
        .send(blogAnime)

    blogCreated = response.body.result

})

afterEach( async () => {

    const users = await userDb.find({})
    
    users.forEach( async user => await userDb.findByIdAndDelete(user._id) )

    const blogs = await blogDb.find({})
    
    blogs.forEach( async blog => await blogDb.findByIdAndDelete(blog._id) )

})

describe('route /blog/:id', ()=>{
    
    describe('GET', () => {

        it("should return stats 401 when header without authorization ", async () => {

            const response = await request(app)
                    .get(`/blog/${blogCreated._id}`)
                    .send()

            expect(response.status).toBe(401)

        })

        it("should return a object containg the same blog created in beforeEach ", async () => {

            const response = await request(app)
                    .get(`/blog/${blogCreated._id}`)
                    .set({ authorization: token })
                    .send()

            expect(response.body.result).toEqual(blogCreated)

        })

        it("should return status 200 when id is valid and token sended", async () => {

            const response = await request(app)
                    .get(`/blog/${blogCreated._id}`)
                    .set({ authorization: token })
                    .send()

            expect(response.status).toEqual(200)

        })

        it("should return status 404 when id is invalid", async () => {

            const idInvalid = 'id is invalid'

            const response = await request(app)
                    .get(`/blog/${idInvalid}`)
                    .set({ authorization: token })
                    .send()

            expect(response.status).toEqual(404)

        })
    })
})