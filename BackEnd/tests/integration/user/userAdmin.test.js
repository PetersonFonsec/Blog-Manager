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

let userAdmin, userLogged, tokenAdmin, token = false

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


describe("route /user/admin", () => {

    describe("POST", () => {

        it("should return stats 401 when params is invalid", async () => {

            const res = await request(app)
                                .post("/user/admin")
                                .set({ authorization: token })
                                .send(invalidUser)

            expect(res.status).toBe(401)
        })

        it("should return stats 401 when header without authorization ", async () => {

            const res = await request(app).post("/user/admin").send(invalidUser)

            expect(res.status).toBe(401)

        })

        it("should return stats 200 when params is valid", async () => {

            const res = await request(app)
                .post("/user/admin")
                .set({ authorization: tokenAdmin })                
                .send(newUser)

            expect(res.status).toBe(200)
        })

        it("should return stats 401 when email exist", async () => {
            
            const resInvalid = await request(app)
                .post("/user/admin")
                .set({ authorization: token })
                .send(user)

            expect(resInvalid.status).toBe(401)
        })

        it("should return token", async () => {

            const res = await request(app)
                .post("/user/admin")
                .set({ authorization: tokenAdmin })
                .send(newUser)

            expect(res.body.token).not.toBeUndefined()
        })

        it("password saved should encripted", async () => {

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