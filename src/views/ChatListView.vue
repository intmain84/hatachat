<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline'
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import ChatPreview from '@/components/ChatPreview.vue'

import { ref, onBeforeMount } from 'vue'
import { RouterView, RouterLink, useRouter, useRoute } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth'

const storeChat = useChatStore()
const storeAuth = useAuthStore()

const router = useRouter()
const route = useRoute()

const noChatSelected = ref(true)

const userActive = ref(false)

const handleVisibilityChange = async () => {
  if (document.hidden) {
    userActive.value = false
  } else {
    userActive.value = true
  }
  await storeAuth.changeUserStatus(userActive.value)
}

// Add event listener for visibility change
document.addEventListener('visibilitychange', handleVisibilityChange)

const showChatRoom = (userId) => {
  noChatSelected.value = false
  router.push({ name: 'chatroom', params: { chatId: userId } })
}

const logout = async () => {
  await storeAuth.changeUserStatus(false)
  router.push({ name: 'home' })
}

onBeforeMount(async () => {
  await storeChat.setChatPreviews()
  await handleVisibilityChange()
})
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
            v-for="chat in storeChat.chatPreviews"
            :key="chat.id"
            :chat="chat"
            @click.prevent="showChatRoom(chat.id)"
            :class="{ activeChat: chat.id === route.params.chatId }"
          />
        </ul>
      </div>
      <footer class="sidebar-footer">
        <RouterLink :to="{ name: 'myaccount' }" :class="{ activeChat: route.name === 'myaccount' }"
          ><UserCircleIcon class="icon24" /> My account</RouterLink
        >
        <a href="#" @click.prevent="logout"><ArrowRightOnRectangleIcon class="icon24" /> Logout</a>
      </footer>
    </aside>
    <main class="main">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped>
.activeChat {
  background: var(--darker-background);
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
  margin-bottom: 8px;
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
