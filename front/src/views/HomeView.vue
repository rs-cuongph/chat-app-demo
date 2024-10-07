<template>
  <div class="common-layout h-dvh">
    <el-container class="h-dvh">
      <el-header height="auto">
        <div class="flex justify-between py-4 border-b">
          <el-avatar class="ml-auto" :size="30" src="https://avatar.iran.liara.run/public/34" />
        </div>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <div class="bg-white border-r border-gray-300 overflow-y-auto">
            <div class="flex justify-center p-4 font-bold text-xl border-b border-gray-300">
              Rooms
              <el-button
                class="ml-auto"
                type="primary"
                @click="isVisible = true"
                :icon="Edit"
                circle
              />
            </div>
            <div class="p-4">
              <el-input
                v-model="search.keyword"
                placeholder="Please input keyword"
                :prefix-icon="Search"
              />
            </div>
            <MessageItem
              :class="{ 'bg-blue-100': selectedChat === chat.id }"
              v-for="(chat, index) in chats"
              :key="chat.id"
              :message="chat"
              @click="selectedChat = chat.id"
            ></MessageItem>
          </div>
        </el-aside>
        <el-main
          ><div class="h-full flex-1 flex flex-col">
            <template v-if="selectedChat">
              <div class="p-4 border-b border-gray-300 font-bold">
                {{ selectedChatName }}
              </div>
              <div class="flex-1 p-4 overflow-y-auto"></div>
              <form @submit.prevent="sendMessage" class="p-4 border-t border-gray-300 flex">
                <el-input
                  v-model="message"
                  :rows="2"
                  type="textarea"
                  placeholder="Type a message..."
                  class="flex-1 border-gray-300 rounded-l-md"
                />
                <el-button class="ml-2" type="primary"> Send </el-button>
              </form>
            </template>
            <div v-else class="flex-1 flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          </div></el-main
        >
      </el-container>
    </el-container>

    <!-- Dialog create -->
    <el-dialog v-model="isVisible" title="Create group" width="500" destroy-on-close>
      <div>
        <strong>Group name</strong>
        <el-input v-model="group.name" placeholder="Please input group name" />
      </div>
      <div>
        <strong>Users</strong>
        <el-select v-model="group.users" multiple placeholder="Select">
          <el-option v-for="user in users" :key="user.id" :label="user.userName" :value="user.id" />
        </el-select>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isVisible = false">Cancel</el-button>
          <el-button type="primary" @click="isVisible = false"> Create </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Edit, Search } from '@element-plus/icons-vue'
import { computed, defineComponent, ref } from 'vue'
import MessageItem from '@/components/MessageItem.vue'

export default defineComponent({
  name: 'Home',
  components: {
    MessageItem
  },
  setup() {
    const chats = ref([
      {
        id: 1,
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        avatar: 'https://avatar.iran.liara.run/public/34'
      },
      {
        id: 2,
        name: 'Jane Smith',
        lastMessage: 'Did you see the new movie?',
        avatar: 'https://avatar.iran.liara.run/public/13'
      },
      {
        id: 3,
        name: 'Bob Johnson',
        lastMessage: 'Meeting at 3 PM',
        avatar: 'https://avatar.iran.liara.run/public/5'
      }
    ])
    const selectedChat = ref(0)
    const message = ref('')
    const isVisible = ref(false)
    const group = ref({
      name: '',
      users: []
    })

    const search = ref({
      keyword: ''
    })

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

    const selectedChatName = computed(() => {
      const chat = chats.value.find((chat) => chat.id === selectedChat.value)
      return chat ? chat.name : ''
    })

    const sendMessage = () => {
      if (message.value.trim()) {
        message.value = ''
      }
    }

    return {
      group,
      search,
      isVisible,
      chats,
      selectedChat,
      message,
      selectedChatName,
      sendMessage,
      Edit,
      Search,
      users
    }
  }
})
</script>
