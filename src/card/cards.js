import { saveAs } from 'file-saver';
import element from '../utils/element';
import Card from './Card'
import _T from '../i18n/i18n'

const cardElt = document.getElementById('card');
const formElt = document.getElementById('form');

const cards = [];
let current;

/* Card list */
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

/* Add a new card */
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


/* Select a card */
function selectCard(c) {
  // Udate current
  if (current) {
    current.li.innerHTML = '';
    current.li.appendChild(current.card.copy())
    cards.forEach(c => delete c.li.dataset.select)
  }
  // Reset
  cardElt.innerHTML = '';
  formElt.innerHTML = '';
  // New selection
  current = c;
  if (!current) return; 
  c.li.dataset.select = ''
  cardElt.appendChild(c.card.element)


  // Font / back
  const fback = element.create('BUTTON', {
    className: 'fback',
    click: () => {
      cardElt.dataset.face = formElt.dataset.face = cardElt.dataset.face === 'back' ? 'front' : 'back'
    },
    parent: cardElt
  })
  element.create('SPAN', {
    html: _T('front'),
    className: 'front',
    parent: fback
  })
  element.create('SPAN', {
    html: _T('back'),
    className: 'back',
    parent: fback
  })

  // Duplicate selection
  element.create('BUTTON', {
    html: _T('duplicate'),
    className: 'duplicate',
    click: () => {
      addCard(current.card)
    },
    parent: cardElt
  })

  // Remove selection
  element.create('BUTTON', {
    html: _T('delete'),
    className: 'delete',
    click: () => {
      removeCard(current)
    },
    parent: cardElt
  })
  
  // Save
  element.create('BUTTON', {
    html: _T('save'),
    className: 'save',
    click: () => {
      const save = { cards: [] };
      cards.forEach(c => save.cards.push(JSON.parse(c.card.export())))
      var blob = new Blob([JSON.stringify(save)], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "card.card");
    },
    parent: cardElt
  })
  
  c.card.getForm(formElt)
}

addCard()

export default cards