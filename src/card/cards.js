import Card from './Card'

const card = new Card ({
  template: 'role',
  parent: document.getElementById('card')
})

card.getForm(document.getElementById('form'))
