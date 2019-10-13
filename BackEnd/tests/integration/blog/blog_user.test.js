const request = require("supertest")
const blogDb  = require("../../../src/model/blog")
const userDb  = require("../../../src/model/user")

const app = require("../../../src/server/app")
const { validBlog, invalidBlog } = require('./blog_mock')

const user = {
    email: "newUserAuth@mock.com",
    password: "123456",
    name: "User Fulano"
}

let userLogged, token = null

beforeEach( async () => {

    userLogged = await request(app).post("/user").send(user)
        
    token = `Bearer ${userLogged.body.token}`  

})

afterEach( async () => {

    const users = await userDb.find({})
    
    users.forEach( async user => await userDb.findByIdAndDelete(user._id) )

    const blogs = await blogDb.find({})
    
    blogs.forEach( async blog => await blogDb.findByIdAndDelete(blog._id) )

})

describe('routes /blog/user', () => {

    describe('GET', () => {

        it('Should return status 410 when the request without token', async () => {
            
            const response = await request(app)
                .post("/blog")
                .send({})

            expect(response.status).toBe(401)
        })

        it("Should return an array of all blogs where the logged in user is the author", async () => {
            
            const { name } = validBlog

            await request(app).post("/blog").set({ authorization: token }).send({ name })

            await request(app)
                    .post("/blog")
                    .set({ authorization: token })
                    .send({ name: `${name}-2` })

            const response = await request(app)
                .get('/blog/user')
                .set({ authorization: token })
                .send()
            
            expect(response.body.result.length).toBe(2)

        })

        it("Should return an empty array of all blogs where the logged in user is the author", async () => {

            const { name } = validBlog

            const response = await request(app)
                .get('/blog/user')
                .set({ authorization: token })
                .send({ name: `${name}-2` })
            
            expect(response.body.result.length).toBe(0)

        })

    })
})