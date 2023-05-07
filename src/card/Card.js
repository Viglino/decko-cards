import '../utils/element'
import element from '../utils/element'
import _T from '../i18n/i18n'

import './card.css'
import templates from '../template/templates.js'

/** Card class
 */
class Card {
  constructor(options) {
    options = options || {};
    const tmp = templates[options.templates] ? options.templates : 'role';
    const template = templates[tmp];
    this.element = element.create('CARD', {
      html: template.html,
      parent: options.parent
    })
    this.element.dataset.template = tmp;
    // border
    this.borderElt = element.create('DIV', {
      className: 'border',
      parent: this.element
    })
    // Properties
    this.style = {};
    this.properties = {}
    for (let p in template.properties) {
      this.properties[p] = Object.assign(template.properties[p])
    }
    // Set parameters
    this.show(options.properties)
  }
}

Card.prototype.show = function() {
  this.borderElt.style.borderColor = this.style.borderColor || '#fff';
  for (p in this.properties) {
    const elt = this.element.querySelector('[data-prop="'+p+'"]')
    const prop = this.properties[p];
    switch (prop.type) {
      case 'text': 
      case 'emoji': 
      case 'textarea': {
        const content = prop.value !== undefined ? prop.value : _T(prop.default) || ''
        elt.innerHTML = content.replace('\n', '<br/>');
        if (!content) elt.style.display = 'none';
        else elt.style.display = '';
      }
      case 'image': {
        elt.style.backgroundImage = 'url(' + (prop.img !== undefined ? prop.img : prop.default) +')'
      }
    }
  }
}

Card.prototype.getForm = function(elt) {
  elt.innerHTML = '';
  const ul = element.create('UL', { parent: elt })
  const li = element.create('LI', { parent: ul })
  element.create('LABEL', {
    html: _T('borderColor'),
    parent: li
  })
  element.create('INPUT', {
    value: this.style.borderColor || '',
    change: (e) => {
      this.style.borderColor = e.target.value || '#f00'
      this.show()
    },
    parent: li
  })
  Object.keys(this.properties).forEach (p => {
    const prop = this.properties[p];
    switch (prop.type) {
      case 'text': 
      case 'emoji': 
      case 'textarea': {
        const li = element.create('LI', { parent: ul })
        element.create('LABEL', {
          html: p,
          parent: li
        })
        const target = this.element.querySelector('[data-prop="'+p+'"]');
        element.create(prop.type==='textarea' ? 'TEXTAREA' : 'INPUT', {
          value: prop.value || '',
          on: {
            keyup: (e) => {
              prop.value = e.target.value
              const content = e.target.value.replace('\n', '<br/>');
              target.innerHTML = content
              if (!content) target.style.display = 'none';
              else target.style.display = '';
            }
          },
          parent: li
        })
      }
    }
  })
}

export default Card