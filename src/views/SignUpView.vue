<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const storeAuth = useAuthStore()
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
    alert('Fill out all fields')
  } else if (userSignUpData.value.password !== userSignUpData.value.passwordRepeat) {
    alert('Passwords should be similar')
  } else {
    try {
      await storeAuth.registerUser(userSignUpData.value)
      router.push('/')
    } catch (error) {
      alert(error.message)
    }
  }
}
</script>

<template>
  <div class="container">
    <header class="auth-header"><img src="@/assets/logo.svg" alt="" /></header>
    <main class="login-form">
      <h1 class="mb-24">Sign Up</h1>
      <form @submit.prevent="onSubmit">
        <input type="email" placeholder="Email" v-model="userSignUpData.email" class="mb-24" />
        <input type="text" placeholder="Nickname" v-model="userSignUpData.nickname" class="mb-24" />
        <input
          type="password"
          placeholder="Password"
          v-model="userSignUpData.password"
          class="mb-24"
        />
        <input
          type="password"
          placeholder="Repeat password"
          v-model="userSignUpData.passwordRepeat"
          class="mb-24"
        />
        <div class="form-controls">
          <button class="btn" @click.prevent="onSubmit">Sign up</button>
          <RouterLink to="/">I have an account</RouterLink>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
/* вы */
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
