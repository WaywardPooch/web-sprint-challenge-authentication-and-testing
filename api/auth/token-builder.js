const jwt = require("jsonwebtoken")

const { JWT_SECRET } = require("../../config")

const buildToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: "1d",
  }
  const signedToken = jwt.sign(payload, JWT_SECRET, options)
  return signedToken
}

module.exports = buildToken
