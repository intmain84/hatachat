<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth'

const store = useChatStore()
const storeAuth = useAuthStore()
const router = useRouter()

// onBeforeMount(async () => {
//   await store.loadCurrentUser(storeAuth.user.uid)
//   router.push('/chatlist')
// })

const userLoginData = ref({
  email: '',
  password: ''
})

const onSubmit = async () => {
  if (!userLoginData.value.email || !userLoginData.value.password) {
    alert('Enter email and password')
  } else {
    await storeAuth.loginUser(userLoginData.value)
    await store.loadCurrentUser(storeAuth.user.uid)
    router.push('/chatlist')
  }
}
</script>

<template>
  <div class="container">
    <header class="auth-header"><img src="@/assets/logo.svg" alt="" /></header>
    <main class="login-form">
      <form @submit.prevent="onSubmit">
        <h1 class="mb-24">Login</h1>
        <input type="text" placeholder="Email" v-model="userLoginData.email" class="mb-24" />
        <input
          type="password"
          placeholder="Password"
          v-model="userLoginData.password"
          class="mb-24"
        />
        <div class="form-controls">
          <button class="btn" @click="onSubmit.prevent">Sign in</button>
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
