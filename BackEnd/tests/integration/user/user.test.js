const request = require("supertest")
const userDb = require("../../../src/model/user")
const app = require("../../../src/server/app")
const bcrypt = require("bcrypt-nodejs")

const user = {
    name: "Peterson Comum",
    email: "Peterson@comum.com",
    password: "123456"
}

const adminParams = {
    name: "Peterson Admin",
    email: "Peterson@admin.com",
    password: "123456"
}

const invalidUser = {
    name: user.name,
    password: user.password
}

const newUser = {
    email: "newUser@mock.com",
    password: "123456",
    name: "User Fulano"
}

let userAdmin, userLogged = false

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

describe("route /user", () => {

    describe("POST", () => {
    
        it("should return stats 401 when params is invalid", async () => {
           
            const res = await request(app).post("/user").send(invalidUser)
    
            expect(res.status).toBe(401)
        })
    
        it("should return stats 200 when params is valid", async () => {
            
            const res = await request(app).post("/user").send(newUser)

            await userDb.findByIdAndRemove(res.body.result._id)

            expect(res.status).toBe(200)
        })
    
        it("should return stats 401 when email exist", async () => {
    
            const resInvalid = await request(app).post("/user").send(user)
    
            expect(resInvalid.status).toBe(401)
        })
    
        it("should return token", async () => {

            const res = await request(app).post("/user").send(newUser)

            expect(res.body.token).not.toBeUndefined()
        })

        it("password saved should encripted", async () => {

            const userInsered = await request(app).post("/user").send(newUser)

            const { email } = userInsered.body.result

            const userSaved = await userDb.findOne({ email }).select("+password")
            
            const passwordEncripited = bcrypt.hashSync( user.password , bcrypt.genSaltSync(10)) 

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