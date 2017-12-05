const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

module.exports = {
  compressGif: data => {
    return new Promise((resolve, reject) => {
      const filePath = path.resolve(__dirname, `../uploads/${data.filename}`)
      // const outputName = gs(data.filename).replace('.gif', '_compressed.gif')
      const outputPath = path.resolve(__dirname, `../public/compressions/${data.filename}`)
      const colours = data.colours == 'same' ? '' : `-k ${data.colours} `
      exec(`./gifsicle -O3 --lossy=${data.compression} ${colours}-o ${outputPath} ${filePath}`, err => {
        if (err) return reject(err)
        return resolve(data.filename)
      })
    })
  },
  fileSize: file => {
    const stats = fs.statSync(path.resolve(__dirname, `../public/compressions/${file}`))
    return stats.size / 1000000.0
  }
}