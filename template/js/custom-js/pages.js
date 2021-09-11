// Add your custom JavaScript for storefront pages here.
storefront.on('widget:@ecomplus/widget-minicart', function () {
    setTimeout(function () {
        if (storefront && storefront.context && storefront.context.resource === 'products') {
            document.querySelector('.product__buy button').style.display = 'none';
            const inputsCustom = [...document.querySelectorAll('.product__customization input')]
            document.querySelectorAll('.product__customization input')
                .forEach(item => item.addEventListener('input', (e) => {
                    if (e.value !== '' && inputsCustom.length) {
                        inputsCustom.every(item => item.value !== '') ? 
                        document.querySelector('.product__buy button').style.display = 'block' 
                        : document.querySelector('.product__buy button').style.display = 'none';
                    }
                }))
        }
    }, 800);
});

storefront.on('widget:@ecomplus/widget-minicart', function () {
    setTimeout(function () {
        let productCard = document.querySelectorAll('.product-card__buy button')
        productCard.forEach(item => item.addEventListener('click', (e) => {
            setTimeout(function () {
                document.querySelector('.product-quickview .product__buy button').style.display = 'none';
                const inputCustom = [...document.querySelectorAll('.product-quickview .product__customization input')]
                document.querySelector('.product-quickview .product__customization input').addEventListener('input', (e) => {
                    if (e.value !== '' && inputCustom.length) {
                        inputCustom.every(item => item.value !== '') ? 
                        document.querySelector('.product-quickview .product__buy button').style.display = 'block' 
                        : document.querySelector('.product-quickview .product__buy button').style.display = 'none';
                    }
                })
            }, 800)
        }))
    }, 800);
});