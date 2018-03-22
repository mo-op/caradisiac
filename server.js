const bodyParser = require('body-parser')
const express = require('express')
const app = express();
const populate = require('./api/routes/populate')
const suv = require('./api/routes/suv')

app.use(bodyParser.json())

// const router = express.Router()

app.get('/populate', (req, res) => {
  populate.addInElastic((err, results) => {
    res.json(results);
  })
})

app.get('/suv', (req, res) => {
  suv.getSuv((err, results) => {
    res.json(results)
  })
})

const port = 3000
app.listen(port, () => {
  console.log("Listening on port " + port);
})