<template>
    <div>
        <!-- 侧边栏      =>推荐商品=>共享--> 
        <!--推荐商品-->
                <div class="left-220">
                     <div class="bg-wrap nobg">
                       <div class="sidebar-box">    

                        <h4>推荐商品</h4>
                          <ul class="side-img-list">
                            
                            <li v-for="(item,i) in list" :key="item.id">
                                
                                <div class="img-box">
                                    <label>{{i+1}}</label>      <!-- 同时获取图片的索引i,i+1是序号 -->
                                    <img :src="item.img_url">   <!-- 图片这里没有双尖括号，前面加冒号 -->
                                </div>
                                <div class="txt-box">
                                    <router-link :to="{name:goodsDetail,params:{id:item.id}}">{{item.title}}</router-link>
                                    <!-- 点击标题，切换到商品详情页面，根据这个商品对应的ID -->
                                    <!-- <a href="/goods/show-98.html">{{item.title}}</a> -->
                                    <span>{{item.add_time | date}}</span>
                                    <!-- 这就相当于把具体的东西写活 -->
                                </div>
                            </li>

                          </ul>
                       </div>
                    </div>

                </div>

    </div>
</template>

<script>
    export default {
        //接受父传过来的list 数据
        props:['list'],

        //局部过滤器
        filters:{
            //日期过滤器
            date(tplDate){
                let date=new Date(tplDate);
                return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
            }
        }
        
    }
</script>

<style scoped>

</style>