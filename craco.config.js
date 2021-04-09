const path = require('path')

const absolutePath = path.resolve.bind(this, __dirname)
module.exports = {
  webpack: {
    alias: {
      '@app': absolutePath('src/'),
      '@util': absolutePath('src/util/'),
      '@context': absolutePath('src/context/'),
      '@components': absolutePath('src/components/'),
    },
  }, // #Webpack config
  babel: {
    plugins: [
      [ // begin styleX plugin
        "@ladifire-opensource/babel-plugin-transform-stylex",
        { inject: true, },
      ], // end styleX plugin
    ]
  }, // #Babel config
}
