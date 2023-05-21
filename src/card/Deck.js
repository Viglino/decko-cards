import { saveAs } from 'file-saver';
import element from "../utils/element";
import _T from '../i18n/i18n'
import Card from "./Card";

const cardElt = document.getElementById('card');
const formElt = document.getElementById('form');
const menu = document.getElementById('cards')

/** Deck class
 */
class Deck {
  constructor(template) {
    this.cards = [];
    this.current = undefined;
    this.template = template

    /* Card list */
    menu.innerHTML = '';
    element.create('BUTTON', { 
      html: '+',
      click: () => {
        this.addCard()
      },
      parent: menu 
    })
    this.cardList = element.create('UL', { parent: menu })
  }
}

/** Remove a card from deck */
Deck.prototype.removeCard = function(card) {
  const index = this.cards.indexOf(card)
  this.cards.splice(index, 1);
  card.li.remove()
  this.selectCard(this.cards[index-1] || this.cards[index]);
}

/** Add a new card */
Deck.prototype.addCard = function(card) {
  const cards = this.cards;
  if (card) {
    card = card.clone()
  } else {
    card = new Card ({
      template: this.template
    })
  }
  const c = {
    li: element.create('LI', {
      html: card.copy(),
      'data-pos': this.cards.length,
      parent: this.cardList
    }),
    card: card
  }
  this.cards.push(c)
  this.selectCard(c);
  // Move card
  function onmove(e) {
    let elt = document.elementFromPoint(e.clientX, e.clientY)
    while ((elt = elt.parentElement) && elt.tagName !== 'CARD');
    if (elt && elt.parentElement.tagName == 'LI') {
      const lhover = elt.parentElement
      if (lhover !== c.li) {
        const pos = parseInt(c.li.dataset.pos);
        const npos = parseInt(lhover.dataset.pos);
        if (pos == npos-1 || pos == npos+1) {
          if (pos == npos-1) {
            lhover.parentNode.insertBefore(lhover, c.li)
          } else {
            lhover.parentNode.insertBefore(c.li, lhover)
          }
          lhover.dataset.pos = pos
          c.li.dataset.pos = npos
          cards[pos] = cards[npos]
          cards[npos] = c
        }
      }
    }
  }
  function onup() {
    document.removeEventListener('pointermove', onmove)
    document.removeEventListener('pointerup', onup)
  }
  c.li.addEventListener('pointerdown', e => {
    e.preventDefault();
    this.selectCard(c)
    document.addEventListener('pointermove', onmove)
    document.addEventListener('pointerup', onup)
  })
}


/* Select a card */
Deck.prototype.selectCard = function(c) {
  // Udate current
  if (this.current) {
    this.current.li.innerHTML = '';
    this.current.li.appendChild(this.current.card.copy())
    this.cards.forEach(c => delete c.li.dataset.select)
  }
  // Reset
  cardElt.innerHTML = '';
  formElt.innerHTML = '';
  // New selection
  this.current = c;
  if (!this.current) return; 
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
      this.addCard(this.current.card)
    },
    parent: cardElt
  })

  // Remove selection
  element.create('BUTTON', {
    html: _T('delete'),
    className: 'delete',
    click: () => {
      this.removeCard(this.current)
    },
    parent: cardElt
  })
  
  // Save
  element.create('BUTTON', {
    html: _T('save'),
    className: 'save',
    click: () => { this.save() },
    parent: cardElt
  })
  
  c.card.getForm(formElt)
}

/** Save the deck */
Deck.prototype.save = function() {
  const save = { cards: [] };
  this.cards.forEach(c => save.cards.push(JSON.parse(c.card.export())))
  var blob = new Blob([JSON.stringify(save)], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "card.card");
}

export default Deck
