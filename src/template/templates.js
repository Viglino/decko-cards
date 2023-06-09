// Roles
import '../template/role.scss'
import roleHTML from 'bundle-text:./role.html'
import roleProp from './role.js'
// Stickers
import '../template/planning-poker.scss'
import stickerHTML from 'bundle-text:./planning-poker.html'
import stickerProp from './planning-poker.js'
// Emoticards
import '../template/emoticard.scss'
import emoticardHTML from 'bundle-text:./emoticard.html'
import emoticardProp from './emoticard.js'
// Planning poker
import '../template/planning-poker.scss'
import planningPokerHTML from 'bundle-text:./planning-poker.html'
import planningPokerProp from './planning-poker.js'
// Badge
import '../template/badge.scss'
import badgeHTML from 'bundle-text:./badge.html'
import badgeProp from './badge.js'
// Stickers
import '../template/sticker.scss'
import stickerHTML from 'bundle-text:./sticker.html'
import stickerProp from './sticker.js'

const templates = {
  role: {
    html: roleHTML,
    properties: roleProp
  },
  'planning-poker': {
    html: planningPokerHTML,
    properties: planningPokerProp
  },
  emoticard: {
    html: emoticardHTML,
    properties: emoticardProp
  },
  badge: {
    html: badgeHTML,
    properties: badgeProp
  },
  sticker: {
    html: stickerHTML,
    properties: stickerProp
  }
};
for (let i in templates) {
  templates[i].properties.html = templates[i].html;
  templates[i] = templates[i].properties;
  templates[i].id = i
}

export default templates