
//requiring path and fs modules
const fs = require('fs');

function scanDir(dir, copy) {
  const files = {}
  fs.readdirSync('./assets/img/' + dir, {withFileTypes: true}).forEach(file => {
    if (!file.isDirectory()) {
      if(/\.json$/.test(file.name)) {
        const id = file.name.replace(/.json$/,'')
        if (!files[id]) files[id] = {}
        files[id].json = true;
      }
      if(/\.svg$/.test(file.name)) {
        const id = file.name.replace(/.svg$/,'')
        if (!files[id]) files[id] = {}
        files[id].svg = true;
      }
    }
  });
  Object.keys(files).forEach(f => {
    const file = files[f]
    if (file.svg && !file.json) {
      fs.writeFileSync('./assets/img/' + dir + '/' + f + '.json', JSON.stringify({
        "author": copy || "Viglino",
        "url": "https://github.com/Viglino/decko-cards",
        "copy": "CC-by-SA"
      }, null, '  '));
      //console.log('./assets/img/' + dir + '/' + f + '.json')
    }
  })
}

scanDir(process.argv[2], process.argv[3])
