const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/edit', (req, res) => res.render('pages/edit'))
  .get('/save', function(request, responsefromWeb) {
    console.log(request);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
