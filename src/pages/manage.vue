<!--suppress ALL -->
<template>
  <div id="manage">
    <!--suppress HtmlUnknownTag -->
    <el-container style="height: 100%">
      <el-aside width="220px" style="height: 100%;">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          background-color="#151f33"
          text-color="#fff"
          active-text-color="#4BCCFF"
          style="min-height: 100%"
          router
        >
          <el-menu-item index="manage">
            <i class="el-icon-date"></i>首页
          </el-menu-item>

          <el-submenu index="YOUd">
            <template slot="title">
              <i class="el-icon-menu"></i>YOU递
            </template>
            <el-menu-item index="userInfo">用户信息</el-menu-item>
            <el-menu-item index="orderInfo">订单信息</el-menu-item>
            <el-menu-item index="transactionInfo">交易信息</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>YOU转
            </template>
            <el-menu-item index="goodsInfo">商品信息</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-tickets"></i>YOU递社区
            </template>
            <el-menu-item index="commentInfo">用户发布信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main id="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    defaultActive: function() {
      return this.$route.path.replace('/', '')
    }
  },
  methods: {}
}
</script>

<style>
#manage {
  height: 100%;
}
#main {
  min-width: 1250px;
  padding: 0;
}
</style>