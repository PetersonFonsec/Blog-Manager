const Article = require('../api/article')
const { validToken } = require('../api/auth')

module.exports = app => {

    const { create, findByBlogs, updateOne, removeOne, findOne, addLike } = Article

    app.route('/article')
        .all(validToken)
        /**
        * @api {get} /article Find all article
        * @apiGroup Article
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
        .get(findByBlogs)
        /**
        * @api {post} /article Create new article
        * @apiGroup Article
        * @apiParam { String } title
        * @apiParam { String } blog
        * @apiParam { String } description
        * @apiParam { String } content
        * @apiParam { String } photo
        * @apiParamExample 
        *  { 
        *      title: "Shanks",
        *      blog: "123456789",
        *      description: "melhor personagem de one piece",
        *      content: "<h1>Shanks</h1>",
        *      photo: "123456789"
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
        .post(create)

    app.route('/article/:id')
        .all(validToken)
        /**
        * @api {get} /article/:id Read data for unique article
        * @apiGroup Article
        * @apiParam {id} Id for article
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
        .get(findOne)
        /**
        * @api {post} /article/:id Give Like in article
        * @apiGroup Article
        * @apiParam {id} Id for article
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
        .post(addLike)
        /**
        * @api {put} /article/:id Update data for article
        * @apiGroup Article
        * @apiParam {id} Id for article
        * @apiParam { String } title
        * @apiParam { String } blog
        * @apiParam { String } description
        * @apiParam { String } content
        * @apiParam { String } photo
        * @apiParamExample 
        *  { 
        *      title: "Shanks",
        *      blog: "123456789",
        *      description: "melhor personagem de one piece",
        *      content: "<h1>Shanks</h1>",
        *      photo: "123456789"
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
        .put(updateOne)
        /**
        * @api {delete} /article/:id Give Like
        * @apiGroup Article
        * @apiParam {id} Id for article
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
        .delete(removeOne)
}