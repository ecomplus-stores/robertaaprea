// Add your custom JavaScript for checkout here.
window.habilitarPresente = function(pid, _id){
    $.each($('section[product_id]').map(function(){
        return $(this).attr('product_id')
    }).sort(), function(k,v){
        $('[product_id="'+ v +'"]').css('order', (parseInt(k) - 50));
    })
    //console.log('buscou ' + pid);
    let customizations = JSON.parse(sessionStorage.getItem('gift_'+ pid ));
    //console.log(customizations);
    //let hasGiftWrap = customizations.find(el => ['460860165721941794800000','765390166152028331400000'].includes(el._id));
    let hasGiftWrap = customizations.find(el => el.grid_id == "apx_gift_wrap");
    //console.log(hasGiftWrap);
    if(hasGiftWrap){
        $('[product_id="'+ _id +'"] .apx_giftWrap').removeClass('d-none');
    }
}
