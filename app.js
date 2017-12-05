const express = require('express')
const bodyParser = require('body-parser')

const compressor = require('./services/compressorService')

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  if ('OPTIONS' == req.method) return res.send(200)
  next()
}

const app = express()
app.enable('trust proxy')
app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

const UploadController = require('./controllers/UploadController')

app.get('/', (req,res) => res.render(`${__dirname}/views/index.ejs`))
app.post('/upload', (req, res) => {
  UploadController.upload(req, res)
  .then(compressor.compressGif)
  .then(outputName => res.render(`${__dirname}/views/preview.ejs`, {
    gif: `/compressions/${outputName}`,
    filesize: compressor.fileSize(outputName)
  }))
  .catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
})

const port = process.env.PORT || 1337
app.listen(port, () => console.log(`app listening on port ${port}!`))