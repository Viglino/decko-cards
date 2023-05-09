import '../template/role.scss'
import roleHTML from 'bundle-text:./role.html'
import roleProp from './role.js'

const templates = {
  role: {
    html: roleHTML,
    properties: roleProp
  }
};
for (let i in templates) {
  templates[i].properties.html = templates[i].html;
  templates[i] = templates[i].properties;
}

export default templates