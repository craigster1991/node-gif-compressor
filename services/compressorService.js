const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

const compressIt = (data, resolve, reject) => {
  const filePath = path.resolve(__dirname, `../uploads/${data.filename}`)
  // const outputName = gs(data.filename).replace('.gif', '_compressed.gif')
  const outputPath = path.resolve(__dirname, `../public/compressions/${data.filename}`)
  const colours = data.colours == 'same' ? '' : `-k ${data.colours} `
  exec(`./gifsicle -O3 --lossy=${data.compression} ${colours}-o ${outputPath} ${filePath}`, err => {
    if (err) return reject(err)
    return resolve(data.filename)
  })
}

module.exports = {
  compressGif: data => {
    return new Promise((resolve, reject) => {
      switch(process.platform) {
        case "darwin":
          compressIt(data, resolve, reject)
          break
        case "win32":
          reject('This only works on OSX currently!')
          break
        case "linux":
          reject('This only works on OSX currently!')
          break
        default:
          reject('This only works on OSX currently!')
          break
      }
    })
  },
  fileSize: file => {
    const stats = fs.statSync(path.resolve(__dirname, `../public/compressions/${file}`))
    return stats.size / 1000000.0
  }
}