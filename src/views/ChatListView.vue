<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline'
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import UserPreview from '@/components/UserPreview.vue'
import ChatRoomView from './ChatRoomView.vue'

import { ref } from 'vue'

const chatList = ref([
  {
    id: 1,
    avatar: 'https://vuesax.com/avatars/avatar-5.png',
    nickname: 'Rustamka',
    newMessages: 1,
    messageTime: '14:35',
    message: 'Haha! You think that’s all I wante to hear'
  },
  {
    id: 2,
    avatar: 'https://vuesax.com/avatars/avatar-8.png',
    nickname: 'Igor',
    newMessages: 0,
    messageTime: '13:56',
    message: 'Salam! How you doing today?'
  },
  {
    id: 3,
    avatar: 'https://vuesax.com/avatars/avatar-7.png',
    nickname: 'Marat',
    newMessages: 1,
    messageTime: '13:47',
    message: 'Every once in a while, i will be in iMessage'
  }
])

const users = ref([
  {
    id: 1,
    avatar: 'https://vuesax.com/avatars/avatar-5.png',
    username: 'Rustamka',
    password: 'pass1'
  },
  {
    id: 2,
    avatar: 'https://vuesax.com/avatars/avatar-4.png',
    username: 'Peter',
    password: 'pass2'
  },
  {
    id: 3,
    avatar: 'https://vuesax.com/avatars/avatar-2.png',
    username: 'John',
    password: 'pass3'
  }
])

const messages = ref([
  {
    id: 1,
    createdAtDate: '12.09.2023',
    createdAtTime: '14:30',
    userId: 1,
    text: "I can't make it to the party this weekend; I have a family reunion, but we should catch up soon!"
  },
  {
    id: 2,
    createdAtDate: '12.09.2023',
    createdAtTime: '15:00',
    userId: 4,
    text: 'Just finished an intense workout; feeling sore but accomplished. Ready for a hot bath and a good book.'
  },
  {
    id: 3,
    createdAtDate: '13.09.2023',
    createdAtTime: '04:09',
    userId: 4,
    text: 'The hike up the mountain was breathtaking, and we even saw a rare bird in its natural habitat.'
  }
])
</script>

<template>
  <div class="container">
    <aside class="sidebar">
      <div class="chatlist">
        <!-- <header class="chatlist-header">
          <a href="#" class="btn">Create a group</a>
        </header> -->
        <ul>
          <UserPreview v-for="chat in chatList" :key="chat.id" :chat="chat" />
        </ul>
      </div>
      <footer class="sidebar-footer">
        <a href="#"><UserCircleIcon class="icon24" /> My account</a>
        <a href="#"><ArrowRightOnRectangleIcon class="icon24" /> Logout</a>
      </footer>
    </aside>
    <main class="main">
      <!-- <div class="nochat">
        <h1 class="mb-16">Hey, Lexaxa!</h1>
        <p>Choose anyone and start chatting</p>
      </div> -->
      <ChatRoomView />
    </main>
  </div>
</template>

<style scoped>
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
.nochat {
  text-align: center;
}
</style>
