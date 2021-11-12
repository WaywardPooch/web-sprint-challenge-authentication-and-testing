// Libraries
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

// Custom Middleware
const logger = require("./middleware/logger")
const restrict = require("./middleware/restricted")
const handleError = require("./middleware/handle-error")

// Routers
const authRouter = require("./auth/auth-router")
const jokesRouter = require("./jokes/jokes-router")

// Server Instantiation
const server = express()

// Middleware Application
server.use(helmet())
server.use(cors())
server.use(express.json())

server.use(logger)

server.use('/api/auth', authRouter)
server.use('/api/jokes', restrict, jokesRouter) // only logged-in users should have access!

server.use(handleError)

// Server Export
module.exports = server
