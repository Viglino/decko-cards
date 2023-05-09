export default {
  name: 'roleTemplate',
  description: 'roleDesc',
  properties: {
    title: {
      type: 'text',
      default: 'Descko &nbsp;\' &nbsp; Cards',
      style: {
        color: '#000000',
        backgroundColor: '#cccccc'
      }
    },
    line: {
      type: 'lineh',
      style: {
        color: 'transparent'
      }
    },
    logo: {
      type: 'image',
      default: './img/none.svg',
      alt: [ 'circle', 'box', 'image', 'hidden'],
      style: {
        backgroundSize: 80,
        borderColor: 'transparent'
      }
    },
    image: {
      type: 'image',
      default: './img/none.svg',
      style: {
        backgroundSize: 50,
        backgroundPositionY: 'bottom'
      }
    },
    background: {
      type: 'image',
      style: {
        backgroundSize: 30,
        backgroundPositionX: 80,
        backgroundPositionY: 100
      }
    },
    foreground: {
      type: 'image',
      style: {
        backgroundSize: 30,
        backgroundPositionX: 20,
        backgroundPositionY: 100
      }
    },
    name: {
      type: 'text',
      default: 'name',
      style: {
        color: '#000000',
        backgroundColor: '#cccccc',
        transform: {
          init: 'translateX(-50%)',
          scale: 1,
          rotate: 0
        }
      }
    },
    info: {
      type: 'textarea',
      default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at quam vel lorem suscipit sagittis non ac justo. Aenean volutpat purus vitae metus aliquam ultrices. Suspendisse rhoncus odio sit amet ex malesuada tincidunt.'
    }
  }
}