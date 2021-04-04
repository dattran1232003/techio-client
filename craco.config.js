const path = require('path')

const absolutePath = path.resolve.bind(this, __dirname)
module.exports = {
  webpack: {
    alias: {
      '@app': absolutePath('src/'),
      '@util': absolutePath('src/util/'),
      '@context': absolutePath('src/context/'),
      '@components': absolutePath('src/components/'),
    }
  }
}
