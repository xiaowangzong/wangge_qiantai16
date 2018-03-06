import Vue from 'vue'            //在Vue的路由中，vue和vue-router是必须的          
import Router from 'vue-router'

// 导入账户管理相关页面                          有配置文件 .vue 不用写的
import Login from '../components/account/login/Login';

// 导入商品管理相关页面
import Shop from '../components/shop/Shop';
import GoodsDetail from '../components/shop/goods/Detail';
import GoodsList from '../components/shop/goods/List';
import OrderComplete from '../components/shop/order/Complete';
import OrderPay from '../components/shop/order/Pay';
import OrderSite from '../components/shop/order/Site';
import Shopcart from '../components/shop/shopcart/Shopcart'; 
import Header from '../components/shop/subcom/Header';

Vue.use(Router)

// 分支路由，let
//let goods=[数组{},{},{}...];
let goods=[                                //id可以对应具体的商品
  { name: 'GoodsDetail', path: 'goods/detail/:id', component: GoodsDetail},
  { name: 'GoodsList', path: 'goods/list', component: GoodsList},
];

let shopcart=[
  { name: 'Shopcart', path: 'shopcart', component: Shopcart },
];

let order = [
  { name: 'OrderComplete', path: 'order/complete', component: OrderComplete },
  { name: 'orderPay', path: 'order/pay/:id', component: OrderPay},      //对应的要付款的商品
  { name: 'OrderSite', path: 'order/site/:ids', component: OrderSite}   //哪些商品填写地址
];


export default new Router({
  routes: [
    // 账户管理路由配置
    // 名称，     路径：绝对路径  组件：你引入的组件
    {name:'login',path:'/login',component:Login},
    
    // 商品管理路由配置                   有很多分路由，children:[数组]
    {name:'shop',path:'/',component:Shop,children:[...goods,...shopcart,...order]},
  ]
})
