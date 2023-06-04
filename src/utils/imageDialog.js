import dialog from "./dialog"

import images from '../images'
import element from "./element";
import _T from "../i18n/i18n";


function imageDialog(current, fn) {
  const content = element.create('DIV')
  const imgelt = []
  function showPath(d) {
    if (d) {
      d = d.split('/')
      d.pop()
      d = d.join('/')
      if (path[d]) dir.value = d;
    }
    d = dir.value;
    imgelt.forEach(i => {
      if (!d || i.dataset.path === d) {
        i.className = 'visible'
      } else {
        i.className = 'hidden'
      }
    })
  }
  const dir = element.create('SELECT', { 
    change: () => showPath(),
    parent: content
  })
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
  showPath(d)
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