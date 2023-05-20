export default {
  name: 'roleTemplate',
  description: 'roleDesc',
  className: 'noBorder',
  format: 'squares',
  style: {
    borderColor: '#ffc000'
  },
  properties: {
    eye: {
      type: 'image',
      default: './img/emoticard/eye/eye.svg',
    },
    mouth: {
      type: 'image',
      default: './img/emoticard/mouth/smile.svg',
    },
    title: {
      type: 'text',
      default: 'Emotion',
      fontSize: 10,
      style: {
        color: '#000000',
      }
    },
  },
  back: {
    logo: {
      type: 'image',
      default: './img/none.svg',
      alt: [ 'box', 'circle', 'hidden'],
      style: {
        img_width: 60
      }
    },
    deck: {
      type: 'text',
      default: 'name',
      style: {
        color: '#000000',
        backgroundColor: 'transparent',
        transform: {
          init: 'translateX(-50%)',
          scale: 1,
          rotate: 0
        }
      }
    },
  }
}