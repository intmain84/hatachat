<script setup></script>

<template>
  <div class="container">
    <header class="auth-header"><img src="@/assets/logo.svg" alt="" /></header>
    <main class="login-form">
      <h1 class="mb-24">Sign Up</h1>
      <div class="upload-avatar mb-24">
        <span>Add avatar</span>
        <input type="file" class="upload-field" />
      </div>
      <form action="">
        <input type="email" placeholder="Email" class="mb-24" />
        <input type="text" placeholder="Nickname" class="mb-24" />
        <input type="password" placeholder="Password" class="mb-24" />
        <input type="password" placeholder="Repeat password" class="mb-24" />
        <div class="form-controls">
          <RouterLink class="btn" to="/signup">Sign up</RouterLink>
          <RouterLink to="/">I have an account</RouterLink>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  height: 100vh;
}

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
