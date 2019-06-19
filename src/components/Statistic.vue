<template>
    <div id="statistic">
        <el-card body-style="padding:10px;" :style="{backgroundColor: backgroundColor}">
            <div class="statistic-title" :style="{color: titleColor}">
                {{title}}
            </div>
            <div class="statistic-value" :style="{color: valueColor}">
                {{value | NumFormat(false)}}
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: ['title', 'value','backgroundColor','titleColor','valueColor'],
    }
</script>

<style>
    .statistic{
        width: 280px;
        margin: 0 auto;
    }
    .statistic-title{
        height: 40px;
        width: 100%;
        line-height: 40px;
        font-size: 16px;
        color: #fff;
    }
    .statistic-value{
        height: 60px;
        width: 100%;
        line-height: 60px;
        font-size: 36px;
        color: #fff;
    }
</style>
