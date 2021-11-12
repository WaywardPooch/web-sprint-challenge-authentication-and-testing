const User = require("../users/users-model")

const checkUsernameExists = async (req, res, next) => {
  const { username } = req.custom_user
  const users = await User.filterBy({ username })
  if (users.length === 0) {
    next({
      status: 401,
      message: "invalid credentials"
    })
  } else {
    req.custom_existingUser = users[0]
    next()
  }
}

const checkUsernameTaken = async (req, res, next) => {
  const { username } = req.custom_user
  const users = await User.filterBy({ username })
  if (users.length !== 0) {
    next({
      status: 401,
      message: "username taken"
    })
  } else {
    next()
  }
}

module.exports = {
  checkUsernameExists,
  checkUsernameTaken
}
