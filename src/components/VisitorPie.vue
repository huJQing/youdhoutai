<template>
  <div id="visitor-pie">
    <div id="c1"></div>
  </div>
</template>

<script>
import G2 from '@antv/g2'

export default {
  data() {
    return {
      chart: null
    }
  },
  props: ['orderStatistic'],
  methods: {
    structureVisitor(datas) {
      window.console.log(datas)
      this.chart && this.chart.destroy()
      const data = datas
      this.chart = new G2.Chart({
        container: 'c1', // 指定图表容器 ID
        width: 500, // 指定图表宽度
        height: 350 // 指定图表高度
      })
      this.chart.source(data, {
        days: {
          alias: '日期',
          type: 'cat',
          range: [0, 1]
        },
        order_num: {
          alias: '订单量'
        }
      })
      this.chart
        .line()
        .position('days*order_num')
        .size(2)
      this.chart
        .point()
        .position('days*order_num')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
      this.chart.render()
    }
  },
  watch: {
    orderStatistic: function(data) {
      this.structureVisitor(data)
    }
  },
  mounted() {}
}
</script>
