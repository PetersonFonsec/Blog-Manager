const request = require("supertest")
const userDb = require("../../src/model/user") 
const mockUser = require("../../mock/user") 
const app = require("../../src/server/app")
const bcrypt = require("bcrypt-nodejs")

const user = mockUser

const adminParams = {
    name: "Peterson Admin",
    email: "Peterson@admin.com",
    password: "123456"
}

let userAdmin, userLogged, token, tokenAdmin = false

beforeEach( async () => { 
    userLogged = await request(app).post("/user").send(user)
    token = `Bearer ${userLogged.body.token}`  

    userAdmin = await request(app)
        .post("/user/admin")
        .set({ authorization: `Bearer ${userLogged.body.token}` })
        .send(adminParams)

    tokenAdmin = `Bearer ${userAdmin.body.token}` 

})

afterEach( async () => {
    await userDb.findOneAndRemove({ email: user.email }) 
    await userDb.findOneAndRemove({ email: adminParams.email }) 
})

describe("route /user", () => {

    describe("POST", () => {
    
        it("should return stats 401 when params is invalid", async () => {
            
            const invalidUser = {
                name: user.name,
                password: user.password
            }
    
            const res = await request(app).post("/user").send(invalidUser)
    
            expect(res.status).toBe(401)
        })
    
        it("should return stats 200 when params is valid", async () => {
            
            const newUser = {
                email: "newUser@mock.com",
                password: "123456",
                name: "User Fulano"
            }

            const res = await request(app).post("/user").send(newUser)

            await userDb.findByIdAndRemove(res.body.result._id)

            expect(res.status).toBe(200)
        })
    
        it("should return stats 401 when email exist", async () => {
    
            const resValid = await request(app).post("/user").send(user)
    
            const resInvalid = await request(app).post("/user").send(user)
    
            expect(resInvalid.status).toBe(401)
        })
    
        it("should return token", async () => {

            const newUser = {
                email: "newUser@mock.com",
                password: "123456",
                name: "User Fulano"
            }

            const res = await request(app).post("/user").send(newUser)
    
            await userDb.findOneAndRemove({ email : newUser.email})

            expect(res.body.token).not.toBeUndefined()
        })

        it("password saved should encripted", async () => {

            const newUser = {
                email: "newUser@mock.com",
                password: "123456",
                name: "User Fulano"
            }

            const userInsered = await request(app).post("/user").send(newUser)

            const { email } = userInsered.body.result

            const userSaved = await userDb.findOne({ email }).select("+password")
            
            const passwordEncripited = bcrypt.hashSync( user.password , bcrypt.genSaltSync(10)) 

            await userDb.findOneAndRemove({ email : newUser.email})

            expect(userSaved.password).not.toEqual(passwordEncripited)
        })
    })


    describe("GET", () => {

        it("should return an array", async () => {

            const res = await request(app).get("/user").send({})
            
            const isArray = Array.isArray(res.body.result)

            expect(isArray).toBe(true)
        })
    
        it("should an array without field password", async () => {

            await request(app).post("/user").send(user)

            const res = await request(app).get("/user").send()

            const firstUser = res.body.result[0]

            expect(firstUser.password).toBeUndefined()
        })

    })

})

describe("route /user/admin", () => {

    describe("POST", () => {

        it("should return stats 401 when params is invalid", async () => {

            const token = `Bearer ${userLogged.body.token}`

            const invalidUser = {
                name: user.name,
                password: user.password
            }

            const res = await request(app)
                                .post("/user/admin")
                                .set({ authorization: token })
                                .send(invalidUser)

            expect(res.status).toBe(401)
        })

        it("should return stats 401 when header without authorization ", async () => {

            const token = `Bearer ${userLogged.body.token}`

            const invalidUser = {
                name: user.name,
                password: user.password
            }

            const res = await request(app)
                                .post("/user/admin")
                                .send(invalidUser)

            expect(res.status).toBe(401)
        })

        it("should return stats 200 when params is valid", async () => {

            const newUser = {
                email: "newUser@mock.com",
                password: "123456",
                name: "User Fulano"
            }

            const res = await request(app)
                .post("/user/admin")
                .set({ authorization: tokenAdmin })                
                .send(newUser)

            await userDb.findByIdAndRemove(res.body.result._id)

            expect(res.status).toBe(200)
        })

        it("should return stats 401 when email exist", async () => {
            
            const token = `Bearer ${userLogged.body.token}`

            const resValid = await request(app)
                .post("/user/admin")
                .set({ authorization: token })
                .send(user)

            const resInvalid = await request(app)
                .post("/user/admin")
                .set({ authorization: token })
                .send(user)

            expect(resInvalid.status).toBe(401)
        })

        it("should return token", async () => {

            const newUser = {
                email: "newUser@mock.com",
                password: "123456",
                name: "User Fulano"
            }

            const res = await request(app)
                .post("/user/admin")
                .set({ authorization: tokenAdmin })
                .send(newUser)

            await userDb.findOneAndRemove({ email : newUser.email})

            expect(res.body.token).not.toBeUndefined()
        })

        it("password saved should encripted", async () => {

            const newUser = {
                email: "newUser@mock.com",
                password: "123456",
                name: "User Fulano"
            }

            await userDb.findOneAndRemove({ email : newUser.email})

            const userInsered = await request(app)
                .post("/user/admin")
                .set({ authorization: tokenAdmin })
                .send(newUser)

            const { email } = userInsered.body.result

            const userSaved = await userDb.findOne({ email }).select("+password")
            
            const passwordEncripited = bcrypt.hashSync( newUser.password , bcrypt.genSaltSync(10)) 

            await userDb.findOneAndRemove({ email : userSaved.email})

            expect(userSaved.password).not.toEqual(passwordEncripited)
        })
    })

})

describe("route /user/:id", () => {

    describe("PUT", () => {

        it("should return stats 401 when header without authorization ", async () => {

            const invalidUser = {
                name: user.name,
                password: user.password,
                email: "Fake@Gmail.com"
            }

            const {id} = userAdmin.body.result

            const res = await request(app).put(`/user/${id}`).send(invalidUser)

            expect(res.status).toBe(401)
        })

        it("should return stats 401 when user logged not is a admin", async () => {

            const userFake = {
                name: "Peterson F. Fake",
                email: "Peterson@fake.com",
                password: "123456"
            }

            const result = await request(app).post("/user").send(userFake)
            
            const tokenFake = `Bearer ${result.body.token}`

            const userNotAdmin = result.body

            const fieldAltered = { name:"Peterson Fonseca Fake" }

            const res = await request(app)
                                .put(`/user/${userNotAdmin.id}`)
                                .set({ authorization: tokenFake })
                                .send(fieldAltered)

            await userDb.findOneAndDelete({ email: userFake.email })

            expect(res.status).toBe(401)

        })

        it("No change the value field admin", async () => {

            const userFake = {
                name: "Peterson F. Fake",
                email: "Peterson@fake.com",
                password: "123456"
            }

            const result = await request(app).post("/user").send(userFake)
            
            const tokenFake = `Bearer ${result.body.token}`

            const fieldAltered = { admin: true }

            const { _id } = result.body.result

            const res = await request(app)
                .put(`/user/${_id}`)
                .set({ authorization: tokenFake })                
                .send(fieldAltered)

            await userDb.findOneAndDelete({ email: userFake.email })

            expect(res.status).toBe(401)

        })

        it("should change field sended", async () => {

            const userFake = {
                name: "Peterson F. Fake",
                email: "Peterson@fake.com",
                password: "123456"
            }

            const result = await request(app).post("/user").send(userFake)

            const name = "OtherName"

            const fieldAltered = { name }

            const { _id } = result.body.result

            await request(app)
                .put(`/user/${_id}`)
                .set({ authorization: tokenAdmin })
                .send(fieldAltered)

            const verify = await userDb.findById(_id)

            await userDb.findOneAndDelete({ email: userFake.email })

            expect(verify.name).toEqual(name)
        })

    })

    describe("GET", () => {

        it("should return stats 401 when header without authorization ", async () => {

            const { id } = userAdmin.body.result

            const res = await request(app).get(`/user/${id}`).send()

            expect(res.status).toBe(401)
        })

        it("should return stats 401 when user logged not is a admin", async () => {

            const { id } = userAdmin.body.result

            const res = await request(app)
                                .put(`/user/${id}`)
                                .set({ authorization: token })
                                .send()

            expect(res.status).toBe(401)

        })

        it("should return status 200 when user id exist", async () => {

            const userFake = {
                name: "Peterson F. Fake",
                email: "Peterson@fake.com",
                password: "123456"
            }

            const result = await request(app).post("/user").send(userFake)
            
            const { _id } = result.body.result

            const res = await request(app)
                .get(`/user/${_id}`)
                .set({ authorization: tokenAdmin })                
                .send()

            await userDb.findOneAndDelete({ email: userFake.email })

            expect(res.body.result._id).toEqual(_id)
        })

        it("should return status 404 when user id not exist", async () => {

            const idNotExist = "5d71e6dd98412f71d2a68ef4"

            const res = await request(app)
                .put(`/user/${idNotExist}`)
                .set({ authorization: tokenAdmin })                
                .send()

            expect(res.status).toBe(404)
        })
    })

    describe("DELETE", () => {

        it("should return stats 401 when header without authorization ", async () => {

            const { id } = userAdmin.body.result

            const res = await request(app).delete(`/user/${id}`).send()

            expect(res.status).toBe(401)
        })

        it("should return stats 401 when user logged not is a admin", async () => {

            const { id } = userAdmin.body.result

            const res = await request(app)
                                .delete(`/user/${id}`)
                                .set({ authorization: token })
                                .send()

            expect(res.status).toBe(401)

        })

        it("should return status 200 when user id exist", async () => {

            const userFake = {
                name: "Peterson F. Fake",
                email: "Peterson@fake.com",
                password: "123456"
            }

            const result = await request(app).post("/user").send(userFake)
            
            const { _id } = result.body.result

            const res = await request(app)
                .delete(`/user/${_id}`)
                .set({ authorization: tokenAdmin })                
                .send()

            await userDb.findOneAndDelete({ email: userFake.email })
            
            expect(res.status).toEqual(200)
        })

        it("should return status 404 when user id not exist", async () => {

            const idNotExist = "5d71e6dd98412f71d2a68ef4"

            const res = await request(app)
                .delete(`/user/${idNotExist}`)
                .set({ authorization: tokenAdmin })                
                .send()

            expect(res.status).toBe(404)
        })
    })

})
