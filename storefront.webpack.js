// storefront.webpack.js

const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
     './html/ProductVariations.html': path.resolve(__dirname, 'template/js/html/ProductVariations.html'),
     './js/ProductVariations.js': path.resolve(__dirname, 'template/js/ProductVariations.js'),
     './js/TheProduct.js': path.resolve(__dirname, 'template/js/TheProduct.js')

    }
  }
})
