const users = [
  {
    username: "johnny-appleseed",
    password: "$2a$06$nxO4uMl5g3D1Oi2Mx4qBG.8XHKpe5Ij1SxcPHGRlcaeKSCBHgJeiS"
  },
  {
    username: "john-henry",
    password: "$2a$06$sR9RG/o1VXk53UhJ18L8/eNSBjB84u.egiGQhJaLqETrx3jIb7ofu"
  },
  {
    username: "paul-bunyan",
    password: "$2a$06$RyXS7EI.rKnDyLrJXWdyTuK.gpEHbKV/9dZ2kjBerWk77YSKn0rJm"
  },
  {
    username: "casey-jones",
    password: "$2a$06$l45Kljuh/5bc.bQY.g0fm.rE.BpldmvCtI6DaGE3QZpfoeqY34AAa"
  }
]

const seed = knex => {
  return knex("users")
    .truncate()
    .then(() => {
      return knex("users").insert(users)
    })
}

module.exports = { seed, users }
