import '../utils/element'
import element from '../utils/element'
import _T from '../i18n/i18n'
import imageDialog from '../utils/imageDialog'

import './card.css'
import templates from '../template/templates'

function getHTML(t) {
  return t.replace(/\n/g, '<br/>')
}

function resetButton(elt, val, parent) {
  element.create('BUTTON', {
    html: '↻',
    className: 'reset',
    title: 'reset',
    click: () => {
      elt.value = val;
      elt.dispatchEvent(new Event('input'))
    },
    parent: parent
  })
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
    const tmp = templates[options.template] ? options.template : 'role';
    const template = templates[tmp];
    this.element = element.create('CARD', {
      html: template.html,
      className: template.className || '',
      parent: options.parent
    })
    this.element.dataset.template = tmp;
    // border
    this.borderElt = element.create('DIV', {
      className: 'border',
      parent: this.element.querySelector('front')
    })
    this.backElt = element.create('DIV', {
      className: 'border',
      parent: this.element.querySelector('back')
    })
    // Properties
    this.format = template.format || 'small';
    this.properties = JSON.parse(JSON.stringify(options.properties || template.properties))
    this.back = JSON.parse(JSON.stringify(options.back || template.back))
    this.style = JSON.parse(JSON.stringify(options.style || template.style || {}));
    // Set parameters
    this.render()
  }
}

Card.prototype.export = function() {
  return JSON.stringify({
    className: this.element.className,
    format: this.format,
    template: this.element.dataset.template,
    properties: this.properties,
    back: this.back,
    style: this.style
  })
}

/** Create a new card based on this card
 * @returns {Card}
 */
Card.prototype.clone = function() {
  const c = new Card({
    template: this.getTemplate(),
    properties: this.properties,
    back: this.back,
    style: this.style
  });
  c.render()
  return c;
}

Card.prototype.getTemplate = function() {
  return this.element.dataset.template
}

/** Returns an HTML copy of the card
 * @return {Element}
 */
Card.prototype.copy = function() {
  const copy = this.element.cloneNode();
  copy.innerHTML = this.element.innerHTML;
  return copy;
}

/** Render the card */
Card.prototype.render = function() {
  document.body.dataset.format = this.format || 'small'
  this.element.dataset.format = this.format || 'small'
  // Card style
  this.element.style.color = this.style.borderColor || '#fff';
  this.borderElt.style.color = this.style.borderColor || '#fff';
  // Back style
  this.backElt.style.backgroundColor = this.style.backColor || '#fff';
  this.backElt.style.color = this.style.hatchColor || '#fff';
  this.backElt.dataset.hatch = this.style.hach
  // Card properties
  this.renderProp(this.properties)
  this.renderProp(this.back)
}

/* Render card properties */
Card.prototype.renderProp = function(properties) {

  Object.keys(properties).forEach(p => {
    const elt = this.element.querySelector('[data-prop="'+p+'"]')
    if (!elt) return;
    const prop = properties[p];
    // Visibility
    if (prop.hasOwnProperty('visibility')) {
      if (prop.visibility === false) elt.style.display = 'none';
      else elt.style.display = '';
    }
    elt.dataset.type = prop.type;
    elt.dataset.alt = prop.altVal;
    // 
    switch (prop.type) {
      case 'text': 
      case 'textarea': {
        const content = prop.value !== undefined ? prop.value : _T(prop.default) || ''
        elt.innerHTML = '';
        const txt = element.create('P', { style: { fontSize: prop.fontSize + 'em' }, parent: elt })
        txt.innerHTML = getHTML(content);
        break;
      }
      case 'image': {
        elt.innerHTML = '';
        const img = element.create('IMG', { parent: elt })
        img.src = (prop.value !== undefined ? prop.value : prop.default || '')
        break;
      }
      case 'lineh': {
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
          case 'img_top':
          case 'img_left':
          case 'img_width': {
            elt.querySelector('img').style[s.replace('img_','')] = prop.style[s] + '%';
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

/* Get card form */
Card.prototype.getForm = function(elt) {
  elt.innerHTML = '';
  const front = element.create('FRONT', { parent: elt })

  const li = element.create('FIELDSET', {
    html: '<legend>Style</legend>',
    parent: front
  })

  // Global properties
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
      this.element.style.color = this.borderElt.style.color = this.style.borderColor || '#fff';
    },
    parent: li
  })
  // Card properties
  this.getFromProperties(this.properties, front)

  // Back 
  const back = element.create('BACK', { parent: elt })

  const liback = element.create('FIELDSET', {
    html: '<legend>Style</legend>',
    parent: back
  })

  const hach = element.create('SELECT', { 
    change: () => {
      this.backElt.dataset.hatch = this.style.hach = hach.value
    },
    parent: liback 
  });
  ['solid', 'hatch', 'cross'].forEach(s => {
    element.create('OPTION', { value: s, html: _T(s), parent: hach })
  })
  
  //   
  element.create('INPUT', {
    type: 'color',
    value: this.style.backColor || '#ffffff',
    change: (e) => {
      this.style.hatchColor = e.target.value || '#ffffff'
      this.backElt.style.color = this.style.hatchColor || '#fff';
    },
    parent: liback
  })
  element.create('INPUT', {
    type: 'color',
    value: this.style.backColor || '#ffffff',
    change: (e) => {
      this.style.backColor = e.target.value || '#ffffff'
      this.backElt.style.backgroundColor = this.style.backColor || '#fff';
    },
    parent: liback
  })
  
  this.getFromProperties(this.back || {}, back)
}

Card.prototype.getFromProperties = function(properties, elt) {
  // Card properties
  Object.keys(properties).forEach (p => {
    const prop = properties[p];
    const li = element.create('FIELDSET', {
      'data-type': prop.type,
      parent: elt
    })
    if (prop.collapse) li.dataset.collapse = '';
    else delete li.dataset.collapse;
    const leg = element.create ('LEGEND', { html: '<i class="expand"></i>' + _T(p), parent: li })
    // Expand
    leg.querySelector('i').addEventListener('click', () => {
      prop.collapse = !prop.collapse;
      if (prop.collapse) li.dataset.collapse = '';
      else delete li.dataset.collapse;
    })

    // Target element
    const target = this.element.querySelector('[data-prop="'+p+'"]');
    // Type
    switch (prop.type) {
      case 'text': 
      case 'textarea': {
        element.create(prop.type==='textarea' ? 'TEXTAREA' : 'INPUT', {
          value: prop.value || '',
          placeholder: _T(p),
          type: 'text',
          on: {
            keyup: (e) => {
              prop.value = e.target.value
              const content = getHTML(e.target.value);
              target.querySelector('p').innerHTML = content
            }
          },
          parent: li
        })
        break;
      }
      case 'image': {
        element.create('BUTTON', {
          className: 'image',
          click: () => {
            imageDialog(img.value, url => {
              img.value = url
              img.dispatchEvent(new Event('change'))
            })
          },
          parent: li
        })
        const img = element.create('INPUT', {
          type: 'url',
          className: 'image',
          placeholder: 'http://',
          value: prop.value || '',
          change: (e) => {
            prop.value = e.target.value
            target.querySelector('IMG').src = prop.value
          },
          parent: li
        })
        break;
      }
    }
    // ClassName
    if (prop.alt) {
      const alt = element.create('SELECT', {
        className: 'alt',
        change: () => {
          prop.altVal = target.dataset.alt = alt.value
        },
        parent: li
      })
      prop.alt.forEach(c => {
        const opt = element.create('OPTION', { 
          value: c, 
          html: c, 
          parent: alt
        });
        if (prop.altVal === c) opt.selected = true
      })
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
          case 'borderColor':
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
          case 'img_rotate': {
            const angle = element.create('INPUT', {
              type: 'range',
              className: 'angle',
              min: -180,
              max: 180,
              step: .1,
              value: prop.style[s],
              on: {
                input: (e) => {
                  prop.style[s] = e.target.value
                  target.querySelector('img').style.transform = 'translate(-50%, -50%) rotate('+prop.style[s]+'deg)'
                }
              },
              parent: label
            })
            resetButton(angle, 0, label)
            break;
          }
          case 'img_top':
          case 'img_left':
          case 'img_width': {
            element.create('INPUT', {
              type: 'range',
              className: 'size',
              min: /width/.test(s) ? 20 : -200,
              max: /width/.test(s) ? 200 : 300,
              value: prop.style[s],
              on: {
                input: (e) => {
                  prop.style[s] = e.target.value
                  target.querySelector('img').style[s.replace('img_','')] = prop.style[s] + '%'
                }
              },
              parent: label
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
                  resetButton(scale, 1, label)
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
                  resetButton(angle, 0, label)
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