const handleError = (err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message || "Oh, d-d-d-dear!"
  })
}

module.exports = handleError
