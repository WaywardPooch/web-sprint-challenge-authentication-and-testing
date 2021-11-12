const logger = (req, res, next) => {
  const now = new Date()
  const date = now.toDateString()
  const time = now.toTimeString()

  console.log(`
    ==============================
      METHOD: ${req.method}
    ENDPOINT: ${req.originalUrl}
        DATE: ${date}
        TIME: ${time}
    ==============================
  `)

  next()
}

module.exports = logger
