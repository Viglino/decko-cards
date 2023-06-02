export default {
  name: 'badgeTemplate',
  description: 'badgeDesc',
  className: 'noBorder',
  format: 'smallsq',
  noBack: true,
  alt: [ 'square', 'round', 'badge'],
  style: {
    borderColor: '#67a1b7'
  },
  properties: {
    peuxpas: {
      type: 'text',
      default: 'J\'peux pas',
      collapse: true,
      style: {
        color: '#000000',
      }
    },
    jai: {
      type: 'text',
      default: 'j\'ai',
      collapse: true,
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