<template>
  <div id="goods-info">
    <head-top></head-top>
    <div class="goods-container">
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
              <el-option label="发布者学号" value="owner"></el-option>
              <el-option label="商品名称" value="item_name"></el-option>
              <el-option label="发布时间" value="time"></el-option>
              <el-option label="商品类型" value="type"></el-option>
              <el-option label="商品ID" value="id"></el-option>
              <el-option label="价格" value="price"></el-option>
              <el-option label="是否为推荐(0或1)" value="tj"></el-option>
              <el-option label="是否已售出(0或1)" value="buyer"></el-option>
              <el-option label="发布者电话" value="phone"></el-option>
              <el-option label="发布者微信昵称" value="nickname"></el-option>
              <el-option label="商品描述" value="description"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getAllItemInfoData()"></el-button>
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
              <el-form-item label="商品原价">
                <span>{{ props.row.original_price }}</span>
              </el-form-item>
              <el-form-item label="商品浏览数">
                <span>{{ props.row.visit_num }}</span>
              </el-form-item>
              <el-form-item label="商品点赞数">
                <span>{{ props.row.like_num }}</span>
              </el-form-item>
              <el-form-item label="发布者昵称">
                <span>{{ props.row.nickname }}</span>
              </el-form-item>
              <el-form-item label="发布者电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id" sortable="custom"></el-table-column>
        <el-table-column label="发布时间" prop="time" sortable="custom"></el-table-column>
        <el-table-column label="商品名称" prop="item_name" sortable="custom"></el-table-column>
        <el-table-column label="商品价格" prop="price" sortable="custom"></el-table-column>
        <el-table-column
          label="商品是否售出"
          prop="buyer"
          sortable="custom"
          :formatter="formatterItemBuyer"
        ></el-table-column>
        <el-table-column label="是否为推荐商品" prop="tj" sortable="custom" :formatter="formatterItemTj"></el-table-column>
        <el-table-column label="商品类型" prop="type" sortable="custom"></el-table-column>
        <el-table-column label="发布者学号" prop="owner" sortable="custom"></el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" @click="editUserInfo(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteItem(scope.$index, scope.row)">删除</el-button>
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

      <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible" top="20px">
        <el-form :model="selectTable">
          <el-form-item label="ID" label-width="100px">
            <el-input v-model="selectTable.id" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" label-width="100px">
            <el-input v-model="selectTable.price"></el-input>
          </el-form-item>
          <el-form-item label="商品原价" label-width="100px">
            <el-input v-model="selectTable.original_price"></el-input>
          </el-form-item>
          <el-form-item label="发布者电话" label-width="100px">
            <el-input v-model="selectTable.phone"></el-input>
          </el-form-item>
          <el-form-item label="是否推荐商品" label-width="100px">
            <el-select v-model="selectTable.tj" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品是否售出" label-width="100px">
            <el-select v-model="selectTable.buyer" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品类型" label-width="100px">
            <el-select v-model="selectTable.type" placeholder="请选择">
              <el-option label="图书杂志" value="图书杂志"></el-option>
              <el-option label="数码电器" value="数码电器"></el-option>
              <el-option label="服装鞋帽" value="服装鞋帽"></el-option>
              <el-option label="个护化妆" value="个护化妆"></el-option>
              <el-option label="运动户外" value="运动户外"></el-option>
              <el-option label="代步工具" value="代步工具"></el-option>
              <el-option label="其他品类" value="其他品类"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品描述" label-width="100px">
            <el-input type="textarea" v-model="selectTable.description"></el-input>
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
import { getAllItemInfo, updateItemInfo, deleteItem } from '../request/api'

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
        selectedKey: 'owner', //搜索列名
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
    //获取所有商品数据
    getAllItemInfoData() {
      this.loading = true
      getAllItemInfo({
        m: 'item',
        a: 'getAllItemInfo',
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
          this.listQuery.tableData = JSON.parse(res.itemInfo)
          this.loading = false
        })
        .catch(() => {
          this.$message.error('查询数据失败！')
          this.loading = false
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
      this.getAllItemInfoData()
    },
    //改变页码回调
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.getAllItemInfoData()
    },
    //编辑商品信息
    editUserInfo(index, row) {
      this.dialogFormVisible = true
      this.selectTable = row
      window.console.log(index, row)
    },
    //删除商品
    deleteItem(index, row) {
      window.console.log(index, row)
      deleteItem({
        m: 'item',
        a: 'deleteItem',
        id: row.id
      }).then(res => {
        window.console.log(res)
        if (res.status == 'SUCCESS') {
          this.$message.success('删除商品成功！')
          this.dialogFormVisible = false
          this.getAllItemInfoData()
        } else {
          this.$message.error('删除商品失败！')
        }
      })
    },
    //更新商品信息
    updateUserInfo() {
      updateItemInfo({
        m: 'item',
        a: 'updateItemInfo',
        id: this.selectTable.id,
        price: this.selectTable.price,
        original_price: this.selectTable.original_price,
        phone: this.selectTable.phone,
        tj: this.selectTable.tj,
        buyer: this.selectTable.buyer,
        type: this.selectTable.type,
        description: this.selectTable.description
      }).then(res => {
        window.console.log(res)
        if (res.status === 'SUCCESS') {
          this.$message.success('保存商品信息成功！')
          this.dialogFormVisible = false
          this.getAllItemInfoData()
        } else {
          this.$message.error('保存商品信息失败！')
        }
      })
    },
    //格式化商品是否为推荐数据
    formatterItemTj(row) {
      return row.tj == 1 ? '是' : '否'
    },
    //格式化商品是否已售出数据
    formatterItemBuyer(row) {
      return row.buyer == 1 ? '是' : '否'
    }
  },
  mounted() {
    this.getAllItemInfoData()
  }
}
</script>

<style>
#goods-info {
  margin-bottom: 80px;
}
.goods-container {
  padding: 30px 80px;
  position: relative;
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
