const yup = require("yup")

const userSchema = yup.object().shape({
  id: yup
    .mixed()
    .oneOf([undefined], "user IDs are handled by the database; do not provide one"),
  username: yup
    .string()
    .trim()
    .required("username and password required")
    .max(32, "username must be less than 32 characters long"),
  password: yup
    .string()
    .trim()
    .required("username and password required")
    .max(64, "password must be less than 64 characters long")
})

module.exports = userSchema
