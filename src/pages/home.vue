<template>
    <div id="home">
        <head-top></head-top>
        <div class="home-container">
            <el-row class="statistic-box">
                <el-col :span="8" v-for="(item,index) in colors" :key="index">
                    <statistic title="今日订单量" :backgroundColor="item.color"  class="statistic" :value="value"></statistic>
                </el-col>
            </el-row>

            <el-row class="statistic-box">
                <el-col :span="8" v-for="(item,index) in colors" :key="index">
                    <statistic title="今日订单量" :backgroundColor="item.color"  class="statistic" :value="value"></statistic>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import HeadTop from '../components/HeadTop.vue'
    import Statistic from '../components/Statistic.vue'
    export default {
        data() {
            return {
                title: '今日注册人数',
                value: '123645',
                colors: [
                    {color: '#67C23A'},
                    {color: '#E6A23C'},
                    {color: '#F56C6C'},
                ]
            }
        },
        components: {
            HeadTop,
            Statistic
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

