<template>
  <div id="user-info">
    <head-top></head-top>
    <div class="user-container">
      <el-row>
        <el-col :span="12" :offset="12">
          <el-input
            placeholder="请输入需要搜索的关键字"
            v-model="listQuery.selectedValue"
            class="input-with-select"
          >
            <el-select
              v-model="listQuery.selectedKey"
              slot="prepend"
              placeholder="请选择"
              style="width:20%"
            >
              <el-option label="ID" value="id"></el-option>
              <el-option label="发单者学号" value="owner"></el-option>
              <el-option label="接单者学号" value="worker"></el-option>
              <el-option label="发布时间" value="start"></el-option>
              <el-option label="收货人姓名" value="name"></el-option>
              <el-option label="内部订单编号" value="transaction_id"></el-option>
              <el-option label="预支付单号" value="prepay_id"></el-option>
              <el-option label="起点" value="delivery"></el-option>
              <el-option label="终点" value="location"></el-option>
              <el-option label="取货号" value="number"></el-option>
              <el-option label="答谢方式" value="repay"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getAllUserInfoData()"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table
        :data="listQuery.tableData"
        style="width: 100%; margin-top:20px;"
        @sort-change="tableSortChange"
        v-loading="loading"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="取货号">
                <span>{{ props.row.type == '1' ? '无' : props.row.number }}</span>
              </el-form-item>
              <el-form-item label="内部订单编号">
                <span>{{ props.row.transaction_id }}</span>
              </el-form-item>
              <el-form-item label="预支付单号">
                <span>{{ props.row.prepay_id }}</span>
              </el-form-item>
              <el-form-item label="是否付款成功">
                <span>{{ props.row.payment_state == '1' ? '是' : '否' }}</span>
              </el-form-item>
              <el-form-item label="答谢方式">
                <span>{{ props.row.repay }}</span>
              </el-form-item>
              <el-form-item label="红包金额">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="发单者是否确认收货">
                <span>{{ props.row.confirm == '1' ? '是' : '否' }}</span>
              </el-form-item>
              <el-form-item label="订单是否全部完成">
                <span>{{ props.row.OK == '1' ? '是' : '否' }}</span>
              </el-form-item>
              <el-form-item label="订单完全完成时间">
                <span>{{ props.row.end }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.remark }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id" sortable="custom"></el-table-column>
        <el-table-column label="订单类型" prop="type" :formatter="formatterOrderType" sortable="custom"></el-table-column>
        <el-table-column label="发布时间" width="140px" prop="start" sortable="custom"></el-table-column>
        <el-table-column label="起点" prop="delivery" sortable="custom"></el-table-column>
        <el-table-column label="终点" prop="location" sortable="custom"></el-table-column>
        <el-table-column label="发布者" prop="owner" sortable="custom"></el-table-column>
        <el-table-column label="接单者" prop="worker" sortable="custom"></el-table-column>
        <el-table-column label="是否被接单" prop="status" sortable="custom"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" @click="editUserInfo(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
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
import { getAllOrderInfo } from '../request/api'
export default {
  data() {
    return {
      loading: true,
      listQuery: {
        tableData: [], //表格数据
        pageIndex: 1, //当前页码
        pageSize: 10, //每页条数
        total: 0, //总条目数
        sortKey: 'id', //排序列名
        sortValue: 'desc', //升序还是降序
        selectedKey: 'id', //搜索列名
        selectedValue: '' //搜索关键词
      }
    }
  },
  components: {
    HeadTop
  },
  methods: {
    //获取所有订单数据
    getAllUserInfoData() {
      this.loading = true
      getAllOrderInfo({
        m: 'order',
        a: 'getAllOrderInfo',
        pageIndex: this.listQuery.pageIndex,
        pageSize: this.listQuery.pageSize,
        sortKey: this.listQuery.sortKey,
        sortValue: this.listQuery.sortValue,
        selectedKey: this.listQuery.selectedKey,
        selectedValue: this.listQuery.selectedValue
      })
        .then(res => {
          window.console.log(res)
          this.listQuery.total = res.total - 0
          this.listQuery.tableData = JSON.parse(res.orderInfo)
          this.loading = false
        })
        .catch(() => {
          this.$message.error('查询数据失败！')
        })
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
    },
    //改变页码回调
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getAllUserInfoData()
    },
    //格式化快递类型
    formatterOrderType(row) {
      return row.type == 1 ? '啥都递' : '领快递'
    }
  },
  mounted() {
    this.getAllUserInfoData()
  }
}
</script>

<style>
.user-container {
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
  width: 150px;
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
