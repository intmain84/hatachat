<script setup>
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'

const store = useChatStore()
const router = useRouter()

onBeforeMount(async () => {
  await store.loadCurrentUser('mxQ5P8SC6ucwFmlh7uBJ')
  router.push('/chatlist')
})
</script>

<template>
  <div class="container">
    <header class="auth-header"><img src="@/assets/logo.svg" alt="" /></header>
    <main class="login-form">
      <form action="">
        <h1 class="mb-24">Login</h1>
        <input type="text" placeholder="Email" class="mb-24" />
        <input type="password" placeholder="Password" class="mb-24" />
        <div class="form-controls">
          <RouterLink class="btn" to="/chatlist">Login</RouterLink>
          <RouterLink to="/signup">Create an account</RouterLink>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
.auth-header {
  height: 64px;
  text-align: center;
  margin-top: 40px;
}

.login-form {
  max-width: 400px;
  justify-self: center;
  text-align: center;
}

.login-form .form-controls {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.login-form .form-controls:last-child {
  font-weight: 500;
}
</style>
