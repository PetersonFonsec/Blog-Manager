const request = require("supertest")
const userDb = require("../../../src/model/user") 
const app = require("../../../src/server/app")

const user = {
    name: "Peterson Comum",
    email: "Peterson@comum.com",
    password: "123456"
}

const userFake = {
    name: "Peterson F. Fake",
    email: "Peterson@fake.com",
    password: "123456"
}

const adminParams = {
    name: "Peterson Admin",
    email: "Peterson@admin.com",
    password: "123456"
}

const invalidUser = {
    name: user.name,
    password: user.password,
    email: "Fake@Gmail.com"
}

let userAdmin, userLogged, token, tokenAdmin = false

beforeEach( async () => { 
        
    userLogged = await request(app).post("/user").send(user)
    
    token = `Bearer ${userLogged.body.token}`  

    userAdmin = await request(app)
        .post("/user/admin")
        .set({ authorization: token })
        .send(adminParams)

    tokenAdmin = `Bearer ${userAdmin.body.token}` 

})

afterEach( async () => {

    const users = await userDb.find({})
    
    users.forEach( async user => await userDb.findByIdAndDelete(user._id) )

})

describe("route /user/:id", () => {

    describe("PUT", () => {

        it("should return stats 401 when header without authorization ", async () => {

            const { _id } = userAdmin.body.result

            const res = await request(app).put(`/user/${_id}`).send(invalidUser)

            expect(res.status).toBe(401)
        })

        it("should return stats 401 when user logged not is a admin", async () => {

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

            const result = await request(app).post("/user").send(userFake)
            
            const tokenFake = `Bearer ${result.body.token}`

            const fieldAltered = { admin: true }

            const { _id } = result.body.result

            const res = await request(app)
                    .put(`/user/${_id}`)
                    .set({ authorization: tokenFake })                
                    .send(fieldAltered)

            expect(res.status).toBe(401)

        })

        it("should change field sended", async () => {

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

            const { _id } = userAdmin.body.result

            const res = await request(app).get(`/user/${_id}`).send()

            expect(res.status).toBe(401)
        })

        it("should return stats 401 when user logged not is a admin", async () => {

            const { _id } = userAdmin.body.result

            const res = await request(app)
                                .put(`/user/${_id}`)
                                .set({ authorization: token })
                                .send()

            expect(res.status).toBe(401)

        })

        it("should return status 200 when user id exist", async () => {

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

        it("should return stats 501 when header without authorization ", async () => {

            const { _id } = userAdmin.body.result

            const res = await request(app).delete(`/user/${_id}`).send()

            expect(res.status).toBe(401)
        })

        it("should return stats 401 when user logged not is a admin", async () => {

            const { _id } = userAdmin.body.result

            const res = await request(app)
                                .delete(`/user/${_id}`)
                                .set({ authorization: token })
                                .send()

            expect(res.status).toBe(401)

        })

        it("should return status 200 when user id exist", async () => {

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

            const idNotExist = "petersonCrazyId"

            const res = await request(app)
                .delete(`/user/${idNotExist}`)
                .set({ authorization: tokenAdmin })                
                .send()

            expect(res.status).toBe(404)
        })
    })

})
