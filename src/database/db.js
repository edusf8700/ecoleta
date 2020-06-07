const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db

db.serialize(() => {
  //db.run(`DROP TABLE IF EXISTS places`)

  db.run(`CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    image TEXT,
    address TEXT,
    address2 TEXT,
    city TEXT,
    state TEXT,
    items TEXT
  )`)

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
    "Papersider",
    "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "Guilherme Gembalia, Jardim América",
    "N° 260",
    "Santa Catarina",
    "Rio do Sul",
    "Resíduos Eletrônicos e Lâmpadas"
  ]

  function afterInsertData(err) {
    if (err) {
      return console.log(err)
    }
    console.log("Cadastrado com sucesso")
    console.log(this)
  }

  //db.run(query, values, afterInsertData)

  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err)
    }
    console.log("Aqui estam seus registros:")
    console.log(rows)
  })
 
  // db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   console.log("Registro deletado com sucesso!")
  // })

 })
