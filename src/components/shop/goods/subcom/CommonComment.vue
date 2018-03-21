<template>
    <div>
        <!-- 公共评论 -->
        <!-- 需要一个根，不然报错 -->
        <div class="comment-box">
            <!-- 取得评论总数，记得阻止默认的浏览器刷新提交-->
            <form id="commentForm" name="commentForm" class="form-box" @submit.prevent="sendComments"> 
                <div class="avatar-box">
                    <i class="iconfont icon-user-full"></i>
                </div>
                <div class="conn-box">
                    <div class="editor">
                        <!--v-model="" 前后双向数据绑定， 请求报文体传参示例：commenttxt (具体看文档) -->
                        <textarea id="txtContent" v-model="commenttxt.commenttxt" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                    </div>
                    <div class="subcon">
                        <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                        <span class="Validform_checktip"></span>
                    </div>
                </div>
            </form>
            <ul id="commentList" class="list-box">
                <!-- 如果评论长度为0，出来 -->
                <p v-if="comments.length == 0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                <!-- 根据(唯一对应性)索引来遍历的，后台时间有bug,不可传 。且key里面必须是字符串-->
                <li v-for="(item, i) in comments" :key="i">
                    <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="inner-box">
                        <div class="info">
                            <span>{{ item.user_name }}</span>
                            <span>{{ item.add_time }}</span>
                        </div>
                        <p>{{ item.content }}</p>
                    </div>
                </li>

            </ul>
            <!--放置页码-->
            
            <!--/放置页码-->
        </div>

    </div>
</template>

<script>
export default {
  props: ['id'], //接收Detail.vue返回的id

  data() {
    return {
      //评论列表
      comments: [],
      //提交评论所需数据
      commenttxt: {
        commenttxt: ""
      }
    }
  },

  methods: {
    // 获取评论列表
             getComments() {
                 // 这个接口比较特殊, 需要一个tablename用来指定评论模块, 还需要id用来指定某模块下某个商品的评论
                 let url = `${this.$api.commentList}goods/${this.id}?pageIndex=1&pageSize=10`;
                 this.$http.get(url).then(res => {
                     if(res.data.status == 0) {
                         this.comments = res.data.message;
                     }
                 })
             },

    //发表评论--好像要重启一下api服务
    sendComments() {
      let url = `${this.$api.comment}goods/${this.id}`;
      this.$http.post(url,this.commenttxt).then(res => {
        if (res.data.status == 0) {
          this.commenttxt.commenttxt = ''; // 成功后清空评论框
          this.getComments();
          //如果成功，调用它，刷新页面
        }
      })
    }
  },

  created() {
    this.getComments();
  },

  watch: {
    //监听，用户访问新的商品时，重新调用商品的品论列表
    id() {
      this.getComments();
    }
  }
};
</script>

<style scoped>

</style>