import '../template/role.scss'
import roleHTML from 'bundle-text:./role.html'
import roleProp from './role.js'
import '../template/emoticard.scss'
import emoticardHTML from 'bundle-text:./emoticard.html'
import emoticardProp from './emoticard.js'

const templates = {
  role: {
    html: roleHTML,
    properties: roleProp
  },
  emoticard: {
    html: emoticardHTML,
    properties: emoticardProp
  }
};
for (let i in templates) {
  templates[i].properties.html = templates[i].html;
  templates[i] = templates[i].properties;
}

export default templates