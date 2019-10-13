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

beforeAll(async () => {

    const users = await userDb.find({})
    
    users.forEach( async user => await userDb.findByIdAndDelete(user._id) )

    const blogs = await blogDb.find({})
    
    blogs.forEach( async blog => await blogDb.findByIdAndDelete(blog._id) )

})

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

    describe('POST', () => {

        it("should return stats 401 when header without authorization ", async () => {

            const response = await request(app)
                    .post(`/blog/${blogCreated._id}`)
                    .send()

            expect(response.status).toBe(401)

        })

        it("should return a object updated with news authors", async () => {

            const newEmail = user => {
                user.email = `${user.email}-${ Math.random() * 10 }`
                
                return user
            }

            author_one = await request(app).post("/user").send( newEmail(user) )
            author_two = await request(app).post("/user").send( newEmail(user) )
            author_thr = await request(app).post("/user").send( newEmail(user) )

            const returnIDs  = res => res.body.result._id

            const newAuthores = [ 
                returnIDs(author_one),
                returnIDs(author_two),
                returnIDs(author_thr)
            ]

            const response = await request(app)
                    .post(`/blog/${blogCreated._id}`)
                    .set({ authorization: token })
                    .send({ authors: newAuthores })

            const { authors } = response.body.result

            expect(authors.length).toBe(4)

        })

        it("should return status 200 when all params is valid", async () => {

            const newEmail = user => {
                user.email = `${user.email}-${ Math.random() * 10 }`
                
                return user
            }

            author_one = await request(app).post("/user").send( newEmail(user) )

            const newAuthor = [ author_one.body.result._id ]

            const response = await request(app)
                    .post(`/blog/${blogCreated._id}`)
                    .set({ authorization: token })
                    .send({ authors: newAuthor })

            expect(response.status).toBe(200)

        })

        it("should return status 401 when the fields authors not sended", async () => {

            const response = await request(app)
                    .post(`/blog/${blogCreated._id}`)
                    .set({ authorization: token })
                    .send()

            expect(response.status).toBe(401)

        })

    })

    describe('PUT', () => {

        it("should return stats 401 when header without authorization ", async () => {

            const response = await request(app)
                    .put(`/blog/${blogCreated._id}`)
                    .send()

            expect(response.status).toBe(401)

        })

        it("should return stats 401 when tried updated field creator", async () => {

            const response = await request(app)
                    .put(`/blog/${blogCreated._id}`)
                    .set({ authorization: token })
                    .send({ creator: 'my id' })

            expect(response.status).toBe(401)

        })

        it("should return status 200 when all params is valid", async () => {

            const newName = 'newNameBlog'

            const response = await request(app)
                    .put(`/blog/${blogCreated._id}`)
                    .set({ authorization: token })
                    .send({ name: newName })

            expect(response.status).toBe(200)

        })

        it("should return an object with fields updated", async () => {
            
            const newName = 'newNameBlog'

            const response = await request(app)
                    .put(`/blog/${blogCreated._id}`)
                    .set({ authorization: token })
                    .send({ name: newName })

            const { name } = response.body.result

            expect(name).toEqual(newName)
        })

    })

    describe('DELETE', () => {

        it("should return stats 401 when header without authorization ", async () => {

            const response = await request(app)
                    .delete(`/blog/${blogCreated._id}`)
                    .send()

            expect(response.status).toBe(401)

        })

        it("should return stats 501 when id param is invalid", async () => {

            const idInvalid = 'id invalid'

            const response = await request(app)
                    .delete(`/blog/${idInvalid}`)
                    .set({ authorization: token })
                    .send()

            expect(response.status).toBe(501)

        })

        it("should return status 200 when all params is valid", async () => {

            const response = await request(app)
                    .delete(`/blog/${blogCreated._id}`)
                    .set({ authorization: token })
                    .send()

            expect(response.status).toBe(200)

        })

    })

})