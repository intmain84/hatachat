<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline'
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import ChatPreview from '@/components/ChatPreview.vue'

import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import { RouterView, useRouter } from 'vue-router'

const store = useChatStore()

const router = useRouter()

const noChatSelected = ref(true)

const showRoom = async (userId) => {
  noChatSelected.value = false
  const selectedChatRoom = await store.getChatRoom(userId)
  console.log(selectedChatRoom)
  router.push({ name: 'chatroom', params: { chatId: userId } })
}
</script>

<template>
  <div class="container">
    <aside class="sidebar">
      <div class="chatlist">
        <!-- <header class="chatlist-header">
          <a href="#" class="btn">Create a group</a>
        </header> -->
        <ul>
          <ChatPreview
            v-for="chat in store.getChatList"
            :key="chat.id"
            :chat="chat"
            @click="showRoom(chat.id)"
          />
        </ul>
      </div>
      <footer class="sidebar-footer">
        <a href="#"><UserCircleIcon class="icon24" /> My account</a>
        <a href="#"><ArrowRightOnRectangleIcon class="icon24" /> Logout</a>
      </footer>
    </aside>
    <main class="main">
      <div v-if="noChatSelected" class="nochat">
        <h1 class="mb-16">Hey, {{ store.getCurrentUser }}!</h1>
        <p>Choose anyone and start chatting</p>
      </div>
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped>
.nochat {
  text-align: center;
}
.container {
  display: grid;
  grid-template-columns: 288px auto;
  grid-gap: 8px;
  height: 100vh;
  width: 100vw;
  padding: 8px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chatlist {
  flex: 1;
  margin-bottom: 8px;
}

.chatlist ul {
  list-style: none;
  margin: 0;
  margin-top: 8px;
  padding: 0;
}

.chatlist ul li {
  display: flex;
  flex-direction: column;
}

/* Chat List */
.chatlist-header {
  padding: 16px 8px;
}

.chatlist-header + ul {
  margin-top: 0;
}

.chatlist,
.sidebar-footer {
  display: flex;
  flex-direction: column;
  background: var(--dark-elements);
  border-radius: 8px;
}

.sidebar-footer {
  padding: 16px 0;
}

.sidebar-footer a {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 16px 16px;
}

.sidebar-footer a svg {
  margin-right: 8px;
}

.sidebar-footer a:hover {
  background: var(--darker-background);
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
