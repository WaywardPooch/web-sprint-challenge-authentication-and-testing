const db = require("../../data/dbConfig")

const getAll = async () => {
  const users = await db("users")
  return users
}

const getById = async (id) => {
  const user = await db("users")
    .where({ id })
    .first()
  return user
}

const add = async (user) => {
  const [id] = await db("users")
    .insert(user)
  const newUser = getById(id)
  return newUser
}

module.exports = {
  getAll,
  getById,
  add
}
