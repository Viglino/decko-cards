// Roles
import '../template/role.scss'
import roleHTML from 'bundle-text:./role.html'
import roleProp from './role.js'
// Emoticards
import '../template/emoticard.scss'
import emoticardHTML from 'bundle-text:./emoticard.html'
import emoticardProp from './emoticard.js'
// Badge
import '../template/badge.scss'
import badgeHTML from 'bundle-text:./badge.html'
import badgeProp from './badge.js'

const templates = {
  role: {
    html: roleHTML,
    properties: roleProp
  },
  emoticard: {
    html: emoticardHTML,
    properties: emoticardProp
  },
  badge: {
    html: badgeHTML,
    properties: badgeProp
  }
};
for (let i in templates) {
  templates[i].properties.html = templates[i].html;
  templates[i] = templates[i].properties;
}

export default templates