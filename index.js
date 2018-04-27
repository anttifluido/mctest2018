const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var loginContoller = require('./controller/login');
const bodyParser = require('body-parser');


const app = express()
app.use(bodyParser);
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))



app.get('/', (req, res) => res.render('pages/index'))
app.get('/edit', (req, res) => {
  res.render('pages/edit');
})


app.get('/save', function(request, response) {
  console.log(request)
})


app.post('/login', (req, res) => loginContoller.login(req, res))
