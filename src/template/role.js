export default {
  name: 'roleTemplate',
  description: 'roleDesc',
  properties: {
    title: {
      type: 'text',
      default: 'title'
    },
    logo: {
      type: 'emoji',
      // default: '⭐'
    },
    image: {
      type: 'image',
      default: './img/none.svg'
    },
    name: {
      type: 'text',
      default: 'name'
    },
    info: {
      type: 'textarea',
      default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at quam vel lorem suscipit sagittis non ac justo. Aenean volutpat purus vitae metus aliquam ultrices. Suspendisse rhoncus odio sit amet ex malesuada tincidunt.'
    }
  }
}