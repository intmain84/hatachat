<script setup>
import MessageBubble from '@/components/MessageBubble.vue'
import { FaceSmileIcon } from '@heroicons/vue/24/outline'
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline'

import { ref } from 'vue'

const isFieldActive = ref(false) // Чтобы поле соообщения подсвечивать когда на него нажимаешь
</script>

<template>
  <div class="chat-room">
    <header class="user-chat-header">
      <div class="user-preview">
        <img class="avatar" src="https://vuesax.com/avatars/avatar-8.png" alt="" />
        <div class="user-data">
          <div class="nickname">Igor</div>
          <div class="user-status">Online</div>
        </div>
      </div>
    </header>

    <div class="messages-container">
      <div class="messages-group">
        <div class="messages-date">Today</div>
        <MessageBubble class="message-left" />
        <MessageBubble class="message-right" />
        <MessageBubble class="message-right" />
        <MessageBubble class="message-left" />
        <MessageBubble class="message-right" />
      </div>
      <div class="messages-group">
        <div class="messages-date">September 12</div>
        <MessageBubble class="message-left" />
        <MessageBubble class="message-right" />
        <MessageBubble class="message-left" />
        <MessageBubble class="message-right" />
        <MessageBubble class="message-right" />
        <MessageBubble class="message-left" />
        <MessageBubble class="message-right" />
        <MessageBubble class="message-right" />
        <MessageBubble class="message-right" />
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
  display: flex;
  flex-direction: column-reverse;
  position: absolute !important;
  width: 100%;
  height: 100%;
  color: #fff;
  z-index: 1;
  border-radius: 8px;
  overflow-y: scroll;
  padding-bottom: 64px;
  padding-top: 88px;
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
