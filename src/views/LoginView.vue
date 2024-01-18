<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'

const storeAuth = useAuthStore()
const storeChat = useChatStore()
const router = useRouter()

const userLoginData = ref({
  email: '',
  password: ''
})

const onSubmit = async () => {
  if (!userLoginData.value.email || !userLoginData.value.password) {
    alert('Enter email and password')
  } else {
    try {
      await storeAuth.loginUser(userLoginData.value)
      router.push('/chatlist')
    } catch (error) {
      alert(error.message)
    }
  }
}

//Сброс данных если юзер на странице Логина
onMounted(() => {
  storeChat.logOut()
})
</script>

<template>
  <div class="container">
    <header class="auth-header"><img src="@/assets/logo.svg" alt="" /></header>
    <main class="login-form">
      <form @submit.prevent="onSubmit">
        <h1 class="mb-24">Login</h1>
        <input
          type="text"
          autocomplete="email"
          id="email"
          placeholder="Email"
          v-model="userLoginData.email"
          class="mb-24"
        />
        <input
          type="password"
          id="password"
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
