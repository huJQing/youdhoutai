<template>
  <div id="user-info">
    <head-top></head-top>
    <div class="user-container">
      <el-row>
        <el-col :span="12" :offset="12">
          <el-input placeholder="请输入内容" v-model="listQuery.selectedValue" class="input-with-select">
            <el-select
              v-model="listQuery.selectedKey"
              slot="prepend"
              placeholder="请选择"
              style="width:20%"
            >
              <el-option label="学号" value="num"></el-option>
              <el-option label="账户余额" value="amount"></el-option>
              <el-option label="姓名" value="name"></el-option>
              <el-option label="电话" value="phone"></el-option>
              <el-option label="昵称" value="nickname"></el-option>
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
        <el-table-column prop="num" label="学号" sortable="custom"></el-table-column>
        <el-table-column prop="amount" label="余额" sortable="custom"></el-table-column>
        <el-table-column prop="name" label="姓名" sortable="custom" empty-text="无"></el-table-column>
        <el-table-column prop="phone" label="电话" sortable="custom"></el-table-column>
        <el-table-column prop="nickname" label="昵称" sortable="custom"></el-table-column>
        <el-table-column prop="first" label="今日是否发单" sortable="custom"></el-table-column>
        <el-table-column label="操作">
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

      <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="selectTable">
          <el-form-item label="学号" label-width="100px">
            <el-input v-model="selectTable.num" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="余额" label-width="100px">
            <el-input v-model="selectTable.amount"></el-input>
          </el-form-item>
          <el-form-item label="姓名" label-width="100px">
            <el-input v-model="selectTable.name"></el-input>
          </el-form-item>
          <el-form-item label="电话" label-width="100px">
            <el-input v-model="selectTable.phone"></el-input>
          </el-form-item>
          <el-form-item label="昵称" label-width="100px">
            <el-input v-model="selectTable.nickname"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUserInfo()">保 存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import HeadTop from '../components/HeadTop.vue'
import { getAllUserInfo, updateUserInfo, deleteUserInfo } from '../request/api'
export default {
  data() {
    return {
      loading: true,
      listQuery: {
        tableData: [], //表格数据
        pageIndex: 1, //当前页码
        pageSize: 10, //每页条数
        total: 0, //总条目数
        sortKey: 'amount', //排序列名
        sortValue: 'asc', //升序还是降序
        selectedKey: 'num', //搜索列名
        selectedValue: '' //搜索关键词
      },
      dialogFormVisible: false,
      selectTable: {}
    }
  },
  components: {
    HeadTop
  },
  methods: {
    //获取所有用户数据
    getAllUserInfoData() {
      this.loading = true
      getAllUserInfo({
        m: 'user',
        a: 'getAllUserInfo',
        pageIndex: this.listQuery.pageIndex,
        pageSize: this.listQuery.pageSize,
        sortKey: this.listQuery.sortKey,
        sortValue: this.listQuery.sortValue,
        selectedKey: this.listQuery.selectedKey,
        selectedValue: this.listQuery.selectedValue
      })
        .then(res => {
          this.listQuery.total = res.total - 0
          this.listQuery.tableData = JSON.parse(res.userInfo)
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
    },
    //编辑用户信息
    editUserInfo(index, row) {
      this.dialogFormVisible = true
      this.selectTable = row
    },
    //删除用户
    deleteUser(index, row) {
      deleteUserInfo({
        m: 'user',
        a: 'deleteUserInfo',
        num: row.num
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.$message.success('删除用户成功！')
          this.dialogFormVisible = false
          this.getAllUserInfoData()
        } else {
          this.$message.error('删除用户失败！')
        }
      })
    },
    //更新用户信息
    updateUserInfo() {
      updateUserInfo({
        m: 'user',
        a: 'updateUserInfo',
        num: this.selectTable.num,
        amount: this.selectTable.amount,
        name: this.selectTable.name,
        phone: this.selectTable.phone,
        nickname: this.selectTable.nickname
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.$message.success('保存用户信息成功！')
          this.dialogFormVisible = false
        } else {
          this.$message.error('保存用户信息失败！')
        }
      })
    }
  },
  mounted() {
    this.getAllUserInfoData()
  }
}
</script>

<style>
#user-info {
  margin-bottom: 80px;
}
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
