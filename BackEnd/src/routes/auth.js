const auth = require('../api/auth')

module.exports = app => {

    /**
        * @api {post} /auth Login
        * @apiGroup Auth
        * @apiParam { String } email for User
        * @apiParam { String } password for User
        * @apiParamExample 
        * {
        *   "email": "Peterson@test.com",
	    *   "password": "123456789"
        * }
        * @apiSuccess { String } return a String
        * @apiSuccessExample { Json } Sucesso
        *      HTTP/1.1 200 OK
        *     {
                "result": {
                    "avatar": "avatar-default",
                    "_id": "5da5bbd2eb028026b6efeaed",
                    "name": "peterson fonseca",
                    "email": "Peterson@test.com",
                    "password": "$2a$10$OpTamLunqNbXn26Z3zpm0uA9OkDujE5J72krMOA6rSgIUaauYmHva",
                    "admin": false,
                    "__v": 0
                },
             
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0Nzc3OSwiZXhwIjoxNTcxMTUzNzc5fQ.vqMO5k9FdNVMEJDXiOg8HIntgoTiFpAqGNuD5ImxZ7M"
            
            }
    */
    app.post('/auth', auth.Login )

    app.route('/validtoken')
        .all(auth.validToken)
        /**
            * @api {get} /validtoken Valid Toke for user
            * @apiGroup Auth
            * @apiHeader { String } Authorization with Token for user
            * @apiHeaderExample { Json } Authorization
            * { 
            *  "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw" 
            * }
            * @apiSuccess { String } return a String "Token valido"
            * @apiSuccessExample { Json } Sucesso
            *   HTTP/1.1 200 OK
            *   {
                    "msg": "Token valido"
                }
        */
        .get((req, res) => 
            res.status(200).send({ msg: 'Token valido'}) 
        )
}