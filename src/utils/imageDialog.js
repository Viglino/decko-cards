import dialog from "./dialog"

import images from '../images'
import element from "./element";
import _T from "../i18n/i18n";

function imageDialog(fn) {
  const content = element.create('DIV')
  images.forEach(img => {
    element.create('IMG', {
      src: img.path + img.file,
      click: () => {
        fn(img.path + img.file);
        dialog.close()
      },
      parent: content
    })
  });
  dialog.show({
    html: content,
    className: 'img',
    buttons: {
      cancel: _T('cancel')
    }
  })
}

export default imageDialog