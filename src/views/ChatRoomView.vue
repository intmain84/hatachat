<script setup>
import MessageBubble from '@/components/MessageBubble.vue'
import { FaceSmileIcon } from '@heroicons/vue/24/outline'
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline'

import { ref, watch, onBeforeMount } from 'vue'
import { useChatStore } from '../stores/chat'
import { useRoute } from 'vue-router'

const store = useChatStore()
const route = useRoute()
const props = defineProps(['chatId'])

const msgGroups = ref([
  {
    id: '1',
    date: '21.12.2015',
    messages: [
      {
        id: 1,
        isRead: false,
        createdAtDate: '12.09.2023',
        createdAtTime: '14:30',
        chatId: '111',
        fromUser: '1',
        text: "Excited about the weekend, but I can't make it to the party. Catch up soon!"
      },
      {
        id: 2,
        isRead: true,
        createdAtDate: '12.09.2023',
        createdAtTime: '15:15',
        chatId: '111',
        fromUser: '2',
        text: "Unfortunately, party attendance is a no-go. Family reunion plans, but we'll meet soon!"
      }
    ]
  },
  {
    id: '2',
    date: '23.10.2023',
    messages: [
      {
        id: 1,
        isRead: false,
        createdAtDate: '12.09.2023',
        createdAtTime: '14:30',
        chatId: '111',
        fromUser: '1',
        text: "I can't make it to the party. Catch up soon!"
      },
      {
        id: 2,
        isRead: true,
        createdAtDate: '12.09.2023',
        createdAtTime: '15:15',
        chatId: '111',
        fromUser: '2',
        text: "Unfortunately, party attendance is a no-go. Family reunion plans, but we'll meet soon!"
      }
    ]
  }
])

const isFieldActive = ref(false)
let chatHeaderInfo = ref({})
let hasFetchedChatHeader = false

const currentDate = ref('')

const getCurrentDate = () => {
  const initial = new Date()

  const currentDay = initial.getDate() + ''
  const currentMonth = initial.getMonth() + 1 + ''
  const currentYear = initial.getFullYear() + ''
  currentDate.value = `${currentDay}.${currentMonth.padStart(2, '0')}.${currentYear.padStart(
    2,
    '0'
  )}`
}

onBeforeMount(async () => {
  getCurrentDate()
  console.log(chatHeaderInfo.value.chatId)
  //Проверка совпадает ли текущего роутера параметр chatId с параметром chatHeader chatId
  if (props.chatId !== chatHeaderInfo.value.chatId) {
    //Если не совпадает то false и тянем новые данные
    hasFetchedChatHeader = false
  }

  if (!hasFetchedChatHeader) {
    try {
      console.log('yaaaaay')
      console.log(props.chatId)
      chatHeaderInfo.value = await store.getChatHeaderInfo(props.chatId)

      console.log(chatHeaderInfo.value)
      hasFetchedChatHeader = true //После ставим в true
    } catch (error) {
      console.error('Error:', error)
    }
  }
})

// watch(
//   () => route.params,
//   async () => {
//     getCurrentDate()
//     //Проверка совпадает ли текущего роутера параметр chatId с параметром chatHeader chatId
//     if (props.chatId !== chatHeaderInfo.value.chatId) {
//       //Если не совпадает то false и тянем новые данные
//       hasFetchedChatHeader = false
//     }

//     if (!hasFetchedChatHeader) {
//       try {
//         chatHeaderInfo.value = await store.getChatHeaderInfo(props.chatId)
//         hasFetchedChatHeader = true //После ставим в true
//       } catch (error) {
//         console.error('Error:', error)
//       }
//     }
//   }
// )
</script>

<template>
  <div class="chat-room">
    <header class="user-chat-header">
      <div class="user-preview">
        <img class="avatar" :src="chatHeaderInfo.avatar" />
        <div class="user-data">
          <div class="nickname">{{ chatHeaderInfo.nickname }}</div>
          <div class="user-status">{{ currentDate }}</div>
        </div>
      </div>
    </header>

    <div class="messages-container">
      <div
        class="messages-group"
        v-for="msgGroup in msgGroups.slice().reverse()"
        :key="msgGroup.id"
      >
        <div class="messages-date">
          {{ msgGroup.date === currentDate ? 'Today' : msgGroup.date }}
        </div>
        <MessageBubble
          v-for="msgBubble in msgGroup.messages"
          :key="msgBubble.id"
          :class="[msgBubble.fromUser !== store.currentUser ? 'message-left' : 'message-right']"
          nickname="Vasia"
          :text="msgBubble.text"
          :time="msgBubble.createdAtTime"
        />
      </div>
    </div>

    <footer class="user-chat-footer" :class="{ activeField: isFieldActive }">
      <FaceSmileIcon class="icon icon24" />
      <FaceSmileIcon class="icon icon24" />
      <input
        @focus="isFieldActive = true"
        @blur="isFieldActive = false"
        type="text"
        name="message"
        id="message"
        placeholder="Type message..."
      />
      <PaperAirplaneIcon class="icon icon24" />
    </footer>
  </div>
</template>

<style scoped>
/* Chat Room */
.chat-room {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.user-chat-header {
  width: 100%;
  background: var(--dark-elements);
  border-radius: 8px;
  padding: 16px;
  color: #fff;
  font-size: 0.75rem;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.12);
  z-index: 2;
}

.user-chat-header .user-preview {
  display: flex;
  align-items: center;
}

.user-chat-header .user-preview .avatar {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 8px;
}
.user-chat-header .user-preview .user-data .nickname {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 4px;
}

.user-chat-footer {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  background: var(--dark-elements);
  border-radius: 8px;
  z-index: 2;
  box-shadow: 0px -4px 7px 0px rgba(0, 0, 0, 0.12);
}

.user-chat-footer .icon {
  color: #fff;
}

.user-chat-footer input[type='text'] {
  background: var(--dark-elements);
  height: 20px;
}

.user-chat-footer.activeField,
.user-chat-footer input[type='text']:active,
.user-chat-footer input[type='text']:focus {
  background: var(--dark-background) !important;
}

.chat-room .messages-container {
  padding-top: 16px;
  display: flex;
  flex-direction: column-reverse;
  position: absolute !important;
  top: 74px;
  width: 100%;
  height: calc(100% - 130px);
  color: #fff;
  z-index: 1;
  border-radius: 8px;
  overflow-y: auto;
}

.chat-room .messages-container .messages-group {
  width: 100%;
}

.chat-room .messages-container .messages-group .messages-date {
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 16px;
}

.message-container {
  background: var(--dark-elements);
  padding: 16px;
  max-width: 510px;
  color: #fff;
  margin-top: 8px;
  margin-bottom: 8px;
}

.message-left {
  position: relative;
  align-self: flex-start;
  border-radius: 8px 8px 8px 0;
}

.message-left:before {
  position: absolute;
  bottom: 0;
  left: -8px;
  content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="24" viewBox="0 0 8 24" fill="none"><path d="M0 24H8V0L7.17679 7.76173C6.53735 13.7907 4.0279 19.4686 0 24Z" fill="%231E212A"/></svg>');
  width: 8px;
  height: 24px;
  z-index: 3;
}

.message-right {
  position: relative;
  align-self: flex-end;
  background: #936ac8;
  border-radius: 8px 8px 0 8px;
  margin-right: 8px;
}

.message-right:after {
  position: absolute;
  bottom: 0;
  right: -8px;
  content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="8" height="24" viewBox="0 0 8 24" fill="none"><path d="M0 24H8V0L7.17679 7.76173C6.53735 13.7907 4.0279 19.4686 0 24" fill="%23936ac8"/></svg>');
  width: 8px;
  color: #936ac8;
  transform: scale(-1, 1);
  height: 24px;
  z-index: 3;
}

.messages-group {
  display: flex;
  flex-direction: column;
  padding: 0 8px;
}
</style>
