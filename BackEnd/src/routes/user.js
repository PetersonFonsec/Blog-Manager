const User = require('../api/user')

const { userAdmin, validToken } = require('../api/auth')

const auth = require('../api/auth')

module.exports = app => {
    const { validPasswordUserLogged } = auth

    const { create, find, updateOne, removeOne, changePassword } = User

    const { findOne, createAdmin, findUserLogged, updateLogged } = User

    app.route('/user')
    /**
     * @api {get} /user Read data for user
     * @apiGroup User
     * @apiSuccess { Object } object containing an array of users
     * @apiSuccessExample { Json } Sucesso
     *      HTTP/1.1 200 OK
     *      {
            "result": [
                {
                    "avatar": "avatar-default",
                    "_id": "5da496053e2c520d2e5c4109",
                    "name": "peterson",
                    "email": "peterson@tests.com"
                },
                {
                    "avatar": "avatar-default",
                    "_id": "5da496503e2c520d2e5c410a",
                    "name": "peterson",
                    "email": "petersonfonsca@tests.com"
                }
            ]
        }
    */
        .get( find )
    /**
     * @api {post} /user Create a new user
     * @apiGroup User
     * @apiParam { String } email email for user
     * @apiParam { String } nome nome for user
     * @apiParam { String } password password for user
     * @apiParamExample { Json } Input 
     *  {
            "avatar": "avatar-default",
            "_id": "5da496053e2c520d2e5c4109",
            "name": "peterson",
            "email": "peterson@tests.com"
        }
     * @apiSuccess { Object } Object with fields avatar, name, email and _id
     * @apiSuccessExample { Json } Sucesso
     *      HTTP/1.1 200 OK
     *      {
                "result": {
                    "avatar": "avatar-default",
                    "_id": "5da5bbd2eb028026b6efeaed",
                    "name": "peterson",
                    "email": "Peterson@test.com",
                    "password": "$2a$10$fPvik9bqaK8PO7/42H/f2eDzWTcPAxqiAkLIZ.5FE396tPUUrTFJi",
                    "admin": false,
                    "__v": 0
                },
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw"
            }
     */
        .post( create )

    app.route('/userLogged')
        .all( validToken )
        /**
         * @api {get} /userLogged Read data for user logged
         * @apiGroup UserLogged
         * @apiHeader { String } Authorization with Token for user
         * @apiHeaderExample { Json } Authorization
         * { 
         *  "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw" 
         * }
         * @apiSuccess { String } Object with fields avatar, name, email and _id         
         * @apiSuccessExample { Json } Sucesso
         *      HTTP/1.1 200 OK
         *       {
                    "result": 
                        {
                            "avatar": "avatar-default",
                            "_id": "5da496053e2c520d2e5c4109",
                            "name": "peterson",
                            "email": "peterson@tests.com"
                        }
                }
        */
        .get( findUserLogged )
        /**
         * @api {put} /userLogged  update data for user logged
         * @apiGroup UserLogged
         * @apiSuccess { Object } Object with fields avatar, name, email and _id
         * @apiParam { String } avatar
         * @apiParam { String } name
         * @apiParam { String } email
         * @apiParamExample { Json } 
         * {
         *   "name" : "peterson fonseca"
         * }
         * @apiHeader { String } Authorization with Token for user
         * @apiHeaderExample { Json } Authorization
         * { 
         *  "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw" 
         * }
         * @apiSuccessExample { Json } Sucesso
         *      HTTP/1.1 200 OK
         *      {
                    "result": {
                        "avatar": "avatar-default",
                        "_id": "5da5bbd2eb028026b6efeaed",
                        "name": "peterson fonseca",
                        "email": "Peterson@test.com",
                        "admin": false,
                        "__v": 0
                    }
                }
        */
        .put( updateLogged )
        /**
         * @api {post} /userLogged valid password for user logged
         * @apiGroup UserLogged
         * @apiParam { String } password
         * @apiParamExample 
         *  { 
         *      password: "123456"
         *  }
         * @apiHeader { String } Authorization with Token for user
         * @apiHeaderExample { Json } Authorization
         * { 
         *  "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw" 
         * }
         * @apiSuccess { String } return a String
         * @apiSuccessExample { Json } Sucesso
         *      HTTP/1.1 200 OK
         *      { msg : 'ok' }
         
        */
        .post( validPasswordUserLogged )

    app.route('/userlogged/changepassword')
        .all( validToken )
         /**
         * @api { Post } /userlogged/changepassword
         * @apiGroup UserLogged
         * @apiParam { String } password
         * @apiParamExample 
         *  { 
         *      password: "123456789"
         *  }
         * @apiHeader { String } Authorization with Token for user
         * @apiHeaderExample { Json } Authorization
         * { 
         *  "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw" 
         * }
         * @apiSuccess { String } return a String
         * @apiSuccessExample { Json } Sucesso
         *      HTTP/1.1 200 OK
         *      {
                    "msg": "ok"
                }
        */
        .put( changePassword )
    
    app.route('/user/admin')
        .all( validToken )
        /**
        * @api {post} /user/admin Create new user admin
        * @apiGroup User Admin
        * @apiParam { String } password
        * @apiParamExample 
        *  { 
        *      password: "123456789"
        *  }
        * @apiHeader { String } Authorization with Token for user
        * @apiHeaderExample { Json } Authorization
        * { 
        *  "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw" 
        * }
        * @apiSuccess { String } return a String
        * @apiSuccessExample { Json } Sucesso
        *      HTTP/1.1 200 OK
        *      {
                   "msg": "ok"
               }
       */
        .post( createAdmin )

    app.route('/user/:id')
        .all( validToken )
        /**
            * @api {put} /user/:id Update anyone user
            * @apiGroup User Admin
            * @apiPermission admin access rights needed.
            * @apiParam { id } id for User will update
            * @apiParam { String } avatar
            * @apiParam { String } name
            * @apiParam { String } email
            * @apiParamExample { Json } 
            * {
            *   "name" : "peterson fonseca"
            * }
            * @apiHeader { String } Authorization with Token for user
            * @apiHeaderExample { Json } Authorization
            * { 
            *  "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw" 
            * }
            * @apiSuccess { String } return a String
            * @apiSuccessExample { Json } Sucesso
            *      HTTP/1.1 200 OK
            *      {
                    "msg": "ok"
                }
        */
        .put( userAdmin(updateOne) )
        /**
            * @api {delete} /user/:id delete anyone user
            * @apiGroup User Admin
            * @apiPermission admin access rights needed.
            * @apiParam { id } id for User will update
            * @apiHeader { String } Authorization with Token for user
            * @apiHeaderExample { Json } Authorization
            * { 
            *  "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw" 
            * }
            * @apiSuccess { String } return a String
            * @apiSuccessExample { Json } Sucesso
            *      HTTP/1.1 200 OK
            *      {
                    "msg": "ok"
                }
        */
        .delete( userAdmin(removeOne) )
        /**
            * @api {get} /user/:id Read data for anyone user
            * @apiGroup User Admin
            * @apiPermission admin access rights needed.
            * @apiParam { id } id for User will update
            * @apiHeader { String } Authorization with Token for user
            * @apiHeaderExample { Json } Authorization
            * { 
            *  "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw" 
            * }
            * @apiSuccess { String } return a String
            * @apiSuccessExample { Json } Sucesso
            *      HTTP/1.1 200 OK
            *      {
                    "msg": "ok"
                }
        */
        .get( userAdmin(findOne) )
}