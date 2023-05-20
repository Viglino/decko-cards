import element from "./element"

import './dialog.scss'

/** Dialog
 * 
 */
class Dialog {
  constructor(options) {
    this.element = {};
    this.element.back = element.create('DIV', {
      'data-role': 'dialog',
      parent: document.body
    })
    this.element.form = element.create('FORM', { 
      on: {
        submit: e => {
          e.preventDefault();
        }
      },
      parent: this.element.back 
    })
    this.element.title = element.create('H2', { html: 'title', parent: this.element.form })
    element.create('DIV', { 
      className:'closebox', 
      html: '&times;',
      click: () => {
        this.close();
      },
      parent: this.element.form 
    })
    this.element.content = element.create('DIV', { className:'content', parent: this.element.form })
    this.element.buttons = element.create('DIV', { className: 'buttons', parent: this.element.form })
    this.close()
    document.body.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.close();
    })
  }
  /** Close
   */
  close() {
    this.element.back.dataset.hidden = ''
  }
  /** Close
   */
  show(options) {
    //
    this.element.title.innerHTML = options.title
    this.element.back.className = options.className || ''
    // content
    this.element.content.innerHTML = '';
    if (options.html instanceof Node) {
      this.element.content.appendChild(options.html)
    } else {
      this.element.content = options.html
    }
    // Buttons
    this.element.buttons.innerHTML = '';
    Object.keys(options.buttons).forEach(b => {
      element.create('BUTTON', {
        html: options.buttons[b],
        click: () => {
          if (options.callback) {
            options.callback(b)
          }
          this.close();
        },
        parent: this.element.buttons
      })
    })
    delete this.element.back.dataset.hidden;
  }
}

const dialog = new Dialog

export default dialog