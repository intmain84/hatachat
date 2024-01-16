<script setup>
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import LastMessage from '@/components/LastMessage.vue'
import { ref, toRefs, onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'

const storeChat = useChatStore()

const props = defineProps({
  chat: {
    type: Object,
    required: true
  }
}) //chat приходит из ChatListView.vue

let typesMessage = ref('')
const { chat } = toRefs(props)

onMounted(async () => {
  onSnapshot(doc(db, 'users', storeChat.user.id), (doc) => {
    ;[typesMessage.value] = doc.data().typesNow
      ? doc.data().typesNow.filter((id) => id === chat.value.id)
      : ''
  })
})
</script>

<template>
  <li>
    <a href="#" class="user-preview">
      <div
        class="user-status"
        :style="{ backgroundColor: chat.status === true ? '#43bb65' : '#e74444' }"
      ></div>
      <img v-if="chat.avatar" class="avatar" :src="chat.avatar" />
      <div v-else class="avatar" :style="{ backgroundColor: chat.avatarBg }">
        {{ chat.nickname.charAt(0).toUpperCase() }}
      </div>
      <div class="text-data">
        <div class="message-info">
          <div class="nickname">{{ chat.nickname }}</div>
          <div v-if="chat.nickname" class="message-info"></div>
        </div>
        <!-- Тут нужно вытаскивать isTyping из коллекции statuses. Сейчас тут он достается из коллекции users, но там его нет -->
        <!-- <StatusTyping
          v-if="storeChat.user.typesNow.includes(chat.id)"
          class="message-preview"
        ></StatusTyping> -->
        <!-- ПОХОДУ ОН НЕ ДОСТАЕТ ИНФУ О ТЕКУЩЕМ ЮЗЕРЕ В РЕАЛЬНОМ ВРЕМЕНИ И НАДО КАК В LastMessage делать onSnapshot И ВЫТАСКИВАТЬ typesNow В РЕАЛ ТАЙМЕ -->
        <div v-if="typesMessage">is typing...</div>
        <LastMessage v-else :chat="chat" class="message-preview"></LastMessage>
      </div>
    </a>
  </li>
</template>

<style scoped>
.chatlist .user-preview {
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  padding: 16px;
  font-size: 0.75rem;
}

.user-status {
  position: absolute;
  bottom: 16px;
  width: 12px;
  height: 12px;
  border-radius: 4444px;
  border: 2px solid var(--darkest-background);
}

.chatlist .user-preview:hover {
  background: var(--darker-background);
}

.chatlist .user-preview:hover .user-status {
  border: 2px solid var(--darker-background);
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
