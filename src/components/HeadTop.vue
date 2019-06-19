<template>
    <div id="head-top">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "HeadTop",
        mounted() {
                console.log(this.$route );
        }
    }
</script>

<style scoped>
    #head-top{
        height: 60px;
        background: #eff2f7;
        padding: 0 50px;
        display: flex;
        align-items: center;
        color: #97a8be;
        font-size: 16px;
    }
</style>