import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ChatListView from '../views/ChatListView.vue'
import SignUpView from '../views/SignUpView.vue'
import ChatRoomView from '../views/ChatRoomView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    },
    {
      path: '/chatlist',
      name: 'chatlist',
      component: ChatListView,
      children: [
        {
          path: ':chatId',
          name: 'chatroom',
          component: ChatRoomView,
          props: true
        }
      ]
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    }
  ]
})

export default router
