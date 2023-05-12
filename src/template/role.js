export default {
  name: 'roleTemplate',
  description: 'roleDesc',
  properties: {
    title: {
      type: 'text',
      default: '',
      style: {
        color: '#000000',
        backgroundColor: '#ffffff'
      }
    },
    line: {
      type: 'lineh',
      collapse: true,
      style: {
        color: 'transparent'
      }
    },
    icon: {
      type: 'image',
      default: './img/none.svg',
      alt: [ 'circle', 'box', 'image', 'hidden'],
      style: {
        img_width: 90,
        borderColor: 'transparent'
      }
    },
    image: {
      type: 'image',
      default: './img/none.svg',
      style: {
        img_width: 50,
        img_top: 50
      }
    },
    background: {
      type: 'image',
      collapse: true,
      style: {
        img_width: 30,
        img_top: 50,
        img_left: 80
      }
    },
    foreground: {
      type: 'image',
      collapse: true,
      style: {
        img_width: 30,
        img_top: 50,
        img_left: 20
      }
    },
    name: {
      type: 'text',
      default: 'name',
      style: {
        color: '#000000',
        backgroundColor: '#ffffff',
        transform: {
          init: 'translateX(-50%)',
          scale: 1,
          rotate: 0
        }
      }
    },
    info: {
      type: 'textarea',
      fontSize: 4,
      default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at quam vel lorem suscipit sagittis non ac justo. Aenean volutpat purus vitae metus aliquam ultrices. Suspendisse rhoncus odio sit amet ex malesuada tincidunt.'
    }
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