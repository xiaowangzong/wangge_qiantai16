<template>
    <div>
        <!-- 面包屑导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="">首页</router-link>
                <router-link to="">购物商城</router-link>
            </div>
        </div>

        <!-- 页面头部=>分类列表与轮播图 -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->
                                <!-- 遍历 top.catelist里面的item内容-->
                                <li v-for="item in top.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>

                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                                {{subitem.title}}&nbsp;
                                            </span>

                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <router-link to="" v-for="subitem in item.subcates" :key="subitem.id">
                                                    {{subitem.title}}&nbsp;
                                                </router-link>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel style="height:100%">
                                <el-carousel-item v-for="item in top.sliderlist" :key="item.id">
                                    <img :src="item.img_url" :alt="item.title">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!--/幻灯片-->

                    <!-- 侧边栏=>推荐商品，抽取为公共组件=>共享-->
                    <app-aside :list="top.toplist"></app-aside>
                </div>
            </div>
        </div>

        <!-- 页面主体=>商品预览，抽取为子组件 -->
        <list-main></list-main>
    </div>
</template>

<script>
    import AppAside from './subcom/CommonAside.vue'; 
    import ListMain from './subcom/ListMain.vue'; 

    export default {
        components:{    //注册
            AppAside,
            ListMain
        },

        //data里面先预定义数据
        data() {
            return {
            top: {
                catelist: [],
                sliderlist: [],
                toplist: []
            }
            };
        },
        methods: {
            //获取页面顶部数据--get请求  (单纯的获取数据用get,有获取和发送用post)
            getTop() {
            this.$http.get(this.$api.goodsTop).then(res => {
                if (res.data.status == 0) {
                this.top = res.data.message;
                }
                //如果没有数据，就获取message里面的数据
            });
            }
        },
        //这里有钩子函数的生命周期问题
        created() {
            this.getTop();
        }
    };
</script>

<style scoped>

</style>