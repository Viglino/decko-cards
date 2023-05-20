import Deck from './card/Deck'
import dialog from './utils/dialog'
import _T from './i18n/i18n'
import element from './utils/element.js'
import templates from './template/templates.js'
import Card from './card/Card.js'

const content = element.create('DIV')
const ul = element.create('DIV', { className: 'list', parent: content })
Object.keys(templates).forEach(k => {
  const c = new Card({ template: k })
  ul.appendChild(c.element)
  c.element.addEventListener('mouseleave', () => {
    info.innerText = ''
  })
  c.element.addEventListener('mouseenter', () => {
    info.innerText = k
  })

  c.element.addEventListener('click', () => {
    dialog.close()
    const deck = new Deck(k);
    deck.addCard();
  })
});
const info = element.create('DIV', { className: 'info', parent: content })

dialog.show({
  title: 'Decko\'cardS',
  className: 'choice',
  html: content,
  buttons: {
    select: _T('about')
  },
  callback: b => {
    const deck = new Deck('emoticard');
    deck.addCard();
  }
})
