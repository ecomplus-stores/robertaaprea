// storefront.webpack.js

const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
     './html/ProductVariations.html': path.resolve(__dirname, 'template/js/html/ProductVariations.html'),
     './js/ProductVariations.js': path.resolve(__dirname, 'template/js/ProductVariations.js'),
     './html/CartItem.html': path.resolve(__dirname, 'template/js/html/CartItem.html'),
     './js/CartItem.js': path.resolve(__dirname, 'template/js/CartItem.js')
    }
  }
})
