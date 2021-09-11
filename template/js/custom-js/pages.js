// Add your custom JavaScript for storefront pages here.
storefront.on('widget:@ecomplus/widget-minicart', function () {
    setTimeout(function () {
      if (storefront && storefront.context && storefront.context.resource === 'products') {
        document.querySelector('.product__buy button').style.display = 'none';
        const inputsCustom = [...document.querySelectorAll('.product__customization input')]
        document.querySelector('.product__customization input').addEventListener('input', (e) => {
            if (e.value !== '' && inputsCustom.length) {
                inputsCustom.every(item => item.value !== '') ? 
                document.querySelector('.product__buy button').style.display = 'block' 
                : document.querySelector('.product__buy button').style.display = 'none';
            }
        })
      }
    }, 1000);
  });