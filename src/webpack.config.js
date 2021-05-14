const path = require('path')
const absolutePath = path.resolve.bind(this, __dirname)

module.exports = { 
  webpack: {
    resolve: {
      alias: {
        '@app': absolutePath('src/'),
        '@util': absolutePath('src/util/'),
        '@context': absolutePath('src/context/'),
        '@components': absolutePath('src/components/'),
        '@fragments': absolutePath('src/util/apolloFragments.js'),
      },
    }
  }
}
