<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useChatStore } from '@/stores/chat'

const storeAuth = useAuthStore()
const chatStore = useChatStore()
const router = useRouter()

const userSignUpData = ref({
  email: '',
  nickname: '',
  password: '',
  passwordRepeat: ''
})

const onSubmit = async () => {
  if (
    !userSignUpData.value.email ||
    !userSignUpData.value.nickname ||
    !userSignUpData.value.password ||
    !userSignUpData.value.passwordRepeat
  ) {
    alert('Fields should not be empty')
  } else if (userSignUpData.value.password !== userSignUpData.value.passwordRepeat) {
    alert('Passwords should be similar')
  } else {
    await storeAuth.registerUser(userSignUpData.value)
    await chatStore.loadCurrentUser(storeAuth.user.uid) //Тут что-то не то с uid
    router.push('/chatlist')
  }
}
</script>

<template>
  <div class="container">
    <header class="auth-header"><img src="@/assets/logo.svg" alt="" /></header>
    <main class="login-form">
      <h1 class="mb-24">Sign Up</h1>
      <!-- <div class="upload-avatar mb-24">
        <span>Add avatar</span>
        <input type="file" class="upload-field" />
      </div> -->
      <form @submit.prevent="onSubmit">
        {{ userSignUpData.email }}
        <input type="email" placeholder="Email" v-model="userSignUpData.email" class="mb-24" />
        <input type="text" placeholder="Nickname" v-model="userSignUpData.nickname" class="mb-24" />
        {{ userSignUpData.password }}
        <input
          type="password"
          placeholder="Password"
          v-model="userSignUpData.password"
          class="mb-24"
        />
        {{ userSignUpData.passwordRepeat }}
        <input
          type="password"
          placeholder="Repeat password"
          v-model="userSignUpData.passwordRepeat"
          class="mb-24"
        />
        <div class="form-controls">
          <button class="btn" @click="onSubmit.prevent">Sign up</button>
          <RouterLink to="/">I have an account</RouterLink>
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
  display: flex;
  flex-direction: column;
  align-items: center;
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

.upload-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 104px;
  width: 104px;
  background: var(--darker-background);
  border-radius: 100%;
  cursor: pointer;
}

.upload-avatar:hover {
  background: var(--dark-background);
}

.upload-avatar span {
  color: var(--primary-color);
}

.upload-avatar .upload-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
