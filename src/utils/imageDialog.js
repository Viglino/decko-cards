import dialog from "./dialog"

import images from '../images'
import element from "./element";
import _T from "../i18n/i18n";

/** Dialog for image selection
 * @param {*} [current] current image
 * @param {function} fn callback
 */
function imageDialog(current, fn) {
  const content = element.create('DIV')
  const imgelt = []
  function selectImg(d) {
    // Get path
    if (d) {
      d = d.split('/')
      d.pop()
      d = d.join('/')
      if (path[d]) dir.value = d;
    }
    d = dir.value;
    // Get search
    const rex = new RegExp(searchInput.value, 'i');
    imgelt.forEach(i => {
      if ((!d || i.dataset.path === d) && (rex.test(i.title+' '+i.dataset.path))) {
        i.className = 'visible'
      } else {
        i.className = 'hidden'
      }
    })
  }
  //
  const searchDiv = element.create('DIV', { className: 'icons', parent: content })
  // Select by theme
  const dir = element.create('SELECT', { 
    change: () => selectImg(),
    parent: searchDiv
  })
  // Search by name
  const searchInput = element.create('INPUT', {
    type: 'search', 
    placeholder: _T('search image'),
    on: { 
      keyup: () => selectImg(),
      search: () => selectImg(),
    },
    parent: searchDiv
  })

  // Icon list
  const path = {};
  images.forEach(img => {
    const d = img.path.replace('./img/', '').replace(/\/$/, '')
    path[d] = 1;
    imgelt.push(element.create('IMG', {
      src: img.path + img.file,
      'data-path': d,
      title: _T(img.title),
      click: () => {
        fn(img.path + img.file);
        dialog.close()
      },
      parent: content
    }))
  });
  element.create('OPTION', {
    value: '',
    text: _T('all'),
    parent: dir
  })
  Object.keys(path).forEach(k => {
    element.create('OPTION', {
      value: k,
      text: k,
      parent: dir
    })
  })
  const d = current.replace('./img/', '') // .replace(/\/$/, '')
  selectImg(d)
  dialog.show({
    title: _T('images'),
    html: content,
    className: 'img',
    buttons: {
      cancel: _T('cancel')
    }
  })
}

export default imageDialog