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
const info = element.create('DIV', { className: 'dialogInfo', parent: content })
const file = element.create('DIV', {
  className: 'file',
  parent: content
})
const load = element.create('INPUT', { 
  type: 'file',
  change: (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const json = JSON.parse(e.target.result)
      new Deck(json.template, json.cards);
      dialog.close();
    };
    reader.readAsText(load.files[0]);
  },
  parent: file
})
element.create('LABEL', {
  html: _T('loadfile'),
  parent: file
})
file.addEventListener('dragenter', e => {
  e.stopPropagation();
  e.preventDefault();
  file.dataset.drop = ''
}, false);
file.addEventListener('dragleave', e => {
  e.stopPropagation();
  e.preventDefault();
  delete file.dataset.drop
}, false);

dialog.show({
  title: 'Decko\'cardS',
  className: 'choice',
  html: content,
  buttons: {
    select: _T('about')
  },
  callback: b => {
    dialog.replay()
  }
})
