<template>
  <div id="home">
    <head-top></head-top>
    <div class="home-container">
      <el-row class="statistic-box">
        <el-col :span="8">
          <statistic
            title="今日订单量"
            backgroundColor="#67C23A"
            class="statistic"
            :value="todayStatistic.orderCount"
            suffix="单"
          ></statistic>
        </el-col>
        <el-col :span="8">
          <statistic
            title="今日交易额"
            backgroundColor="#E6A23C"
            class="statistic"
            :value="todayStatistic.priceCount"
            numFormat="true"
            suffix="元"
          ></statistic>
        </el-col>
        <el-col :span="8">
          <statistic
            title="今日发单人数"
            backgroundColor="#F56C6C"
            class="statistic"
            :value="todayStatistic.userCount"
            suffix="人"
          ></statistic>
        </el-col>
      </el-row>

      <el-row class="statistic-box">
        <el-col :span="8">
          <statistic
            title="本月订单量"
            backgroundColor="#67C23A"
            class="statistic"
            :value="monthStatistic.orderCount"
            suffix="单"
          ></statistic>
        </el-col>
        <el-col :span="8">
          <statistic
            title="本月交易额"
            backgroundColor="#E6A23C"
            class="statistic"
            :value="monthStatistic.priceCount"
            numFormat="true"
            suffix="元"
          ></statistic>
        </el-col>
        <el-col :span="8">
          <statistic
            title="本月发单人数"
            backgroundColor="#F56C6C"
            class="statistic"
            :value="monthStatistic.userCount"
            suffix="人"
          ></statistic>
        </el-col>
      </el-row>
    </div>

    <el-tabs v-model="activeName" class="data-statistics" type="border-card">
      <el-tab-pane label="每日订单走势" name="orderStatistic">
        <visitor-pie
          :datas="orderStatistic"
          visitorType="line"
          x="days"
          y="order_num"
          xname="时间"
          yname="订单数"
          id="visitor1"
          width="1000"
        ></visitor-pie>
      </el-tab-pane>
      <el-tab-pane label="每月交易额走势" name="priceStatistic">
        <visitor-pie
          :datas="priceStatistic"
          visitorType="interval"
          x="months"
          y="price"
          xname="时间"
          yname="金额"
          id="visitor2"
          width="1000"
        ></visitor-pie>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import HeadTop from '../components/HeadTop.vue'
import VisitorPie from '../components/VisitorPie.vue'
import Statistic from '../components/Statistic.vue'
import {
  getTodayStatistic,
  getMonthStatistic,
  getOrderStatistic,
  getPriceStatistic
} from '../request/api'

export default {
  data() {
    return {
      title: '今日注册人数',
      value: '123645',
      colors: [
        { color: '#67C23A' },
        { color: '#E6A23C' },
        { color: '#F56C6C' }
      ],
      todayStatistic: {},
      monthStatistic: {},
      orderStatistic: [],
      priceStatistic: [],
      activeName: 'orderStatistic'
    }
  },
  components: {
    HeadTop,
    Statistic,
    VisitorPie
  },
  mounted() {
    getTodayStatistic().then(res => {
      this.todayStatistic = res
    })
    getMonthStatistic().then(res => {
      window.console.log(res)
      this.monthStatistic = res
    })
    getOrderStatistic({
      m: 'statistic',
      a: 'getOrderStatistic',
      days: 10
    }).then(res => {
      this.orderStatistic = res.reverse()
    })
    getPriceStatistic({
      m: 'statistic',
      a: 'getPriceStatistic',
      months: 10
    }).then(res => {
      this.priceStatistic = res.reverse()
    })
  }
}
</script>

<style>
.home-container {
  padding: 20px;
}
.statistic-box {
  padding-bottom: 20px;
}
.data-statistics {
  margin: 0 90px 50px 90px;
}
#visitor1,
#visitor2 {
  padding-left: 25px;
}
</style>

