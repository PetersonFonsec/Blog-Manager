const request = require('supertest')
const userDb = require('../../src/model/user') 
const mockUser = require('../../mock/user') 
const app = require('../../src/server/app')
const bcrypt = require('bcrypt-nodejs')

let user = mockUser

describe('route /user', () => {

    describe('POST', () => {

        beforeEach( async () => { 
            user = mockUser
    
            await userDb.findOneAndDelete({ email: user.email })
        })
    
        it('should return stats 401 when params is invalid', async () => {
            
            const invalidUser = {
                name: user.name,
                password: user.password
            }
    
            const res = await request(app).post('/user').send(invalidUser)
    
            expect(res.status).toBe(401)
        })
    
        it('should return stats 200 when params is valid', async () => {
    
            const res = await request(app).post('/user').send(user)
    
            expect(res.status).toBe(200)
        })
    
        it('should return stats 401 when email exist', async () => {
    
            const resValid = await request(app).post('/user').send(user)
    
            const resInvalid = await request(app).post('/user').send(user)
    
            expect(resInvalid.status).toBe(401)
        })
    
        it('should return token', async () => {
    
            const res = await request(app).post('/user').send(user)
    
            expect(res.body.token).not.toBeUndefined()
        })

        it('password saved should encripted', async () => {

            const userInsered = await request(app).post('/user').send(user)

            const { email } = userInsered.body.result

            const userSaved = await userDb.findOne({ email }).select('+password')
            
            const passwordEncripited = bcrypt.hashSync( user.password , bcrypt.genSaltSync(10)) 

            expect(userSaved.password).not.toEqual(passwordEncripited)
        })
    })


    describe('GET', () => {

        it('should return an array', async () => {

            const res = await request(app).get('/user').send({})
            
            const isArray = Array.isArray(res.body.result)

            expect(isArray).toBe(true)
        })
    
        it('should an array without field password', async () => {

            await request(app).post('/user').send(user)

            const res = await request(app).get('/user').send()

            const firstUser = res.body.result[0]

            expect(firstUser.password).toBeUndefined()
        })

    })

})

describe('route /user/admin', () => {

    describe('POST', () => {

        let userLogged = false

        beforeEach( async () => { 
            user = mockUser

            await userDb.findOneAndDelete({ email: user.email })

            if(!userLogged) userLogged = await request(app).post('/user').send(user)
        })

        afterEach( async () => await userDb.findOneAndDelete({ email: user.email }) )

        it('should return stats 401 when params is invalid', async () => {

            const token = `Bearer ${userLogged.body.token}`

            const invalidUser = {
                name: user.name,
                password: user.password
            }

            const res = await request(app)
                                .post('/User/admin')
                                .set({ authorization: token })
                                .send(invalidUser)

            expect(res.status).toBe(401)
        })

        it('should return stats 200 when params is valid', async () => {
    
            const token = `Bearer ${userLogged.body.token}`

            const res = await request(app)
                .post('/User/admin')
                .set({ authorization: token })                
                .send(user)

            expect(res.status).toBe(200)
        })

        it('should return stats 401 when email exist', async () => {
            
            const token = `Bearer ${userLogged.body.token}`

            const resValid = await request(app)
                .post('/User/admin')
                .set({ authorization: token })
                .send(user)

            const resInvalid = await request(app)
                .post('/User/admin')
                .set({ authorization: token })
                .send(user)

            expect(resInvalid.status).toBe(401)
        })

        it('should return token', async () => {

            const token = `Bearer ${userLogged.body.token}`

            const res = await request(app)
                .post('/User/admin')
                .set({ authorization: token })
                .send(user)
    
            expect(res.body.token).not.toBeUndefined()
        })

        it('password saved should encripted', async () => {

            const token = `Bearer ${userLogged.body.token}`

            const userInsered = await request(app)
                .post('/User/admin')
                .set({ authorization: token })
                .send(user)

            const { email } = userInsered.body.result

            const userSaved = await userDb.findOne({ email }).select('+password')
            
            const passwordEncripited = bcrypt.hashSync( user.password , bcrypt.genSaltSync(10)) 

            expect(userSaved.password).not.toEqual(passwordEncripited)
        })
    })

})

describe('route /user/:id', () => {

    describe('POST', () => {

        let userLogged = false

        beforeEach( async () => { 
            user = mockUser

            await userDb.findOneAndDelete({ email: user.email })

            if(!userLogged) userLogged = await request(app).post('/user').send(user)
        })

        afterEach( async () => await userDb.findOneAndDelete({ email: user.email }) )

        it('should return stats 401 when params is invalid', async () => {

            const token = `Bearer ${userLogged.body.token}`

            const invalidUser = {
                name: user.name,
                password: user.password
            }

            const res = await request(app)
                                .post('/User/admin')
                                .set({ authorization: token })
                                .send(invalidUser)

            expect(res.status).toBe(401)
        })

        it('should return stats 200 when params is valid', async () => {
    
            const token = `Bearer ${userLogged.body.token}`

            const res = await request(app)
                .post('/User/admin')
                .set({ authorization: token })                
                .send(user)

            expect(res.status).toBe(200)
        })

        it('should return stats 401 when email exist', async () => {
            
            const token = `Bearer ${userLogged.body.token}`

            const resValid = await request(app)
                .post('/User/admin')
                .set({ authorization: token })
                .send(user)

            const resInvalid = await request(app)
                .post('/User/admin')
                .set({ authorization: token })
                .send(user)

            expect(resInvalid.status).toBe(401)
        })

        it('should return token', async () => {

            const token = `Bearer ${userLogged.body.token}`

            const res = await request(app)
                .post('/User/admin')
                .set({ authorization: token })
                .send(user)
    
            expect(res.body.token).not.toBeUndefined()
        })

        it('password saved should encripted', async () => {

            const token = `Bearer ${userLogged.body.token}`

            const userInsered = await request(app)
                .post('/User/admin')
                .set({ authorization: token })
                .send(user)

            const { email } = userInsered.body.result

            const userSaved = await userDb.findOne({ email }).select('+password')
            
            const passwordEncripited = bcrypt.hashSync( user.password , bcrypt.genSaltSync(10)) 

            expect(userSaved.password).not.toEqual(passwordEncripited)
        })
    })

})
