define({ "api": [
  {
    "type": "get",
    "url": "/user",
    "title": "Read data for user",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "object",
            "description": "<p>containing an array of users</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n       \"result\": [\n           {\n               \"avatar\": \"avatar-default\",\n               \"_id\": \"5da496053e2c520d2e5c4109\",\n               \"name\": \"peterson\",\n               \"email\": \"peterson@tests.com\"\n           },\n           {\n               \"avatar\": \"avatar-default\",\n               \"_id\": \"5da496503e2c520d2e5c410a\",\n               \"name\": \"peterson\",\n               \"email\": \"petersonfonsca@tests.com\"\n           }\n       ]\n   }",
          "type": "Json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user.js",
    "groupTitle": "User",
    "name": "GetUser"
  },
  {
    "type": "get",
    "url": "/userLogged",
    "title": "Read data for user logged",
    "group": "UserLogged",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>with Token for user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization",
          "content": "{ \n \"Authorization\" : \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw\" \n}",
          "type": "Json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Object",
            "description": "<p>with fields avatar, name, email and _id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n {\n               \"result\": \n                   {\n                       \"avatar\": \"avatar-default\",\n                       \"_id\": \"5da496053e2c520d2e5c4109\",\n                       \"name\": \"peterson\",\n                       \"email\": \"peterson@tests.com\"\n                   }\n           }",
          "type": "Json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user.js",
    "groupTitle": "UserLogged",
    "name": "GetUserlogged"
  },
  {
    "type": "post",
    "url": "/userLogged",
    "title": "valid password for user logged",
    "group": "UserLogged",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "{ ",
          "content": "{ \n    password: \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>with Token for user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization",
          "content": "{ \n \"Authorization\" : \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw\" \n}",
          "type": "Json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return",
            "description": "<p>a String</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{ msg : 'ok' }",
          "type": "Json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user.js",
    "groupTitle": "UserLogged",
    "name": "PostUserlogged"
  },
  {
    "type": "put",
    "url": "/userLogged",
    "title": "update data for user logged",
    "group": "UserLogged",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>with fields avatar, name, email and _id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n               \"result\": {\n                   \"avatar\": \"avatar-default\",\n                   \"_id\": \"5da5bbd2eb028026b6efeaed\",\n                   \"name\": \"peterson fonseca\",\n                   \"email\": \"Peterson@test.com\",\n                   \"admin\": false,\n                   \"__v\": 0\n               }\n           }",
          "type": "Json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "{\n  \"name\" : \"peterson fonseca\"\n}",
          "type": "Json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>with Token for user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization",
          "content": "{ \n \"Authorization\" : \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw\" \n}",
          "type": "Json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user.js",
    "groupTitle": "UserLogged",
    "name": "PutUserlogged"
  },
  {
    "type": " Post ",
    "url": "/userlogged/changepassword",
    "title": "",
    "group": "UserLogged",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "{ ",
          "content": "{ \n    password: \"123456789\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>with Token for user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization",
          "content": "{ \n \"Authorization\" : \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw\" \n}",
          "type": "Json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return",
            "description": "<p>a String</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n               \"msg\": \"ok\"\n           }",
          "type": "Json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user.js",
    "groupTitle": "UserLogged",
    "name": "_post_UserloggedChangepassword"
  },
  {
    "type": "post",
    "url": "/user",
    "title": "Create a new user",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email for user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nome",
            "description": "<p>nome for user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password for user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input ",
          "content": "{\n           \"avatar\": \"avatar-default\",\n           \"_id\": \"5da496053e2c520d2e5c4109\",\n           \"name\": \"peterson\",\n           \"email\": \"peterson@tests.com\"\n       }",
          "type": "Json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>with fields avatar, name, email and _id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n           \"result\": {\n               \"avatar\": \"avatar-default\",\n               \"_id\": \"5da5bbd2eb028026b6efeaed\",\n               \"name\": \"peterson\",\n               \"email\": \"Peterson@test.com\",\n               \"password\": \"$2a$10$fPvik9bqaK8PO7/42H/f2eDzWTcPAxqiAkLIZ.5FE396tPUUrTFJi\",\n               \"admin\": false,\n               \"__v\": 0\n           },\n           \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw\"\n       }",
          "type": "Json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user.js",
    "groupTitle": "User",
    "name": "PostUser"
  },
  {
    "type": "post",
    "url": "/user/admin",
    "title": "Create new user admin",
    "group": "User_Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "{ ",
          "content": "{ \n    password: \"123456789\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>with Token for user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization",
          "content": "{ \n \"Authorization\" : \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGE1YmJkMmViMDI4MDI2YjZlZmVhZWQiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MTE0MjYxMCwiZXhwIjoxNTcxMTQ4NjEwfQ.zhvS6bcxd-ov-B5Ky_7YkfYlKCfA2xIIvbe_hveJYiw\" \n}",
          "type": "Json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "return",
            "description": "<p>a String</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n{\n              \"msg\": \"ok\"\n          }",
          "type": "Json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/user.js",
    "groupTitle": "User_Admin",
    "name": "PostUserAdmin"
  }
] });
