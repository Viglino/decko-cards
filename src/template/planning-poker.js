export default {
  name: 'roleTemplate',
  description: 'roleDesc',
  format: 'small',
  alt: [ 'text', 'icon'],
  properties: {
    point: {
      type: 'text',
      default: '',
      related: ['corner1', 'corner2'],
      style: {
      }
    },
    icon: {
      type: 'image',
      default: './img/none.svg',
      related: ['icorner1', 'icorner2'],
      style: {
        img_width: 90
      }
    }
  },
  back: {
    logo: {
      type: 'image',
      default: './img/none.svg',
      alt: [ 'box', 'circle', 'hidden'],
      style: {
        img_width: 60,
        img_top: '50%'
      }
    },
    deck: {
      type: 'text',
      default: 'Decko\'cardS',
      style: {
        color: '#000000',
        backgroundColor: 'transparent',
        transform: {
          init: 'translateX(-50%)',
          scale: 1,
          rotate: 0,
        }
      }
    },
  }
}