const userSchema = require("../users/user-schema")

const validateUserPayload = async (req, res, next) => {
  try {
    const payload = req.body
    const validatedPayload = await userSchema.validate(payload)
    req.custom_newUser = validatedPayload
    next()
  } catch (err) {
    next({
      status: 400,
      message: err.errors[0]
    })
  }
}

module.exports = validateUserPayload
