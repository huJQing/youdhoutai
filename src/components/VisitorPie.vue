<template>
  <div id="visitor-pie">
    <div :id="id"></div>
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
  props: {
    id: {
      //图标容器的id，必传参数
      type: String,
      required: true
    },
    datas: {
      //图标数据，必传参数
      type: Array,
      required: true
    },
    visitorType: {
      //图表类型，只支持line和interval
      type: String,
      default: 'line'
    },
    x: {
      //x轴的参数
      type: String,
      required: true
    },
    y: {
      //y轴的参数
      type: String,
      required: true
    },
    xname: String, //x轴的参数的名称
    yname: String, //y轴的参数的名称
    width: {
      //图标宽度
      type: String,
      default: '500'
    },
    height: {
      //图标高度
      type: String,
      default: '350'
    }
  },
  methods: {
    structureLineVisitor(datas) {
      this.chart && this.chart.destroy()
      const data = datas
      this.chart = new G2.Chart({
        container: this.id, // 指定图表容器 ID
        width: this.width, // 指定图表宽度
        height: this.height, // 指定图表高度
        padding: [20, 20, 20, 80]
      })
      const xAxis = {}
      xAxis[this.x] = {
        alias: this.xname
      }
      const yAxis = {}
      yAxis[this.y] = {
        alias: this.yname
      }
      this.chart.source(data, xAxis, yAxis)
      this.chart
        .line()
        .position(this.x + '*' + this.y)
        .size(2)
      this.chart
        .point()
        .position(this.x + '*' + this.y)
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1
        })
      this.chart.render()
    },
    structureIntervalVisitor(datas) {
      this.chart && this.chart.destroy()
      const data = datas
      this.chart = new G2.Chart({
        container: this.id, // 指定图表容器 ID
        width: this.width, // 指定图表宽度
        height: this.height, // 指定图表高度
        padding: [20, 20, 20, 80]
      })
      const x = {}
      x[this.x] = {
        alias: this.xname
      }
      const y = {}
      y[this.y] = {
        alias: this.yname
      }
      this.chart.source(data, x, y)
      this.chart.interval().position(this.x + '*' + this.y)
      this.chart.render()
    }
  },
  watch: {
    datas: function(datas) {
      if (this.visitorType === 'line') {
        this.structureLineVisitor(datas)
      } else if (this.visitorType === 'interval') {
        this.structureIntervalVisitor(datas)
      }
    }
  },
  mounted() {}
}
</script>
