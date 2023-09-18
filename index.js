const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Node - Express - Respondendo...OK')
})

app.listen(3000)
console.log("http://localhost:3000")