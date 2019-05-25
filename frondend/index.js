var express = require('express')
var path = require('path')
var app = express()
var resolve = route => path.join(__dirname, '../www', route)

app.all('/', function (req, res)
{
  app.use('/', express.static(resolve('')))
  res.sendFile(resolve('index.html'))
})

app.listen(8088)