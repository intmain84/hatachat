<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline'
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import { FaceSmileIcon } from '@heroicons/vue/24/outline'
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline'

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
    message: 'Salam! How you doing today?',
    selected: true
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

const isFieldActive = ref(false)
</script>

<template>
  <div class="container">
    <aside class="sidebar">
      <div class="chatlist">
        <!-- <header class="chatlist-header">
          <a href="#" class="btn">Create a group</a>
        </header> -->
        <ul>
          <li v-for="chat in chatList" :key="chat.id">
            <a href="#" class="user-preview" :class="{ activeChat: chat.selected }">
              <img class="avatar" :src="chat.avatar" alt="" />
              <div class="text-data">
                <div class="message-info">
                  <div class="nickname">{{ chat.nickname }}</div>
                  <div class="message-info">
                    <span v-if="chat.newMessages" class="new-messages">{{ chat.newMessages }}</span
                    ><span class="message-time">{{ chat.messageTime }}</span>
                  </div>
                </div>
                <div class="message-preview">You: {{ chat.message }}</div>
              </div>
            </a>
          </li>
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
            <div class="messages-date">September 12</div>
            <div class="message-container message-left">
              <div class="nickname">Igor</div>
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eveniet rem voluptas
                enim at vel facere sed dolor soluta fugit.
              </div>
              <div class="time">12:34</div>
            </div>
            <div class="message-container message-right">
              <div class="nickname">You</div>
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eveniet rem voluptas
                enim at vel facere sed dolor soluta fugit.
              </div>
              <div class="time">12:34</div>
            </div>
            <div class="message-container message-right">
              <div class="nickname">You</div>
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eveniet rem voluptas
                enim at vel facere sed dolor soluta fugit.
              </div>
              <div class="time">12:34</div>
            </div>
            <div class="message-container message-left">
              <div class="nickname">Igor</div>
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eveniet rem voluptas
                enim at vel facere sed dolor soluta fugit.
              </div>
              <div class="time">12:34</div>
            </div>
            <div class="message-container message-left">
              <div class="nickname">Igor</div>
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eveniet rem voluptas
                enim at vel facere sed dolor soluta fugit.
              </div>
              <div class="time">12:34</div>
            </div>
            <div class="message-container message-left">
              <div class="nickname">Igor</div>
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eveniet rem voluptas
                enim at vel facere sed dolor soluta fugit.
              </div>
              <div class="time">12:34</div>
            </div>
            <div class="message-container message-right">
              <div class="nickname">You</div>
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eveniet rem voluptas
                enim at vel facere sed dolor soluta fugit.
              </div>
              <div class="time">12:34</div>
            </div>
            <div class="message-container message-right">
              <div class="nickname">You</div>
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eveniet rem voluptas
                enim at vel facere sed dolor soluta fugit.
              </div>
              <div class="time">12:34</div>
            </div>
            <div class="message-container message-left">
              <div class="nickname">Igor</div>
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eveniet rem voluptas
                enim at vel facere sed dolor soluta fugit.
              </div>
              <div class="time">12:34</div>
            </div>
            <div class="message-container message-left">
              <div class="nickname">Igor</div>
              <div class="message">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod eveniet rem voluptas
                enim at vel facere sed dolor soluta fugit.
              </div>
              <div class="time">12:34</div>
            </div>
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

/* Chatlist users previews */
.chatlist .user-preview {
  display: flex;
  align-items: center;
  color: #fff;
  padding: 16px;
  font-size: 0.75rem;
}
.chatlist .user-preview:hover,
.activeChat {
  background: var(--darker-background);
}

.chatlist .user-preview .text-data {
  display: flex;
  flex-direction: column;
  width: 208px;
}

.chatlist .user-preview .avatar {
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
