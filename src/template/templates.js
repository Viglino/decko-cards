import '../template/role.scss'
import roleHTML from '../template/role-template.html'
import roleProp from '../template/role.js'

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
console.log(templates)

export default templates