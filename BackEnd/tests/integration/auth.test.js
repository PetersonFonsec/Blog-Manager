const request = require("supertest")

const newUser = {
    email: "newUserAuth@mock.com",
    password: "123456",
    name: "User Fulano"
}

const app = require("../../src/server/app")

describe("routes Auth", () => {

    describe("POST", () => {

        it("should return stats 401 when user not exist", async () => {
            
            await request(app).post("/user").send(newUser)

            const res = await request(app).post("/auth").send({
                password: newUser.password,
                email: "newUserFail@mock.com",
            })

            expect(res.status).toBe(401)
        })

        it("should return stats 200 when user exist", async () => {

            await request(app).post("/user").send(newUser)

            const { password, email } = newUser

            const res = await request(app).post("/auth").send({ password, email })

            expect(res.status).toBe(200)
        })

       
    })

})