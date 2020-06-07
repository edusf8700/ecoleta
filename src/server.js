const express = require("express");
const nunjucks = require("nunjucks")

const server = express();
const db = require("./database/db")

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

server.get("/", (req, res) => {
  return res.render("index.html")
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
  console.log(req.body)

    const query = `INSERT INTO places (
    name,
    image,
    address,
    address2,
    city,
    state,
    items
  ) values (?,?,?,?,?,?,?)`

  const values = [
    req.body.name,
    req.body.image,
    req.body.address,
    req.body.address2,
    req.body.city,
    req.body.state,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      return console.log(err)
    }
    console.log("Cadastrado com sucesso")
    console.log(this)
    return res.send("ok")
  }
  
  db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err)
    }
    
    const total = rows.length

    return res.render("search-results.html", { places: rows, total})
  })

  
})

server.listen(3000);