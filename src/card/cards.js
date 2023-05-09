import element from '../utils/element';
import Card from './Card'
import _T from '../i18n/i18n'

const cards = [];
let current;

const menu = document.getElementById('cards')
element.create('BUTTON', { 
  html: '+',
  click: () => {
    addCard()
  },
  parent: menu 
})
const cardList = element.create('UL', { parent: menu })

function removeCard(card) {
  const index = cards.indexOf(card)
  cards.splice(index, 1);
  card.li.remove()
  selectCard(cards[index-1] || cards[index]);
}

function addCard(card) {
  if (card) {
    card = card.clone()
  } else {
    card = new Card ({
      template: 'role'
    })
  }
  const c = {
    li: element.create('LI', {
      html: card.copy(),
      click: () => {
        selectCard(c)
      },
      parent: cardList
    }),
    card: card
  }
  cards.push(c)
  selectCard(c);
}

function selectCard(c) {
  // Udate current
  if (current) {
    current.li.innerHTML = '';
    current.li.appendChild(current.card.copy())
    cards.forEach(c => delete c.li.dataset.select)
  }
  // Reset
  document.getElementById('card').innerHTML = '';
  document.getElementById('form').innerHTML = '';
  // New selection
  current = c;
  if (!current) return; 
  c.li.dataset.select = ''
  document.getElementById('card').appendChild(c.card.element)

  // Duplicate selection
  element.create('BUTTON', {
    html: _T('duplicate'),
    className: 'duplicate',
    click: () => {
      addCard(current.card)
    },
    parent: document.getElementById('card')
  })

  // Remove selection
  element.create('BUTTON', {
    html: _T('delete'),
    className: 'delete',
    click: () => {
      removeCard(current)
    },
    parent: document.getElementById('card')
  })
  
  c.card.getForm(document.getElementById('form'))
}

addCard()

export default cards