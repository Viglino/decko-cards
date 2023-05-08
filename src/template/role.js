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
    logo: {
      type: 'image',
      visibility: false,
      default: './img/none.svg',
      style: {
        backgroundSize: 80
      }
    },
    image: {
      type: 'image',
      default: './img/none.svg',
      style: {
        backgroundSize: 50,
        backgroundPosition: 'bottom'
      }
    },
    name: {
      type: 'text',
      default: 'name',
      style: {
        color: '#000000',
        backgroundColor: '#cccccc',
        transform: {
          init: '',
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