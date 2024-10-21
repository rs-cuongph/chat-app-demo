<template>
  <div>
    <div class="flex justify-between">
      <h2 class="text-xl font-bold mb-4">Room Chat
        Management
      </h2>
      <el-button @click="handleAdd" type="primary"
        :icon="CirclePlus">
        Add
      </el-button>
    </div>
    <el-table height="400px" stripe :data="rooms"
      header-row-class-name="custom-table"
      style="width: 100%; border: solid 1px #ccc; border-radius: 4px"
      highlight-current-row>
      <el-table-column prop="userName" label="User" />
      <el-table-column prop="roomName" label="Room Name" />
      <el-table-column fixed="right" label="Operations"
        width="200">
        <template #header>
          <el-input v-model="search" size="small"
            placeholder="Type to search" />
        </template>
        <template #default="scope">
          <el-button type="primary" :icon="Edit"
            @click="handleClickEdit(scope.row)" />
          <el-button type="primary" :icon="View"
            @click="handleClickView(scope.row)" />
          <el-button type="danger" :icon="Delete"
            @click="handleClickDelete(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- Dialog create -->
    <CommonDialog :visible="isVisible"
      :headerTitle="dialogTitle" width="500">
      <template #content>
        <div>
          <strong>Group name</strong>
          <el-input v-model="group.name"
            placeholder="Please input group name" />
        </div>
        <div>
          <strong>Users</strong>
          <el-select v-model="group.users" multiple
            placeholder="Select">
            <el-option v-for="user in users" :key="user.id"
              :label="user.userName" :value="user.id" />
          </el-select>
        </div>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="onCancel">Cancel</el-button>
          <el-button type="primary"
            @click="onSubmit">Submit</el-button>
        </div>
      </template>
    </CommonDialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  Delete,
  Edit,
  CirclePlus,
  View,
} from '@element-plus/icons-vue'
import CommonDialog from '../modecules/CommonDialog.vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
export default defineComponent({
  name: 'RoomChat',
  components: {
    CommonDialog
  },
  setup() {

    const router = useRouter();
    const isVisible = ref(false)
    const dialogTitle = ref('')
    const defaultValue = {
      name: '',
      users: []
    }
    const group = ref(defaultValue)
    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }
    const users = [
      { userName: 'Phan Cường', id: 1 },
      { userName: 'Nguyễn Văn Trung', id: 2 },
      { userName: 'Trần Thị Bích', id: 3 },
      { userName: 'Lê Minh Tuấn', id: 4 },
      { userName: 'Hoàng Thị Hương', id: 5 },
      { userName: 'Nguyễn Thị Lan', id: 6 },
      { userName: 'Đặng Văn Nam', id: 7 },
      { userName: 'Phạm Thị Mai', id: 8 },
      { userName: 'Vũ Văn Khải', id: 9 },
      { userName: 'Bùi Thị Hoa', id: 10 }
    ]
    const rooms = ref([
      { userName: 'Phan Cường', roomName: 'Room A', id: 11 },
      { userName: 'Nguyễn Văn Trung', roomName: 'Room B', id: 12 },
      { userName: 'Trần Thị Bích', roomName: 'Room C', id: 13 },
      { userName: 'Lê Minh Tuấn', roomName: 'Room D', id: 14 },
      { userName: 'Hoàng Thị Hương', roomName: 'Room E', id: 15 },
      { userName: 'Nguyễn Thị Lan', roomName: 'Room F', id: 16 }
    ]);
    const handleClick = () => {
      isVisible.value = true;
    }
    const handleAdd = () => {
      dialogTitle.value = 'Create group';
      isVisible.value = true;

    }
    
    const handleClickView = (record: any) => {
      router.push('/');
    }

    const handleClickEdit = (record: any) => {
      dialogTitle.value = 'Edit group';
      group.value.name = record.roomName;
      group.value.users = [record.userName];
      isVisible.value = true;
    }

    const handleClickDelete = (record: any) => {
      ElMessageBox.confirm(`Are you sure you want to delete ${record.roomName}?`, 'Delete user',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        })
        .then(() => {
          rooms.value = rooms.value.filter(room => room.id !== record.id);
          ElMessage({
            type: 'success',
            message: 'Delete completed',
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled',
          })
        })
    }

    const onSubmit = () => {
      group.value = defaultValue;
      isVisible.value = false;
    }

    const onCancel = () => {
      group.value = defaultValue;
      isVisible.value = false;
    }

    return {
      handleClickView,
      dialogTitle,
      handleClickEdit,
      handleClickDelete,
      onSubmit,
      onCancel,
      handleClick,
      handleAdd,
      group,
      isVisible,
      users,
      rooms,
      Edit,
      Delete,
      CirclePlus,
      View,
      handleSizeChange,
      handleCurrentChange,
    };
  }
});
</script>

<style>
.custom-table th {
  background: var(--el-fill-color-light) !important;

}

.custom-table th .cell {
  font-weight: 600;
}
</style>
