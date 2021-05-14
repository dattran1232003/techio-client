const path = require('path')

const absolutePath = path.resolve.bind(this, __dirname)
module.exports = {
  webpack: {
    alias: {
      'react': absolutePath('./node_modules/react'),
      '@app': absolutePath('src/'),
      '@util': absolutePath('src/util/'),
      '@context': absolutePath('src/context/'),
      '@components': absolutePath('src/components/'),
      '@fragments': absolutePath('src/util/apolloFragments.js'),
    },
  }, // #Webpack config
}
