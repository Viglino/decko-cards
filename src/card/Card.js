import '../utils/element'
import element from '../utils/element'
import _T from '../i18n/i18n'
import imageDialog from '../utils/imageDialog'

import './card.css'
import templates from '../template/templates'

function getHTML(t) {
  return t.replace(/\n/g, '<br/>')
}

function calcTranform(elt, transform) {
  const tr = [];
  Object.keys(transform).forEach(k => {
    switch(k) {
      // Initial value
      case 'init': {
        tr.push(transform[k])
        break;
      }
      // Angle
      case 'rotate': 
      case 'skewX': 
      case 'skewY': {
        tr.push(k + '(' + transform[k] + 'deg)')
        break;
      }
      case 'scale': {
        tr.push(k + '(' + transform[k] + ')')
        break;
      }
    }
  })
  elt.style.transform = tr.join(' ');
}

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
    this.properties = JSON.parse(JSON.stringify(template.properties))
    this.style = {};
    // Set parameters
    this.show()
  }
}

Card.prototype.copy = function() {
  const copy = element.create('CARD', { 'data-template': this.element.dataset.template })
  copy.innerHTML = this.element.innerHTML;
  return copy;
}

Card.prototype.show = function() {
  // Card style
  this.borderElt.style.borderColor = this.style.borderColor || '#fff';
  // Card properties
  Object.keys(this.properties).forEach(p => {
    const elt = this.element.querySelector('[data-prop="'+p+'"]')
    const prop = this.properties[p];
    // Visibility
    if (prop.hasOwnProperty('visibility')) {
      if (prop.visibility === false) elt.style.display = 'none';
      else elt.style.display = '';
    }
    elt.dataset.type = prop.type;
    // 
    switch (prop.type) {
      case 'text': 
      case 'emoji': 
      case 'textarea': {
        const content = prop.value !== undefined ? prop.value : _T(prop.default) || ''
        elt.innerHTML = getHTML(content);
        break;
      }
      case 'image': {
        elt.style.backgroundImage = 'url(' + (prop.img !== undefined ? prop.img : prop.default) +')'
        break;
      }
      default: {
        console.warn('[BADTYPE] ', prop.type)
        break;
      }
    }
    if (prop.style) {
      Object.keys(prop.style).forEach(s => {
        switch(s) {
          case 'transform': {
            calcTranform(elt, prop.style[s])
            break;
          }
          case 'backgroundSize': {
            elt.style[s] = prop.style[s] + '%';
            break;
          }
          default: {
            elt.style[s] = prop.style[s];
            break;
          }
        }
      })
    }
  })
}

Card.prototype.getForm = function(elt) {
  elt.innerHTML = '';
  const li = element.create('FIELDSET', {
    html: '<legend>Style</legend>',
    parent: elt
  })

  element.create('LABEL', {
    html: _T('borderColor'),
    parent: li
  })
  //   
  element.create('INPUT', {
    type: 'color',
    value: this.style.borderColor || '#ffffff',
    change: (e) => {
      this.style.borderColor = e.target.value || '#ffffff'
      this.show()
    },
    parent: li
  })
  Object.keys(this.properties).forEach (p => {
    const prop = this.properties[p];
    const li = element.create('FIELDSET', {
      html: '<legend>' + p + '</legend>',
      'data-type': prop.type,
      parent: elt
    })
    // Target element
    const target = this.element.querySelector('[data-prop="'+p+'"]');
    // Visible
    if (prop.hasOwnProperty('visibility')) {
      const label = element.create('LABEL', { className: 'visibility', parent: li })
      element.create('INPUT', {
        type: 'checkbox',
        checked: prop.visibility !== false,
        change: (e) => {
          prop.visibility = e.target.checked;
          if (!e.target.checked) target.style.display = 'none';
          else target.style.display = '';
        },
        parent: label
      })
      element.create('SPAN', { parent: label })
    }
    // Type
    switch (prop.type) {
      case 'text': 
      case 'textarea': {
        element.create(prop.type==='textarea' ? 'TEXTAREA' : 'INPUT', {
          value: prop.value || '',
          type: 'text',
          on: {
            keyup: (e) => {
              prop.value = e.target.value
              const content = getHTML(e.target.value);
              target.innerHTML = content
            }
          },
          parent: li
        })
        break;
      }
      case 'image': {
        const img = element.create('INPUT', {
          type: 'url',
          className: 'image',
          value: prop.value || '',
          change: (e) => {
            prop.value = e.target.value
            target.style.backgroundImage = 'url(' + prop.value +')'
          },
          parent: li
        })
        element.create('BUTTON', {
          className: 'image',
          click: () => {
            imageDialog(url => {
              img.value = url
              img.dispatchEvent(new Event('change'))
            })
          },
          parent: li
        })
        break;
      }
    }
    // Style
    const styles = Object.keys(prop.style || {})
    if (styles.length) {
      const field = element.create('FIELDSET', {
        html: '<legend>Style</legend>',
        parent: li
      })
      styles.forEach(s => {
        const label = (s!=='transform' ? element.create('LABEL', { html: _T(s), parent: field }) : null);
        switch(s) {
          case 'color':
          case 'backgroundColor': {
            element.create('INPUT', {
              type: 'color',
              value: prop.style[s],
              change: (e) => {
                target.style[s] = prop.style[s] = e.target.value
              },
              parent: label
            })
            break;
          }
          case 'backgroundSize': {
            element.create('INPUT', {
              type: 'range',
              className: 'size',
              min: 20,
              max: 200,
              step: 1,
              value: prop.style[s],
              on: {
                input: (e) => {
                  prop.style[s] = e.target.value
                  target.style[s] = prop.style[s] + '%'
                }
              },
              parent: label
            })
            break;
          }
          case 'backgroundPosition': {
            const position = element.create('SELECT', { 
              change: (e) => {
                target.style[s] = prop.style[s] = e.target.value
              },
              parent: label 
            });
            ['top', 'center', 'bottom'].forEach(p => {
              const option = element.create('OPTION', {
                value: p,
                html: _T(p),
                parent: position
              })
              if (prop.style[s] === p) option.selected = 'selected'
            })
            break;
          }
          case 'transform': {
            Object.keys(prop.style.transform).forEach(t => {
              const label = element.create('LABEL', { html: _T(t), parent: field })
              switch(t) {
                case 'scale': {
                  const scale = element.create('INPUT', {
                    type: 'range',
                    min: .5,
                    max: 3,
                    step: .1,
                    value: prop.style.transform[t],
                    on: {
                      input: (e) => {
                        prop.style.transform[t] = e.target.value
                        calcTranform(target, prop.style.transform)
                      }
                    },
                    parent: label
                  })
                  element.create('BUTTON', {
                    html: '↻',
                    className: 'reset',
                    click: () => {
                      scale.value = 1;
                      scale.dispatchEvent(new Event('input'))
                    },
                    parent: label
                  })
                  break;
                }
                case 'skewY': 
                case 'rotate': {
                  const angle = element.create('INPUT', {
                    type: 'range',
                    className: 'angle',
                    min: -10,
                    max: 10,
                    step: .1,
                    value: -1 * prop.style.transform[t],
                    on: {
                      input: (e) => {
                        prop.style.transform[t] = -1 * e.target.value
                        calcTranform(target, prop.style.transform)
                      }
                    },
                    parent: label
                  })
                  element.create('BUTTON', {
                    html: '↻',
                    className: 'reset',
                    click: () => {
                      angle.value = 0;
                      angle.dispatchEvent(new Event('input'))
                    },
                    parent: label
                  })
                  break;
                }
                default: {
                  label.style.display = 'none';
                  break;
                }
              }
            })
            break;
          }
          default: {
            //label.style.display = 'none';
            break;
          }
        }
      })
    }
  })
}

export default Card