const request = require("supertest")
const userDb = require("../../src/model/user") 
const mockUser = require("../../mock/user") 

const user = mockUser

const app = require("../../src/server/app")

beforeEach( async () => { 
    await request(app).post("/user").send(user)
})

afterEach( async () => { 
    await userDb.findOneAndRemove({ email: user.email }) 
})

describe("routes Auth", () => {

    describe("POST", () => {

        it("should return stats 401 when user not exist", async () => {

            const res = await request(app).post("/auth").send({
                password: user.password,
                email: user.email,
            })

            expect(res.status).toBe(401)
        })

        it("should return stats 200 when user not exist", async () => {

            const res = await request(app).post("/auth").send({
                password: user.password,
                email: user.email,
            })

            expect(res.status).toBe(200)
        })

       
    })

})