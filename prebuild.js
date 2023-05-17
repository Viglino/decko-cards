
//requiring path and fs modules
const path = require('path');
const fs = require('fs');

const files = [];

function scanDir(dir) {
  fs.readdirSync('./assets/img' + dir, {withFileTypes: true}).forEach(file => {
    if (file.isDirectory()) {
      scanDir(dir + '/' + file.name)
    } else {
      if(/\.json$/.test(file.name)) {
        let data = fs.readFileSync('./assets/img' + dir + '/' + file.name);
        const json = JSON.parse(data)
        json.title = file.name.replace(/.json$/,'')
        json.file = json.file || (json.title + '.svg')
        json.path = './img' + dir +'/'
        const keypath = dir.split('/');
        keypath.shift()
        json.keywords = (json.keywords || []).concat(keypath)
        files.unshift(json)
      }
    }
  });
}

scanDir('')

fs.writeFileSync('./src/images.js', `// List of files in assets/img
export default `+JSON.stringify(files, null, '  '));
