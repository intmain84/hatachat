<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  chat: {
    type: Object,
    required: true
  }
}) //chat приходит из ChatListView.vue

const { chat } = toRefs(props)
</script>

<template>
  <li>
    <a href="#" class="user-preview">
      <img v-if="chat.avatar" class="avatar" :src="chat.avatar" />
      <div v-else class="avatar" :style="{ backgroundColor: chat.avatarBg }">
        {{ chat.nickname.charAt(0).toUpperCase() }}
      </div>
      <div class="text-data">
        <div class="message-info">
          <div class="nickname">{{ chat.nickname }}</div>
          <div class="message-info">
            <!-- <span v-if="chat.newMessages" class="new-messages">{{ chat.newMessages }}</span
            ><span class="message-time">{{ chat.lastMessage.createdAtTime }}</span> -->
          </div>
        </div>
        <!-- <div v-if="chat.lastMessage.text" class="message-preview">
          {{ chat.lastMessage.fromUser === store.currentUser ? 'You' : chat.nickname }}:
          {{ chat.lastMessage.text }}
        </div> -->
        <div class="message-preview">{{ chat.status === true ? 'On 🟢' : 'Off 🔴' }}</div>
      </div>
    </a>
  </li>
</template>

<style scoped>
.chatlist .user-preview {
  display: flex;
  align-items: center;
  color: #fff;
  padding: 16px;
  font-size: 0.75rem;
}
.chatlist .user-preview:hover {
  background: var(--darker-background);
}
.chatlist .user-preview .text-data {
  display: flex;
  flex-direction: column;
  width: 208px;
}

.chatlist .user-preview .avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 8px;
}

.chatlist .user-preview .message-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.chatlist .user-preview .text-data .message-info .nickname {
  font-size: 1rem;
  font-weight: bold;
}

.chatlist .user-preview .message-info .new-messages {
  background: #936ac8;
  border-radius: 8px;
  padding: 2px 5px;
  margin-right: 8px;
}

.chatlist .user-preview .message-preview {
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* Удалить этот коммент */
</style>
