const request = require("supertest")

const server = require("./server")
const db = require("../data/dbConfig")

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
    let login
    beforeEach(() => {
      login = { username: "ulfric-stormcloak" }
    })

    it("responds with status code 422 when payload is invalid", async () => {
      const expected = 422
      const res = await request(server).post("/api/auth/register").send(login)
      const actual = res.status
      expect(actual).toBe(expected)
    })
    it("returns 'username and password required' when either is missing", async () => {
      const errorMessage = "username and password required"
      const expected = errorMessage
      const res = await request(server).post("/api/auth/register").send(login)
      const actual = res.body.message
      expect(actual).toBe(expected)
    })
  })
})
