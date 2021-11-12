module.exports = {
  PORT: process.env.PORT || 9000,
  JWT_SECRET: process.env.JWT_SECRET || "shh",
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 6
}
