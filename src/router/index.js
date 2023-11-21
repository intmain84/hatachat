import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ChatListView from '../views/ChatListView.vue'
import SignUpView from '../views/SignUpView.vue'
import ChatRoomView from '../views/ChatRoomView.vue'
import MyAccountView from '../views/MyAccountView.vue'
import NoChatSelectedView from '../views/NoChatSelectedView.vue'

const router = createRouter({
  history: createWebHistory(),
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
          path: '', //такой пустой путь нужен если этот компонент нужно отображать по умолчанию во вложенном роутер вью
          name: 'welcome',
          component: NoChatSelectedView
        },
        {
          path: 'myaccount',
          name: 'myaccount',
          component: MyAccountView,
          props: true
        },
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
