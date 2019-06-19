import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

//引入reset.css
import './style/reset.css'

//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入axios
import Axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, Axios);

//引入模块路由
import router from './router/router.js';

//日期过滤器
Vue.filter('NumFormat', function(value,isFloat) {
  if(!value) return '0.00';
  var intPart = Number(value).toFixed(0); //获取整数部分
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
  var floatPart = ".00"; //预定义小数部分
  var value2Array = value.split(".");
  //=2表示数据有小数位
  if(value2Array.length == 2 && isFloat) {
    floatPart = value2Array[1].toString(); //拿到小数部分
      if(floatPart.length == 1) { //补0,实际上用不着
        return intPartFormat + "." + floatPart + '0';
      } else {
        return intPartFormat + "." + floatPart;
      }
  } else if (isFloat){
    return intPartFormat + floatPart;
  } else {
    return intPartFormat;
  }
});


new Vue({
  render: h => h(App),
    router
}).$mount('#app')
