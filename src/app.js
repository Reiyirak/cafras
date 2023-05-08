const express = require('express')
const app = express()

// Serve static files from the 'public' folder
app.use(express.static('public'))

// Set the view engine to ejs
app.set('view engine', 'ejs')

// Define a route that renders an HTML file
// Ruta para la pagina de inicio
app.get('/', (req, res) => {
  res.render('index')
})

// Ruta para la pagina de productos
app.get('/products', (req, res) => {
  res.render('products')
})

// Ruta para el carrito de compras
app.get('/cart', (req, res) => {
  res.render('cart')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/profile', (req, res) => {
  res.render('profile')
})

module.exports = app;

