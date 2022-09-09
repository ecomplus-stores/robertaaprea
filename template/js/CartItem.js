import {
    i19freebie,
    i19outOfStock,
    i19quantity,
    i19remove
  } from '@ecomplus/i18n'
  
  import {
    i18n,
    img as getImg,
    price as getPrice,
    formatMoney
  } from '@ecomplus/utils'
  
  import { store, modules } from '@ecomplus/client'
  import ecomCart from '@ecomplus/shopping-cart'
  import ALink from '@ecomplus/storefront-components/src/ALink.vue'
  import APicture from '@ecomplus/storefront-components/src/APicture.vue'
  import ItemCustomizations from '@ecomplus/storefront-components/src/ItemCustomizations.vue'
  
  export default {
    name: 'CartItem',
  
    components: {
      ALink,
      APicture,
      ItemCustomizations
    },
  
    props: {
      item: {
        type: Object,
        required: true
      },
      nameMaxLength: {
        type: Number,
        default: 35
      },
      inputType: {
        type: String,
        default: 'select'
      },
      canUpdateCart: {
        type: Boolean,
        default: true
      }
    },
  
    data () {
      return {
        quantity: 0,
        canInputSelect: false
      }
    },
  
    computed: {
      i19freebie: () => i18n(i19freebie),
      i19outOfStock: () => i18n(i19outOfStock),
      i19quantity: () => i18n(i19quantity),
      i19remove: () => i18n(i19remove),
  
      itemId () {
        return this.item._id
      },
  
      price () {
        return this.item.final_price || getPrice(this.item)
      },
  
      img () {
        return getImg(this.item.picture || this.item, null, 'small')
      },
  
      name () {
        return this.formatName(this.item.name)
      },
  
      isFreebie () {
        return Array.isArray(this.item.flags)
          ? this.item.flags.includes('freebie')
          : false
      },
  
      isIntegerQnt () {
        return Number.isInteger(this.maxQuantity) && Number.isInteger(this.quantity)
      },
  
      minQuantity () {
        const minQuantity = this.item.min_quantity
        return typeof minQuantity === 'number' && minQuantity >= 0
          ? minQuantity
          : 1
      },
  
      maxQuantity () {
        if (this.item.available === false) {
          return 0
        }
        const maxQuantity = this.item.max_quantity
        return typeof maxQuantity === 'number' && maxQuantity >= 0
          ? maxQuantity
          : 9999999
      }
    },
  
    methods: {
      formatMoney,
  
      formatName (name) {
        if (name) {
          if (name.length <= this.nameMaxLength) {
            return name
          } else {
            return `${name.substr(0, this.nameMaxLength)}...`
          }
        }
      },
  
      validateQuantity () {
        if (this.minQuantity <= this.maxQuantity) {
          if (this.quantity < this.minQuantity) {
            this.quantity = this.minQuantity
          } else if (this.quantity > this.maxQuantity) {
            this.quantity = this.maxQuantity
          }
        }
      },
  
      updateInputType () {
        this.validateQuantity()
        this.canInputSelect = this.isIntegerQnt && this.quantity > 0 && this.quantity <= 10
      },
  
      remove () {
        this.$emit('remove')
        if (this.itemId && this.canUpdateCart) {
          this.quantity = 0
          this.canInputSelect = false
          this.$nextTick(() => {
            ecomCart.removeItem(this.itemId)
            this.$destroy()
          })
        }
      }
    },
  
    watch: {
      'item.quantity': {
        handler (qnt) {
          if (this.quantity || qnt > 1) {
            this.quantity = qnt || 0
          }
        },
        immediate: true
      },
  
      quantity (qnt, oldQnt) {
        if (typeof qnt !== 'number' || isNaN(qnt)) {
          qnt = 0
        }
        if (qnt !== this.item.quantity) {
          const quantityToAdd = qnt - this.item.quantity
          this.$emit('increase', {
            quantityToAdd,
            newQuantity: qnt
          })
          if (this.itemId && this.canUpdateCart) {
            const item = ecomCart.increaseItemQnt(this.itemId, quantityToAdd)
            if (this.isFreebie) {
              item.flags = item.flags.filter(flag => !flag.startsWith('freebie'))
            }
          }
        }
        if (qnt > 10 && oldQnt <= 10) {
          this.$nextTick(() => {
            if (this.$refs.input) {
              this.$refs.input.focus()
            }
          })
        }
      }
    },
    mounted () {
        //gift wrap
        let pid = this.item.product_id ? this.item.product_id : this.item._id 
        let _id = this.item._id
        let customizations = sessionStorage.getItem('gift_' + pid)
        if(!customizations){
            store({ url: `/products/${pid}.json` })
                .then(({data}) => {
                    // console.log('bbb')
                    // console.log(data);
                    sessionStorage.setItem('gift_' + pid, JSON.stringify(data.customizations))
                    window.habilitarPresente(pid,_id)
                })
        }else{
            window.habilitarPresente(pid, _id)
        }
        
    },
    created () {
        this.updateInputType()
        
        $('body').on('change', '.apx_giftWrap input', function(){
            let productData = JSON.parse($(this).closest('.apx_giftWrap').attr('data-item'))
            let pid = productData.product_id ? productData.product_id : productData._id 
            let customizations = JSON.parse(sessionStorage.getItem('gift_'+ pid ))
            let hasGiftWrap = customizations.find(el => el.grid_id == 'apx_gift_wrap')
            let gift_data
            if(hasGiftWrap){
                //console.log(hasGiftWrap)
                gift_data = {
                    _id: hasGiftWrap._id,
                    label: hasGiftWrap.label,
                    add_to_price : hasGiftWrap.add_to_price,
                    option : {text:"Sim"}
                }
            }else{
                alert('Opção não disponível para este produto')
                return false;
            }

            ecomCart.removeItem(productData._id)
            if(!$(this).prop('checked')){
                let save = productData.customizations.filter(el => el._id != gift_data._id)
                productData.customizations = save
            }else{
                productData.customizations.push(gift_data)
            }
            ecomCart.addItem(productData)
        })
        

      console.log(this.item._id)
    }
  }