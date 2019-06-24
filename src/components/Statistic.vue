<template>
    <div id="statistic">
        <el-card body-style="padding:10px;" :style="{backgroundColor: backgroundColor}">
            <div class="statistic-title" :style="{color: titleColor}">
                {{title}}
            </div>
            <div class="statistic-value" :style="{color: valueColor}">
                {{value | NumFormat(numFormat)}} 
                <span class="suffix">{{suffix !=='' ? suffix : ''}}</span>
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
        /**
         *title: 标题
         *value：数值
         *backgroundColor：背景颜色
         *titleColor： 标题文字颜色
         *valueColor：数值文字颜色
         *numFormat：是否格式化数值
         *suffix： 后缀
         * */
        props: ['title', 'value','backgroundColor','titleColor','valueColor', 'numFormat', 'suffix'],
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
    .suffix{
        font-size: 20px;
        position: relative;
        top: -2px;
    }
</style>
