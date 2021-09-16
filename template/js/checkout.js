import '#template/js/checkout'
import './custom-js/checkout'

const routeArr = window.location.href.split('/');
const route = routeArr[routeArr.length - 1]
const route2 = routeArr[routeArr.length - 2]
const route3 = routeArr[routeArr.length - 3]
if(route == 'checkout') {
  document.getElementById('checkToPay').style.display = 'none'
}
if(route2 == 'account') {
    document.getElementById('checkToPay').style.display = 'none'
}
if(route3 == 'order') {
    document.getElementById('checkToPay').style.display = 'none'
}
