const userValid = {
    name: "Peterson Comum",
    email: "Peterson@comum.com",
    password: "123456"
}

const invalidUser = {
    name: userValid.name,
    password: userValid.password,
    email: "Fake@Gmail.com"
}

const userFake = {
    name: "Peterson F. Fake",
    email: "Peterson@fake.com",
    password: "123456"
}

const userAdmin = {
    name: "Peterson Admin",
    email: "Peterson@admin.com",
    password: "123456"
}

const newUser = {
    email: "newUser@mock.com",
    password: "123456",
    name: "User Fulano"
}


module.exports = { userValid, userFake, userAdmin, invalidUser, newUser}