const request = require("supertest")
const blogDb  = require("../../../src/model/blog")
const userDb  = require("../../../src/model/user")
const { validBlog, invalidBlog } = require('./blog_mock')

const app = require("../../../src/server/app")

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

describe("routes /blog", () => {

    describe("POST", () => {

        it("should return stats 401 when header without authorization ", async () => {
            
            const response = await request(app)
                    .post("/blog")
                    .send({})

            expect(response.status).toBe(401)
        })

        it("should return stats 401 when field name not sended", async () => {
            
            const response = await request(app)
                    .post("/blog")
                    .set({ authorization: token })
                    .send( invalidBlog )

            expect(response.status).toBe(401)
        })

        it("should return stats 200 all params is correct", async () => {
       
            const res = await request(app)
                .post("/blog")
                .set({ authorization: token })
                .send({ name: validBlog.name })

            expect(res.status).toBe(200)
        })
       
        it("should return a error when blog exist with same name", async () => {
           
            const { name } = validBlog

            await request(app)
                    .post("/blog")
                    .set({ authorization: token })
                    .send({ name })

            const res = await request(app)
                    .post("/blog")
                    .set({ authorization: token })
                    .send({ name })

            expect(res.status).toBe(401)
        })

    })

    describe("GET", () => {

        it("should return an array with all blogs created ", async () => {
            
            const response = await request(app)
                    .get("/blog")
                    .set({ authorization: token })
                    .send({})

            const allBlogs = response.body.result

            expect( Array.isArray(allBlogs) ).toBe(true)
        })

        it("should return stats 200", async () => {
            
            const response = await request(app)
                    .get("/blog")
                    .set({ authorization: token })
                    .send()

            expect(response.status).toBe(200)
        })

        it("should return stats 401 when sended without token ", async () => {
            
            const response = await request(app)
                    .get("/blog")
                    .send({})

            expect(response.status).toBe(401)
        })
       
    })

})