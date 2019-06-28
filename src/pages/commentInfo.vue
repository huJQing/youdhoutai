<template>
  <div id="comment-info">
    <head-top></head-top>
    <div class="comment-container">
      <el-row>
        <el-col :span="12" :offset="12">
          <el-input placeholder="请输入内容" v-model="listQuery.selectedValue" class="input-with-select">
            <el-select
              v-model="listQuery.selectedKey"
              slot="prepend"
              placeholder="请选择"
              style="width:20%"
            >
              <el-option label="发布者学号" value="stunum"></el-option>
              <el-option label="发布内容" value="content"></el-option>
              <el-option label="发布者昵称" value="owner"></el-option>
              <el-option label="发布时间" value="time"></el-option>
              <el-option label="评论ID" value="id"></el-option>
              <el-option label="点赞数" value="dzs"></el-option>
              <el-option label="评论数" value="pls"></el-option>
              <el-option label="分享数" value="fxs"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getAllCommentInfoData()"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table
        :data="listQuery.tableData"
        style="width: 100%"
        @sort-change="tableSortChange"
        v-loading="loading"
      >
        <el-table-column prop="id" label="ID" sortable="custom"></el-table-column>
        <el-table-column prop="time" label="发布时间" sortable="custom"></el-table-column>
        <el-table-column prop="owner" label="发布者昵称" sortable="custom" empty-text="无"></el-table-column>
        <el-table-column prop="stunum" label="发布者学号" sortable="custom"></el-table-column>
        <el-table-column prop="dzs" label="点赞数" sortable="custom"></el-table-column>
        <el-table-column prop="pls" label="评论数" sortable="custom"></el-table-column>
        <el-table-column prop="fxs" label="分享数" sortable="custom"></el-table-column>
        <el-table-column prop="content" label="发布内容" sortable="custom" width="320px;"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteComment(scope.$index, scope.row)">删除</el-button>
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
import { getAllCommentInfo, deleteComment } from '../request/api'

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
        selectedKey: 'stunum', //搜索列名
        selectedValue: '' //搜索关键词
      }
    }
  },
  components: {
    HeadTop
  },
  methods: {
    //获取所有评论数据
    getAllCommentInfoData() {
      this.loading = true
      if (
        this.listQuery.selectedKey === 'owner' ||
        this.listQuery.selectedKey === 'content'
      ) {
        this.listQuery.selectedValue = window.escape(
          this.listQuery.selectedValue
        )
      }
      getAllCommentInfo({
        m: 'comment',
        a: 'getAllCommentInfo',
        pageIndex: this.listQuery.pageIndex,
        pageSize: this.listQuery.pageSize,
        sortKey: this.listQuery.sortKey,
        sortValue: this.listQuery.sortValue,
        selectedKey: this.listQuery.selectedKey,
        selectedValue: this.listQuery.selectedValue
      })
        .then(res => {
          this.listQuery.total = res.total - 0
          res = JSON.parse(res.commentInfo)
          for (const key of res) {
            key.owner = window.unescape(key.owner)
            key.content = window.unescape(key.content)
          }
          this.listQuery.tableData = res
          this.loading = false
        })
        .catch(() => {
          this.$message.error('查询数据失败！')
          this.loading = false
        })
        .finally(() => {
          if (
            this.listQuery.selectedKey === 'owner' ||
            this.listQuery.selectedKey === 'content'
          ) {
            this.listQuery.selectedValue = window.unescape(
              this.listQuery.selectedValue
            )
          }
        })
    },
    //改变页码回调
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getAllCommentInfoData()
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
      this.getAllCommentInfoData()
    },
    //删除评论
    deleteComment(index, row) {
      deleteComment({
        m: 'comment',
        a: 'deleteComment',
        id: row.id
      }).then(res => {
        if (res.status === 'SUCCESS') {
          this.$message.success('删除评论成功！')
          this.dialogFormVisible = false
          this.getAllCommentInfoData()
        } else {
          this.$message.error('删除评论失败！')
        }
      })
    }
  },
  mounted() {
    this.getAllCommentInfoData()
  }
}
</script>

<style>
#comment-info {
  margin-bottom: 80px;
}
.comment-container {
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
