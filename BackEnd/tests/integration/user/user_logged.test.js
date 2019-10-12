const request = require('supertest')
const userDb = require('../../../src/model/user')
const app = require('../../../src/server/app')

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

let userAdmin, userLogged, token = false

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

describe('route /userLogged', () => {

    describe("GET", () => {

        it("should return an object with fields name, email and avatar", async () => {

            const res = await request(app)
                    .get("/userLogged")
                    .set({ authorization : token })
                    .send({})

            const user = res.body.result

            const { email, name, avatar } = user

            expect(email).not.toBeUndefined()
            expect(name).not.toBeUndefined()
            expect(avatar).not.toBeUndefined()

        })
        
        it("should return stats 401 when header without authorization ", async () => {
            
            const response = await request(app).get("/userLogged").send({})

            expect(response.status).toBe(401)
        })

        it('should return a error when not send header authorization', async () =>{
            
            const response = await request(app).get("/userLogged").send({})

            const menssageError = response.body.error

            expect(menssageError).not.toBeUndefined()
        })

    })

    describe("POST", () => {
        
        it("should return stats 401 when header without authorization ", async () => {
            
            const response = await request(app).post("/userLogged").send({})

            expect(response.status).toBe(401)
        })

        it('should return a error when not send header authorization', async () =>{
            
            const response = await request(app).post("/userLogged").send({})

            const menssageError = response.body.error

            expect(menssageError).not.toBeUndefined()
        })

        it('should return status 401 when not send the current password', async () =>{

            const response = await request(app).post("/userLogged").send({})

            const menssageError = response.body.error

            expect(menssageError).not.toBeUndefined()

        })

        it('should return status 200 when send corret passoword', async () =>{

            const response = await request(app)
                .post("/userLogged")
                .set({ authorization: token })
                .send({
                password: user.password
            })

            expect(response.status).toBe(200)

        })

    })

    describe("PUT", () => {

        it("should return stats 401 when header without authorization ", async () => {
            
            const response = await request(app).post("/userLogged").send({})

            expect(response.status).toBe(401)
        })

        it('should return a error when not send header authorization', async () =>{
            
            const response = await request(app).post("/userLogged").send({})

            const menssageError = response.body.error

            expect(menssageError).not.toBeUndefined()
        })

    })
})