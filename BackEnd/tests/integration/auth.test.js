const request = require("supertest")
const userDb = require("../../src/model/user")

const newUser = {
    email: "newUserAuth@mock.com",
    password: "123456",
    name: "User Fulano"
}

const app = require("../../src/server/app")

let userLogged, token = null

beforeAll( async () => {

    const res = await request(app).post("/user").send(newUser)

    userLogged = res.body.result

    token = res.body.token
})

afterAll( async () => {

    const users = await userDb.find({})
    
    users.forEach( async user => await userDb.findByIdAndDelete(user._id) )

})

describe("routes Auth", () => {

    describe("POST", () => {

        it("should return stats 401 when user not exist", async () => {
            
            const res = await request(app)
                .post("/auth")
                .send({
                    password: newUser.password,
                    email: "newUserFail@mock.com",
                })

            expect(res.status).toBe(401)
        })

        it("should return stats 200 when user exist", async () => {

            const { password, email } = newUser

            const res = await request(app)
                .post("/auth")
                .send({ password, email })

            expect(res.status).toBe(200)
        })

    })

})

describe("routes validtoken", () =>{

    describe("GET", () => {

        it("Should return status 401 when field authorization not sended", async () =>{

            const response = await request(app)
                .get('/validtoken')
                .send()

            expect(response.status).toBe(401)

        })

        it("Should return status 401 when without prefix Bearer", async () =>{

            const response = await request(app)
                .get('/validtoken')
                .set({ authorization: token })
                .send()

            expect(response.status).toBe(401)

        })

        it("Should return status 200 when send prefix Bearer and token valid", async () =>{

            const response = await request(app)
                .get('/validtoken')
                .set({ authorization: `Bearer ${token}` })
                .send()

            expect(response.status).toBe(200)

        })

    })

})