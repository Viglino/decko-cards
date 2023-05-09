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
    this.render()
  }
}

/** Create a new card based on this card
 * @returns {Card}
 */
Card.prototype.clone = function() {
  const c = new Card();
  c.properties = JSON.parse(JSON.stringify(this.properties))
  c.style = JSON.parse(JSON.stringify(this.style))
  c.render()
  return c;
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
        elt.style.backgroundImage = 'url(' + (prop.value !== undefined ? prop.value : prop.default) +')'
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
          case 'backgroundPositionX':
          case 'backgroundPositionY': {
            if (typeof(prop.style[s]) === 'number') elt.style[s] = prop.style[s] + '%';
            else elt.style[s] = prop.style[s];
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
      this.borderElt.style.borderColor = this.style.borderColor || '#fff';
    },
    parent: li
  })
  // Card properties
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
          case 'backgroundPositionX':
          case 'backgroundPositionY': {
            if (typeof(prop.style[s]) === 'number') {
              element.create('INPUT', {
                type: 'range',
                className: 'size',
                min: -100,
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
            } else {
              const position = element.create('SELECT', { 
                change: (e) => {
                  target.style[s] = prop.style[s] = e.target.value
                },
                parent: label 
              });
              const positions = (s === 'backgroundPositionX' ? ['left', 'center', 'right'] : ['top', 'center', 'bottom'])
              positions.forEach(p => {
                const option = element.create('OPTION', {
                  value: p,
                  html: _T(p),
                  parent: position
                })
                if (prop.style[s] === p) option.selected = 'selected'
              })
            }
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