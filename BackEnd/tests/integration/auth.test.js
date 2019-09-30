const request = require("supertest")
const userDb = require("../../src/model/user") 
const mockUser = require("../../mock/user") 

const user = mockUser

const app = require("../../src/server/app")

describe("routes Auth", () => {

    describe("POST", () => {

        it("should return stats 401 when user not exist", async () => {
            const newUser = {
                email: "newUserAuth@mock.com",
                password: "123456",
                name: "User Fulano"
            }

            await request(app).post("/user").send(newUser)

            const res = await request(app).post("/auth").send({
                password: newUser.password,
                email: "newUserFail@mock.com",
            })

            await userDb.findOneAndRemove({ email : newUser.email})

            expect(res.status).toBe(401)
        })

        it("should return stats 200 when user exist", async () => {

            const newUser = {
                email: "newUserAuth@mock.com",
                password: "123456",
                name: "User Fulano"
            }

            await request(app).post("/user").send(newUser)

            const res = await request(app).post("/auth").send({
                password: newUser.password,
                email: newUser.email,
            })

            await userDb.findOneAndRemove({ email : newUser.email})

            expect(res.status).toBe(200)
        })

       
    })

})