<script setup>
import { useChatStore } from '@/stores/chat'
const store = useChatStore()
</script>

<template>
  <div class="nochat">
    <h1 class="mb-16">Hey, {{ store.getCurrentUserNickname }}!</h1>
    <p>Choose anyone and start chatting</p>
  </div>
</template>

<style scoped>
.nochat {
  text-align: center;
}
</style>
