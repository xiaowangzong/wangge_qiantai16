<template>
    
    <div>
        商城

        <app-Header></app-Header>      <!-- 公共头部 -->

        <router-view></router-view>     <!-- 变化主体 -->

        <app-Footer></app-Footer>       <!-- 公共底部 -->
    </div>
</template>

<script>
    // 具体引入公共头部，相对路径
    import appHeader from './subcom/Header.vue';  
    import appFooter from './subcom/Footer.vue';  

    export default {
        components:{
            appHeader,   
            // 抽象引入
            appFooter
        }
    }
</script>

<style scoped>

</style>