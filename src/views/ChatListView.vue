<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/outline'
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="container">
    <aside class="sidebar">
      <div class="chatlist">
        <header class="chatlist-header">
          <a href="#" class="btn">Create a group</a>
        </header>
        <ul>
          <li>
            <a href="#" class="user-preview">
              <img
                class="avatar"
                src="https://images.unsplash.com/photo-1578307362674-b209690512c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw3NjA4Mjc3NHx8ZW58MHx8fHx8&w=1000&q=80"
                alt=""
              />
              <div class="name">Igor</div>
              <div class="message-info">
                <span class="new-messages">1</span><span class="message-time">14:35</span>
              </div>
              <div class="message-preview">
                <div class="sender">You</div>
                :
                <div class="text">
                  Все отлично. Чехлы натянул, ремонт сделал, квартиру не купил, олигархом не стал
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#">User 2</a>
          </li>
          <li>
            <a href="#">User 3</a>
          </li>
        </ul>
      </div>
      <footer class="sidebar-footer">
        <a href="#"><UserCircleIcon class="icon24" /> My account</a>
        <a href="#"><ArrowRightOnRectangleIcon class="icon24" /> Logout</a>
      </footer>
    </aside>
    <main class="main">
      <div class="nochat">
        <h1 class="mb-16">Hey, Lexaxa!</h1>
        <p>Choose anyone and start chatting</p>
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

.chatlist-header {
  padding: 16px 8px;
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

/* Chatlist users previews */
.user-preview {
  color: #fff;
}
</style>
