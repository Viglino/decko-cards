import element from '../utils/element';
import Card from './Card'


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

function addCard() {
  const card = new Card ({
    template: 'role'
  })
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
  // New selection
  current = c;
  c.li.dataset.select = ''
  document.getElementById('card').innerHTML = '';
  document.getElementById('card').appendChild(c.card.element)
  c.card.getForm(document.getElementById('form'))
}

export default cards