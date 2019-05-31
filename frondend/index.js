var express = require('express')
var path = require('path')
var app = express()
var env = require('../env')
var resolve = route => path.join(__dirname, '../www', route)

app.all('/', function (req, res)
{
  app.use('/', express.static(resolve('')))
  res.sendFile(resolve('index.html'))
})
console.log(`server start run at port:${env.port}`)
app.listen(env.port || 8088)