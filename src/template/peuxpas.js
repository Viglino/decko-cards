export default {
  name: 'peuxpasTemplate',
  description: 'peuxpasDesc',
  className: 'noBorder',
  format: 'small',
  properties: {
    background: {
      type: 'block',
      style: {
        color: '#67a1b7'
      }
    },
    jai: {
      type: 'text',
      default: 'j\'ai',
      style: {
        color: '#ffffff',
      }
    },
    info: {
      type: 'text',
      default: '',
      style: {
        color: '#000000',
      }
    },
    back: {
      type: 'image',
      style: {
        img_height: 80,
        img_left: 50,
        img_top: 50,
      }
    },
    img: {
      type: 'image',
      style: {
        img_height: 80,
        img_left: 50,
        img_top: 50
      }
    },
    accessory: {
      type: 'image',
      style: {
        img_height: 80,
        img_left: 50,
        img_top: 50,
        img_rotate: 0
      }
    },
  },
  back: {
  }
}