
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="sender" prop="sender"><el-input
            v-model="queryParams.sender"
            placeholder="请输入sender"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="spu_id" prop="spuId"><el-input
            v-model="queryParams.spuId"
            placeholder="请输入spu_id"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="spu_name" prop="spuName"><el-input
            v-model="queryParams.spuName"
            placeholder="请输入spu_name"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="shop_id" prop="shopId"><el-input
            v-model="queryParams.shopId"
            placeholder="请输入shop_id"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="shop_name" prop="shopName"><el-input
            v-model="queryParams.shopName"
            placeholder="请输入shop_name"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="remove" prop="remove"><el-input
            v-model="queryParams.remove"
            placeholder="请输入remove"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item label="youhui" prop="youhui"><el-input
            v-model="queryParams.youhui"
            placeholder="请输入youhui"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:firstDdDetail:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:firstDdDetail:edit']"
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:firstDdDetail:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table v-loading="loading" :data="firstDdDetailList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" /><el-table-column
            label="sender"
            align="center"
            prop="sender"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="spu_id"
            align="center"
            prop="spuId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="spu_name"
            align="center"
            prop="spuName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="shop_id"
            align="center"
            prop="shopId"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="shop_name"
            align="center"
            prop="shopName"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="send_time"
            align="center"
            prop="sendTime"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.sendTime) }}</span>
            </template>
          </el-table-column><el-table-column
            label="remove"
            align="center"
            prop="remove"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="youhui"
            align="center"
            prop="youhui"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要修改吗?"
                confirm-button-text="修改"
                @confirm="handleUpdate(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:firstDdDetail:edit']"
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                >修改
                </el-button>
              </el-popconfirm>
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要删除吗?"
                confirm-button-text="删除"
                @confirm="handleDelete(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:firstDdDetail:remove']"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                >删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />

        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">

            <el-form-item label="sender" prop="sender">
              <el-input
                v-model="form.sender"
                placeholder="sender"
              />
            </el-form-item>
            <el-form-item label="spu_id" prop="spuId">
              <el-input
                v-model="form.spuId"
                placeholder="spu_id"
              />
            </el-form-item>
            <el-form-item label="spu_name" prop="spuName">
              <el-input
                v-model="form.spuName"
                placeholder="spu_name"
              />
            </el-form-item>
            <el-form-item label="shop_id" prop="shopId">
              <el-input
                v-model="form.shopId"
                placeholder="shop_id"
              />
            </el-form-item>
            <el-form-item label="shop_name" prop="shopName">
              <el-input
                v-model="form.shopName"
                placeholder="shop_name"
              />
            </el-form-item>
            <el-form-item label="send_time" prop="sendTime">
              <el-date-picker
                v-model="form.sendTime"
                type="datetime"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item label="data_body" prop="dataBody">
              <el-input
                v-model="form.dataBody"
                placeholder="data_body"
              />
            </el-form-item>
            <el-form-item label="remove" prop="remove">
              <el-input
                v-model="form.remove"
                placeholder="remove"
              />
            </el-form-item>
            <el-form-item label="youhui" prop="youhui">
              <el-input
                v-model="form.youhui"
                placeholder="youhui"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import { addFirstDdDetail, delFirstDdDetail, getFirstDdDetail, listFirstDdDetail, updateFirstDdDetail } from '@/api/admin/first-dd-detail'

export default {
  name: 'FirstDdDetail',
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      firstDdDetailList: [],

      // 关系表类型

      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        sender: undefined,
        spuId: undefined,
        spuName: undefined,
        shopId: undefined,
        shopName: undefined,
        remove: undefined,
        youhui: undefined

      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: { sender: [{ required: true, message: 'sender不能为空', trigger: 'blur' }],
        spuId: [{ required: true, message: 'spu_id不能为空', trigger: 'blur' }],
        spuName: [{ required: true, message: 'spu_name不能为空', trigger: 'blur' }],
        shopId: [{ required: true, message: 'shop_id不能为空', trigger: 'blur' }],
        shopName: [{ required: true, message: 'shop_name不能为空', trigger: 'blur' }],
        remove: [{ required: true, message: 'remove不能为空', trigger: 'blur' }],
        youhui: [{ required: true, message: 'youhui不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listFirstDdDetail(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.firstDdDetailList = response.data.list
        this.total = response.data.count
        this.loading = false
      }
      )
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {

        id: undefined,
        sender: undefined,
        spuId: undefined,
        spuName: undefined,
        shopId: undefined,
        shopName: undefined,
        sendTime: undefined,
        dataBody: undefined,
        remove: undefined,
        youhui: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] = this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
    // 关系
    // 文件
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加FirstDdDetail'
      this.isEdit = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id =
                row.id || this.ids
      getFirstDdDetail(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改FirstDdDetail'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateFirstDdDetail(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addFirstDdDetail(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var Ids = (row.id && [row.id]) || this.ids

      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delFirstDdDetail({ 'ids': Ids })
      }).then((response) => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        } else {
          this.msgError(response.msg)
        }
      }).catch(function() {
      })
    }
  }
}
</script>
