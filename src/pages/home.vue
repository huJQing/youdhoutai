<template>
    <div id="home">
        <head-top></head-top>
        <div class="home-container">
            <el-row class="statistic-box">
                <el-col :span="8">
                    <statistic title="今日订单量" backgroundColor="#67C23A"  class="statistic" 
                    :value="todayStatistic.orderCount" suffix="单"></statistic>
                </el-col>
                <el-col :span="8">
                    <statistic title="今日交易额" backgroundColor="#E6A23C"  class="statistic" 
                    :value="todayStatistic.priceCount" numFormat='true' suffix="元"></statistic>
                </el-col>
                <el-col :span="8">
                    <statistic title="今日发单人数" backgroundColor="#F56C6C"  class="statistic" 
                    :value="todayStatistic.userCount" suffix="人"></statistic>
                </el-col>
            </el-row>

            <el-row class="statistic-box">
                <el-col :span="8">
                    <statistic title="本月订单量" backgroundColor="#67C23A"  class="statistic" 
                    :value="monthStatistic.orderCount" suffix="单"></statistic>
                </el-col>
                <el-col :span="8">
                    <statistic title="本月交易额" backgroundColor="#E6A23C"  class="statistic" 
                    :value="monthStatistic.priceCount" numFormat='true' suffix="元"></statistic>
                </el-col>
                <el-col :span="8">
                    <statistic title="本月发单人数" backgroundColor="#F56C6C"  class="statistic" 
                    :value="monthStatistic.userCount" suffix="人"></statistic>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import HeadTop from '../components/HeadTop.vue'
    import Statistic from '../components/Statistic.vue'
    import { getTodayStatistic, getMonthStatistic } from '../request/api';

    export default {
        data() {
            return {
                title: '今日注册人数',
                value: '123645',
                colors: [
                    {color: '#67C23A'},
                    {color: '#E6A23C'},
                    {color: '#F56C6C'},
                ],
                todayStatistic: {},
                monthStatistic: {}
            }
        },
        components: {
            HeadTop,
            Statistic
        },
        mounted() {
            getTodayStatistic().then(res => {
                this.todayStatistic = res;
            });
            getMonthStatistic().then(res => {
                window.console.log(res);
                this.monthStatistic = res;
            })
        }
    }
</script>

<style>
    .home-container{
        padding: 20px;
    }
    .statistic-box{
        padding-bottom: 20px;
    }
</style>

