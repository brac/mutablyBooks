// jshint asi:true

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

// set 'html' as the engine, using ejs's renderFile function
var ejs = require('ejs');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.get('/', (request, response) => {
  response.render('index')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
