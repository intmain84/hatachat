<script setup>
const props = defineProps(['id', 'nickname', 'text', 'time', 'fromUser'])
</script>

<template>
  <div
    class="message-container"
    @click.right="$emit('getMessageId', $event, props.id, props.fromUser)"
  >
    <div class="nickname">{{ props.nickname }}</div>
    <div class="message">{{ props.text }}</div>
    <div class="time">{{ props.time }}</div>
  </div>
</template>

<style scoped>
.message-container .nickname {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.message-container .message {
  font-size: 1rem;
  font-weight: normal;
  margin-bottom: 8px;
  line-height: 1.5;
}

.message-container .time {
  font-size: 0.75rem;
}
</style>
