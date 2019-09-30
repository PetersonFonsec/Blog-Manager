const request = require("supertest")
const userDb = require("../../../src/model/user") 
const mockUser = require("../../../mock/user") 
const app = require("../../../src/server/app")
const bcrypt = require("bcrypt-nodejs")

const user = mockUser

const adminParams = {
    name: "Peterson Admin",
    email: "Peterson@admin.com",
    password: "123456"
}

let userAdmin, userLogged, tokenAdmin = false

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