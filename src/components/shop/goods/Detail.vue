<template>
    <div>
        <!-- 商品详情 -->
        <!-- 需要一个根，不然会报错 -->
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link :to="{name:'goodsList'}">首页</router-link>&gt;
                <router-link to="">购物商城</router-link>&gt;
                <router-link to="">商品详情</router-link>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">

                        <!-- 放大镜与商品购买 -->
                        <div class="goods-box clearfix">
                            <!-- 商品图片
                            <div class="pic-box"> -->
                                <!-- 商品放大镜 -->
                             <div class="pic-box">
                                 <div class="magnifier" id="magnifier1">
                                     <div class="magnifier-container">
                                         <div class="images-cover"></div>
                                         <!--当前图片显示容器-->
                                         <div class="move-view"></div>
                                         <!--跟随鼠标移动的盒子-->
                                     </div>
                                     <div class="magnifier-assembly">
                                         <div class="magnifier-btn">
                                             <span class="magnifier-btn-left">&lt;</span>
                                             <span class="magnifier-btn-right">&gt;</span>
                                         </div>
                                         <!--按钮组-->
                                         <div class="magnifier-line">
                                             <ul class="clearfix animation03">
                                                 <li v-for="item in top.imglist" :key="item.id">
                                                   <div class="small-img">
                                                         <img :src="item.original_path" />
                                                     </div>
                                                 </li>
                                             </ul>
                                         </div>
                                         <!--缩略图-->
                                     </div>
                                     <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>

                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1>{{top.goodsinfo.title}}</h1>
                                <p class="subtitle">{{top.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{top.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{top.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">{{top.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- 计数  element计数组件，可设置最小值 -->
                                                <el-input-number size="mini" v-model="num"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{top.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy">立即购买</button>
                                                <button class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <!-- 商品详情与评论 -->
                        <div id="goodsTabs" class="goods-tab bg-wrap">

                            <el-tabs type="border-card">
                                <el-tab-pane label="商品介绍">
                                    <div v-html="top.goodsinfo.content"></div>
                                </el-tab-pane>
                                <el-tab-pane label="商品评论">
                                    <!-- 需要一个对应的id来发表图片 -->
                                     <comment :id="id"></comment>
                                </el-tab-pane>
                            </el-tabs>
                            <!-- 商品评论抽取为公共组件 -->
                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <!--  侧边栏，推荐商品列表，已抽取为公共组件 -->
                    <app-aside :list="top.hotgoodslist"></app-aside>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//导入jquery插件
// import '@/lib/imgzoom/css/magnifier.css'
// import '@/lib/imgzoom/js/magnifier.js'
// 导入放大镜插件
     import '@/lib/imgzoom/css/magnifier.css';
     import '@/lib/imgzoom/js/magnifier.js';
     import $ from 'jquery';

//导入公共右侧导航
import AppAside from "./subcom/CommonAside.vue";
// import Comment from "./subcom/CommonComment.vue";
import Comment from "./subcom/CommonComment.vue";

export default {
  components: {
    AppAside ,//注册一个AppAside
    Comment
  },

  data() {
    return {
      id: this.$route.params.id,
      num: 1, //预定义一个1，占位
      top: {
        //先在top里面预定义一下他的子元素
        goodsinfo: {},
        imglist: [],
        hotgoodslist: []
      }
    };
  },

  methods: {
    getTop() {
      //get请求，
      /* console.log(this.$api.goodsDetail); */
      this.$http.get(this.$api.goodsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          //如果数据请求成功，就获得对应的数据
          this.top = res.data.message;
        }
      });
    }
  },
  //组件初始化完毕，数据可用时被调用
  created() {
    //钩子函数生命周期，页面加载时就执行
    this.getTop();
  },

  // 视图挂载到页面上了, 这里可操作DOM
         mounted() {
             var magnifierConfig = {
                 magnifier : "#magnifier1",//最外层的大容器
                 width : 370,//承载容器宽
                 height : 370,//承载容器高
                 moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
                 zoom : 5//缩放比例
             };
 
             // 调用这个插件的方法, 必须保证放大镜相关的DOM节点都已经正常构建并渲染, 
             // 但是我们的节点里面有个v-for动态生成列表, 调用该方法时不能保证列表已经构建完毕, 所以延时一下
             setTimeout(function() {
                 var _magnifier = $().imgzoon(magnifierConfig);
             }, 500);
             
         },
 
  // 商品详情页面的右侧列表, 可以点击切换不同的商品进行预览
  // 但是默认情况下当前页面切换到当前页面不会触发组件的重新渲染, 为了解决这个问题,
  // 我们可以监听$route对象的变化, 因为切换商品后, $route.params.id变化了, 我们监听它,
  // 然后主动发起http请求, 调用接口获取新id的数据进行视图刷新
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.getTop(); //当发生改变的时候渲染
    }
  }
};
</script>

<style scoped>

</style>