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

window.habilitarPresente = function(pid, _id){
    $.each($('section[product_id]').map(function(){
        return $(this).attr('product_id')
    }).sort(), function(k,v){
        $('[product_id="'+ v +'"]').css('order', (parseInt(k) - 50));
    })
    //console.log('buscou ' + pid);
    let customizations = JSON.parse(sessionStorage.getItem('gift_'+ pid ));
    //console.log(customizations);
    let hasGiftWrap = customizations.find(el => el.grid_id == 'apx_gift_wrap');
    //console.log(hasGiftWrap);
    if(hasGiftWrap){
        $('[product_id="'+ _id +'"] .apx_giftWrap').removeClass('d-none');
    }
}