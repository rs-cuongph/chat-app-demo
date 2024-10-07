<template>
  <div class="flex flex-col items-center justify-center h-screen bg-slate-200">
    <div class="bg-surface-0 py-10 px-6 rounded-xl shadow-xl w-[360px] bg-white">
      <form @submit.prevent="login" class="login-form">
        <div class="h-[200px] bg-[url(@/assets/banner.jpg)] bg-cover mb-4" />
        <el-input v-model="formState.email" placeholder="Please input email" />
        <el-input
          v-model="formState.password"
          type="password"
          placeholder="Please input password"
          show-password
          class="mt-2"
        />
        <el-button type="primary" class="mt-2 w-full" :loading="loading" @click="login"
          >Login</el-button
        >
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const formState = ref({
      email: '',
      password: ''
    })
    const loading = ref(false)

    const login = () => {
      router.push('/')
    }

    return {
      formState,
      loading,
      login
    }
  }
})
</script>
