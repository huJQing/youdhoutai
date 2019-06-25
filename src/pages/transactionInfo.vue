<template>
  <div id="transition-info">
    <head-top></head-top>
    <div class="transition-container">
      <el-row>
        <el-col :span="12" :offset="12">
          <el-input placeholder="请输入内容" v-model="listQuery.selectedValue" class="input-with-select">
            <el-select
              v-model="listQuery.selectedKey"
              slot="prepend"
              placeholder="请选择"
              style="width:20%"
            >
              <el-option label="内部订单编号" value="transaction_id"></el-option>
              <el-option label="微信订单编号" value="wx_transaction_id"></el-option>
              <el-option label="支付时间" value="time"></el-option>
              <el-option label="支付状态" value="state"></el-option>
              <el-option label="用户openId" value="openId"></el-option>
              <el-option label="支付金额" value="total_fee"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getAllUserInfoData()"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table
        :data="listQuery.tableData"
        style="width: 100%"
        @sort-change="tableSortChange"
        v-loading="loading"
      >
        <el-table-column prop="time" label="支付时间" sortable="custom" empty-text="无"></el-table-column>
        <el-table-column prop="transaction_id" label="内部订单编号" sortable="custom"></el-table-column>
        <el-table-column prop="wx_transaction_id" label="微信订单编号" sortable="custom"></el-table-column>
        <el-table-column prop="state" label="支付状态" sortable="custom"></el-table-column>
        <el-table-column prop="openId" label="用户openId" sortable="custom"></el-table-column>
        <el-table-column prop="total_fee" label="支付金额" sortable="custom"></el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="listQuery.total"
        :current-page="listQuery.pageIndex"
        class="pagination"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import HeadTop from '../components/HeadTop.vue'
import { getTransitionInfo } from '../request/api'
export default {
  data() {
    return {
      loading: true,
      listQuery: {
        tableData: [], //表格数据
        pageIndex: 1, //当前页码
        pageSize: 10, //每页条数
        total: 0, //总条目数
        sortKey: 'time', //排序列名
        sortValue: 'desc', //升序还是降序
        selectedKey: 'transaction_id', //搜索列名
        selectedValue: '' //搜索关键词
      }
    }
  },
  components: {
    HeadTop
  },
  methods: {
    //获取所有用户数据
    getAllUserInfoData() {
      this.loading = true
      getTransitionInfo({
        m: 'order',
        a: 'getAllTransitionInfo',
        pageIndex: this.listQuery.pageIndex,
        pageSize: this.listQuery.pageSize,
        sortKey: this.listQuery.sortKey,
        sortValue: this.listQuery.sortValue,
        selectedKey: this.listQuery.selectedKey,
        selectedValue: this.listQuery.selectedValue
      })
        .then(res => {
          this.listQuery.total = res.total - 0
          this.listQuery.tableData = JSON.parse(res.transitionInfo)
          this.loading = false
        })
        .catch(() => {
          this.$message.error('查询数据失败！')
          this.loading = false
        })
    },
    //改变页码回调
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getAllUserInfoData()
    },
    //改变排序回调
    tableSortChange(column) {
      this.listQuery.pageIndex = 1
      if (column.order === 'descending') {
        this.listQuery.sortKey = column.prop
        this.listQuery.sortValue = 'desc'
      } else {
        this.listQuery.sortKey = column.prop
        this.listQuery.sortValue = 'asc'
      }
      this.getAllUserInfoData()
    }
  },
  mounted() {
    this.getAllUserInfoData()
  }
}
</script>

<style>
.transition-container {
  padding: 30px 80px;
  position: relative;
}
.el-select .el-input {
  width: 130px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.pagination {
  margin-top: 20px;
  position: absolute;
  right: 80px;
}
</style>
