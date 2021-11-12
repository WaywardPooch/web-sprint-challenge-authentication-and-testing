const request = require("supertest")

const server = require("./server")
const db = require("../data/dbConfig")
const jokesData = require("./jokes/jokes-data")

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
  expect(1 + 5).toBe(6)
})

describe("[POST] /api/auth/register", () => {
  describe("success", () => {
    let login
    beforeEach(() => {
      login = { username: "ulfric-stormcloak", password: "high-king-of-skyrim" }
    })

    it("responds with status code 201 when payload is valid", async () => {
      const expected = 201
      const res = await request(server).post("/api/auth/register").send(login)
      const actual = res.status
      expect(actual).toBe(expected)
    })
    it("returns the newly created user on success", async () => {
      const newUser = { id: 5, username: "ulfric-stormcloak" }
      const expected = newUser
      const res = await request(server).post("/api/auth/register").send(login)
      const actual = res.body
      expect(actual).toMatchObject(expected)
    })
  })
  describe("failure", () => {
    it("responds with status code 422 when payload is invalid", async () => {
      const expected = 422
      const login = { username: "ulfric-stormcloak" }
      const res = await request(server).post("/api/auth/register").send(login)
      const actual = res.status
      expect(actual).toBe(expected)
    })
    it("returns 'username and password required' when either is missing", async () => {
      const expected = "username and password required"
      const login = { username: "ulfric-stormcloak" }
      const res = await request(server).post("/api/auth/register").send(login)
      const actual = res.body.message
      expect(actual).toBe(expected)
    })
    it("returns 'username taken' when desired username already exists", async () => {
      const expected = "username taken"
      const login = { username: "john-henry", password: "was-a-mighty-man" }
      const res = await request(server).post("/api/auth/register").send(login)
      const actual = res.body.message
      expect(actual).toBe(expected)
    })
  })
})

describe("[POST] /api/auth/login", () => {
  describe("success", () => {
    let login
    beforeEach(() => {
      login = { username: "john-henry", password: "henry" }
    })

    it("responds with status code 200 when credentials are valid", async () => {
      const expected = 200
      const res = await request(server).post("/api/auth/login").send(login)
      const actual = res.status
      expect(actual).toBe(expected)
    })
    it("returns a welcome message and token on success", async () => {
      const welcomeMessage = "welcome, john-henry"
      const res = await request(server).post("/api/auth/login").send(login)
      expect(res.body.message).toBe(welcomeMessage)
      expect(res.body).toHaveProperty("token")
    })
  })
  describe("failure", () => {
    let login
    beforeEach(() => {
      login = { username: "paul-bunyan", password: "badwrong" }
    })

    it("responds with status code 401 when credentails are invalid", async () => {
      const expected = 401
      const res = await request(server).post("/api/auth/login").send(login)
      const actual = res.status
      expect(actual).toBe(expected)
    })
    it("returns 'invalid credentials' when credentials are invalid", async () => {
      const expected = "invalid credentials"
      const res = await request(server).post("/api/auth/login").send(login)
      const actual = res.body.message
      expect(actual).toBe(expected)
    })
  })
})

describe("[GET] /api/jokes", () => {
  describe("success", () => {
    let headers
    beforeEach(async () => {
      const loginRes = await request(server).post("/api/auth/login")
        .send({ username: "johnny-appleseed", password: "appleseed" })
      headers = { Authorization: loginRes.body.token }
    })

    it("responds with status code 200 when authenticated", async () => {
      const expected = 200
      const res = await request(server).get("/api/jokes").set(headers)
      const actual = res.status
      expect(actual).toBe(expected)
    })
    it("returns all dad jokes from the database", async () => {
      const expected = [...jokesData]
      const res = await request(server).get("/api/jokes").set(headers)
      const actual = res.body
      expect(actual).toEqual(expected)
    })
  })
  describe("failure", () => {
    it("responds with status code 401 when token is missing/invalid", async () => {
      const expected = 401
      const res = await request(server).get("/api/jokes")
      const actual = res.status
      expect(actual).toBe(expected)
    })
    it("returns 'token required' when token is missing", async () => {
      const expected = "token required"
      const res = await request(server).get("/api/jokes")
      const actual = res.body.message
      expect(actual).toBe(expected)
    })
    it("returns 'token invalid' when token is invalid", async () => {
      const expected = "token invalid"
      const res = await request(server).get("/api/jokes")
        .set({ Authorization: "jeremy-soule-is-a-musical-genius" })
      const actual = res.body.message
      expect(actual).toBe(expected)
    })
  })
})
