const express = require('express')
const app = express()

// Serve static files from the 'public' folder
app.use(express.static('public'))

// Set the view engine to ejs
app.set('view engine', 'ejs')

// Define a route that renders an HTML file
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/menu', (req, res) => {
  res.render('menu')
})

app.get('/acerca', (req, res) => {
  res.render('acerca')
})


app.get('/domi', (req, res) => {
  res.render('domicilio')
})

module.exports = app;
