<script setup>
import { useChatStore } from '@/stores/chat'
const storeChat = useChatStore()
</script>

<template>
  <div class="nochat">
    <div>
      <img v-if="storeChat.user.avatar" class="avatar" :src="storeChat.user.avatar" />
      <img v-else class="avatar" src="https://vuesax.com/avatars/avatar-1.png" />
    </div>
    <h1 class="mb-16">Hey, {{ storeChat.getCurrentUserNickname }}!</h1>
    <p>Choose anyone and start chatting</p>
  </div>
</template>

<style scoped>
.avatar {
  width: 104px;
  height: 104px;
  border-radius: 100%;
  margin-bottom: 16px;
}
.nochat {
  text-align: center;
}
</style>
