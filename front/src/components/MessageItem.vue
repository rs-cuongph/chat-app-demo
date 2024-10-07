<template>
  <div class="p-4 border-b flex border-gray-300 cursor-pointer hover:bg-gray-100">
    <div class="w-10 h-10 rounded-full ring-1 flex items-center justify-center">
      <el-avatar :src="message?.avatar" class="w-full h-full rounded-full" />
    </div>
    <div class="ml-2">
      <div class="font-semibold">{{ message?.name }}</div>
      <div class="text-sm text-gray-500">{{ message?.lastMessage }}</div>
    </div>
    <div class="ml-auto">
      <div class="w-3 h-3 bg-blue-500 rounded-full inline-block ml-1"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'MessageItem',
  props: {
    message: {
      type: Object
    }
  },
  setup() {
    return {}
  }
})
</script>
<!-- 
<div
        v-for="chat in chats"
        :key="chat.id"
        class="p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100"
        :class="{ 'bg-blue-100': selectedChat === chat.id }"
        @click="selectedChat = chat.id"
      >
        <div class="font-semibold">{{ chat.name }}</div>
        <div class="text-sm text-gray-500">{{ chat.lastMessage }}</div>
      </div> -->
