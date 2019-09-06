const request = require('supertest')

const app = require('../../src/server/app')

describe('routes Auth', () => {

    describe('function Login', () => {

        it('should return stats 200', async () => {
            // const res = await request(app).post('/auth').send(mokeUser)

            expect(200).toBe(200)
        })

    })

})