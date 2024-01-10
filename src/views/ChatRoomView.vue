<script setup>
import MessageBubble from '@/components/MessageBubble.vue'
import { ArrowUturnLeftIcon } from '@heroicons/vue/24/outline'
import { ArrowUpRightIcon } from '@heroicons/vue/24/outline'
import { TrashIcon } from '@heroicons/vue/24/outline'

import { ref, computed, watch, onBeforeMount, onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'

const storeChat = useChatStore()
const storeAuth = useAuthStore()
const route = useRoute()
const props = defineProps(['chatId'])

const isFieldActive = ref(false)
let chatHeaderInfo = ref({})

const currentDate = ref('')

const getCurrentDate = () => {
  const initial = new Date()

  const currentDay = initial.getDate() + ''
  const currentMonth = initial.getMonth() + 1 + ''
  const currentYear = initial.getFullYear() + ''
  currentDate.value = `${currentDay.padStart(2, '0')}.${currentMonth.padStart(
    2,
    '0'
  )}.${currentYear.padStart(2, '0')}`
}

const message = ref('')
const messageInput = ref(null)
const sendMessage = () => {
  if (!message.value) return
  storeChat.sendMessage(props.chatId, message.value)
  message.value = ''
  messageInput.value.blur()
}

//Запрещаем браузерное контекстное меню
document.addEventListener('contextmenu', (event) => {
  event.preventDefault()
})

const getUserInfo = computed(() => {
  return storeChat.chatPreviews.find((chat) => chat.id === route.params.chatId)
})

//Bubble context menu
const bubbleContextInfo = ref({
  pageY: 0,
  pageX: 0
})

let bubbleContextMenu = ''
const showBubbleContext = ref('none')
let msgId = ref('')
let fromUserId = ref('')

const handleBubbleContext = (event, id, userId) => {
  msgId.value = id
  fromUserId.value = userId
  console.log(fromUserId.value)
  //Setting context menu coordinates
  const boundaryX = window.innerWidth - event.pageX
  const boundaryY = window.innerHeight - event.pageY

  if (boundaryX <= 158) {
    bubbleContextInfo.value.pageX = event.pageX - 158 - 5
  } else {
    bubbleContextInfo.value.pageX = event.pageX + 5
  }

  if (boundaryY <= 128) {
    bubbleContextInfo.value.pageY = event.pageY - 128 - 5
  } else {
    bubbleContextInfo.value.pageY = event.pageY + 5
  }

  //Initiate listener for closing context menu
  document.addEventListener('click', closeContextMenu)

  //Show context menu
  showBubbleContext.value = 'flex'
}

const closeContextMenu = () => {
  showBubbleContext.value = 'none'
  document.removeEventListener('click', closeContextMenu)
}

//Delete message
const deleteMessage = async (messageId) => {
  //! ПРОДОЛЖИТЬ функционал в сторе
  await storeChat.deleteMessage(messageId)
}

onBeforeMount(async () => {
  getCurrentDate()
  try {
    await storeChat.setMsgGroups(route.params.chatId)
  } catch (error) {
    console.error('Error:', error)
  }
})

onMounted(() => {
  bubbleContextMenu = document.getElementById('bubbleContext')
})

watch(
  () => route.params.chatId,
  async () => {
    getCurrentDate()

    try {
      if (!route.params.chatId) return
      await storeChat.setMsgGroups(route.params.chatId)
    } catch (error) {
      console.error('Error:', error)
    }
  }
)

//Sorting messages blocks
const reversedMessages = computed(() => {
  const msgGroupsArray = Object.entries(storeChat.msgGroups)

  // Reverse the array
  const reversedArray = msgGroupsArray.reverse()

  return reversedArray
})

const startTyping = async () => {
  isFieldActive.value = true
  await storeAuth.isUserTyping(isFieldActive.value)
}

const stopTyping = async () => {
  isFieldActive.value = false
  await storeAuth.isUserTyping(isFieldActive.value)
}
</script>

<template>
  <Teleport to="body">
    <div
      id="bubbleContext"
      class="bubbleContext"
      :style="{
        display: showBubbleContext,
        left: bubbleContextInfo.pageX + 'px',
        top: bubbleContextInfo.pageY + 'px'
      }"
    >
      <ul>
        <li><ArrowUturnLeftIcon class="icon icon24" /> <span>Reply</span></li>
        <li><ArrowUpRightIcon class="icon icon24" /> <span>Forward</span></li>
        <li
          v-if="fromUserId && fromUserId === storeChat.user.id"
          class="red-text"
          @click="deleteMessage(msgId, fromUserId)"
        >
          <TrashIcon class="icon icon24" />
          <span>Delete</span>
        </li>
      </ul>
    </div>
  </Teleport>
  <div class="chat-room">
    <header class="user-chat-header">
      <div class="user-preview">
        <!-- chatHeaderInfo затягивается один раз при входе в комнату -->
        <img v-if="chatHeaderInfo.avatar" class="avatar" :src="getUserInfo.avatar" />
        <div v-else class="avatar" :style="{ backgroundColor: getUserInfo.avatarBg }">
          {{ getUserInfo.nickname.charAt(0).toUpperCase() }}
        </div>
        <div class="user-data">
          <div class="nickname">{{ getUserInfo.nickname }}</div>
          <div v-if="getUserInfo.isTyping" class="status">{{ 'is typing...' }}</div>
          <div v-else class="status">{{ getUserInfo.status ? 'Online' : 'Offline' }}</div>
        </div>
      </div>
    </header>

    <div class="messages-container">
      <div class="messages-group" v-for="msg in reversedMessages" :key="msg.id">
        <div class="messages-date">
          {{ msg[0] === currentDate ? 'Today' : msg[0] }}
        </div>
        <MessageBubble
          v-for="msg in msg[1]"
          :key="msg.id"
          :id="msg.id"
          :fromUser="msg.fromUser"
          :text="msg.text"
          :time="msg.createdAtTime"
          :class="[msg.fromUser === storeChat.user.id ? 'message-right' : 'message-left']"
          @getMessageId="handleBubbleContext"
        />
      </div>
    </div>

    <footer class="user-chat-footer" :class="{ activeField: isFieldActive }">
      <!-- <FaceSmileIcon class="icon icon24" />
      <FaceSmileIcon class="icon icon24" /> -->
      <form @submit.prevent="sendMessage">
        <input
          @focus="startTyping"
          @blur="stopTyping"
          type="text"
          v-model="message"
          ref="messageInput"
          name="message"
          id="message"
          placeholder="Type message..."
        />
      </form>
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

.bubbleContext {
  position: absolute;
  background: var(--dark-elements);
  border-radius: 8px;
  padding: 4px 0;
  color: #fff;
  font-size: 1rem;
  line-height: 1rem;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.12);
  z-index: 2;
}

.bubbleContext ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.bubbleContext li {
  display: flex;
  padding: 8px;
  padding-right: 56px;
}

.bubbleContext li .icon {
  margin-right: 8px;
}

.bubbleContext li span {
  display: flex;
  align-items: center;
}

.bubbleContext li:hover {
  cursor: pointer;
  background-color: var(--darker-background);
}

.user-chat-header .user-preview {
  display: flex;
  align-items: center;
}

.user-chat-header .user-preview .avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
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

form {
  width: 100%;
}

.user-chat-footer input[type='text'] {
  background: var(--dark-elements);
  height: 20px;
  width: 100%;
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
