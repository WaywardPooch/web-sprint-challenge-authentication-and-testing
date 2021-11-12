const User = require("../users/users-model")

const checkUsernameTaken = async (req, res, next) => {
  const { username } = req.custom_newUser
  const users = await User.filterBy({ username })
  if (users.length !== 0) {
    next({
      status: 400,
      message: "username taken"
    })
  } else {
    next()
  }
}

module.exports = checkUsernameTaken
