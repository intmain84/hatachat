<script setup>
import { useChatStore } from '@/stores/chat'
const storeChat = useChatStore()
</script>

<template>
  <div class="nochat">
    <div class="avatars-block">
      <img v-if="storeChat.user.avatar" class="avatar" :src="storeChat.user.avatar" />
      <div v-else class="avatar" :style="{ backgroundColor: storeChat.user.avatarBg }">
        <!-- {{ storeChat.user.nickname.charAt(0).toUpperCase() }} -->
      </div>
    </div>
    <h1 class="mb-16">Hey, {{ storeChat.getCurrentUserNickname + '😀' }}!</h1>
    <p>Choose anyone and start chatting</p>
  </div>
</template>

<style scoped>
.avatars-block {
  display: flex;
  justify-content: center;
}
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  width: 104px;
  height: 104px;
  border-radius: 100%;
  margin-bottom: 24px;
}
.nochat {
  text-align: center;
}
</style>
