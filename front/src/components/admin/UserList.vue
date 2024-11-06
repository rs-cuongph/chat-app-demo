<template>
  <div>
    <div class="flex justify-between">
      <h2 class="text-xl font-bold mb-4">User List
        Management
      </h2>
      <el-button @click="handleAdd" type="primary"
        :icon="CirclePlus">
        Add
      </el-button>
    </div>
    <el-table height="400px" stripe :data="users"
      header-row-class-name="custom-table"
      style="width: 100%; border: solid 1px #ccc; border-radius: 4px"
      highlight-current-row>
      <el-table-column prop="userName" label="User" />
      <el-table-column prop="rooms.roomName" label="Room Name" />
      <el-table-column fixed="right" label="Operations"
        width="200">
        <template #header>
          <el-input v-model="searchValue" size="small"
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
      headerTitle="Create User" width="500">
      <template #content>
        <div>
          <strong>User name</strong>
          <el-input v-model="group.name"
            placeholder="Please input User name" />
        </div>
        <div>
          <strong>Rooms</strong>
          <el-select v-model="group.rooms" multiple
            placeholder="Select">
            <el-option v-for="room in rooms"
              :key="room.roomId" :label="room.roomName"
              :value="room.roomId" v-model="room.roomId" />
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
import CommonDialog from '../modecules/CommonDialog.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Delete,
  Edit,
  CirclePlus,
  View,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'UserList',
  components: {
    CommonDialog
  },
  setup() {
    const searchValue = ref('')
    const isVisible = ref(false)
    const router = useRouter();
    const dialogTitle = ref('')
    const defaultValue = {
      name: '',
      rooms: []
    }
    const group = ref(defaultValue)
    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }

    const users = ref([
      { userName: 'Phan Cường', id: 1, rooms: { roomName: 'Room A', roomId: 11 } },
      { userName: 'Nguyễn Văn Trung', id: 2, rooms: { roomName: 'Room B', roomId: 12 } },
      { userName: 'Trần Thị Bích', id: 3, rooms: { roomName: 'Room C', roomId: 13 } },
      { userName: 'Lê Minh Tuấn', id: 4, rooms: { roomName: 'Room A', roomId: 14 } },
      { userName: 'Hoàng Thị Hương', id: 5, rooms: { roomName: 'Room D', roomId: 15 } },
      { userName: 'Nguyễn Thị Lan', id: 6, rooms: { roomName: 'Room A', roomId: 16 } },
      { userName: 'Đặng Văn Nam', id: 7, rooms: { roomName: 'Room B', roomId: 17 } },
      { userName: 'Phạm Thị Mai', id: 8, rooms: { roomName: 'Room A', roomId: 18 } },
      { userName: 'Vũ Văn Khải', id: 9, rooms: { roomName: 'Room A', roomId: 19 } },
      { userName: 'Bùi Thị Hoa', id: 10, rooms: { roomName: 'Room A', roomId: 2 } }
    ])

    const rooms = ref([
      { roomName: 'Room A', roomId: 11 },
      { roomName: 'Room B', roomId: 12 },
      { roomName: 'Room C', roomId: 13 },
      { roomName: 'Room D', roomId: 14 },
      { roomName: 'Room E', roomId: 15 },
      { roomName: 'Room F', roomId: 16 },
      { roomName: 'Room G', roomId: 17 },
      { roomName: 'Room H', roomId: 18 },
      { roomName: 'Room J', roomId: 19 },
      { roomName: 'Room K', roomId: 20 },
    ]);

    const handleClickView = (record: any) => {
      router.push('/');
    }

    const handleClickEdit = (record: any) => {
      dialogTitle.value = 'Edit User';
      group.value.name = record.userName;
      group.value.rooms = [record.rooms.roomId];
      isVisible.value = true;
    }

    const handleClickDelete = (record: any) => {
      ElMessageBox.confirm(`Are you sure you want to delete ${record.userName}?`, 'Delete user',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        })
        .then(() => {
          users.value = users.value.filter(room => room.id !== record.id);
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

    const handleAdd = () => {
      dialogTitle.value = 'Create User';
      isVisible.value = true;
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
      onSubmit,
      onCancel,
      handleClickView,
      handleClickEdit,
      handleClickDelete,
      handleAdd,
      group,
      searchValue,
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
