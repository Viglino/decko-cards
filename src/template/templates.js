// Roles
import '../template/role.scss'
import roleHTML from 'bundle-text:./role.html'
import roleProp from './role.js'
// Emoticards
import '../template/emoticard.scss'
import emoticardHTML from 'bundle-text:./emoticard.html'
import emoticardProp from './emoticard.js'
// Peuxpas
import '../template/peuxpas.scss'
import peuxpasHTML from 'bundle-text:./peuxpas.html'
import peuxpasProp from './peuxpas.js'

const templates = {
  role: {
    html: roleHTML,
    properties: roleProp
  },
  emoticard: {
    html: emoticardHTML,
    properties: emoticardProp
  },
  peuxpas: {
    html: peuxpasHTML,
    properties: peuxpasProp
  }
};
for (let i in templates) {
  templates[i].properties.html = templates[i].html;
  templates[i] = templates[i].properties;
}

export default templates