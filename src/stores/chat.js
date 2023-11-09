import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from '../firebase'
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore'

export const useChatStore = defineStore('chat', () => {
  const currentUser = ref()
  const chatPreviews = ref([])
  const msgGroups = ref([])

  const users = ref([])

  const chats = ref([
    {
      chatId: 'kG65Z8DTDBQcEWiDuWuN',
      users: ['mxQ5P8SC6ucwFmlh7uBJ', 'y4n5AfmVfC5zwt1xTVY4'],
      lastMessage: {
        text: "Apart From My Jakey, You're The Best Man I Know",
        fromUser: 'y4n5AfmVfC5zwt1xTVY4',
        createdAtDate: '01.09.2023',
        createdAtTime: '20:05'
      }
    },
    {
      chatId: 'IcNX5iPYEfu7BsbgSAXV',
      users: ['mxQ5P8SC6ucwFmlh7uBJ', '6SIiVN9PYroTfF1uoT4V'],
      lastMessage: {
        text: null
      }
    },
    {
      chatId: 'n6mh9HwKmaCSw1toPFr1',
      users: ['y4n5AfmVfC5zwt1xTVY4', '6SIiVN9PYroTfF1uoT4V'],
      lastMessage: {
        text: null
      }
    }
  ])

  const messages = ref([])

  //Actions
  //Сохранение в store твоего айдишника
  const setCurrentUser = (currentUserId) => {
    currentUser.value = currentUserId
  }

  //Генерация массива для отображения превью в списке слева
  const setChatPreviews = async () => {
    let result = []
    const q = query(collection(db, 'users'))

    onSnapshot(q, (snapshot) => {
      snapshot.forEach((user) => {
        users.value.push({ ...user.data(), id: user.id })
      })

      for (let i = 0; i < users.value.length; i++) {
        for (let j = 0; j < chats.value.length; j++) {
          if (
            users.value[i].id != currentUser.value &&
            chats.value[j].users.includes(users.value[i].id) &&
            chats.value[j].users.includes(currentUser.value)
          ) {
            result.push({
              id: users.value[i].id,
              avatar: users.value[i].avatar,
              nickname: users.value[i].nickname,
              chatId: chats.value[j].chatId,
              lastMessage: {
                text: chats.value[j].lastMessage.text,
                fromUser: chats.value[j].lastMessage.fromUser,
                createdAtDate: chats.value[j].lastMessage.createdAtDate,
                createdAtTime: chats.value[j].lastMessage.createdAtTime
              }
            })
          }
        }
      }
      chatPreviews.value = result
    })
  }

  //Генерация массива сообщений для выбранного чата
  const setMsgGroups = async (chatId) => {
    let result = {}

    console.log(chatId)

    const q = query(collection(db, 'messages'))

    onSnapshot(q, (snapshot) => {
      snapshot.forEach((message) => {
        messages.value.push({ ...message.data(), id: message.id })
        //Месседжи из базы пушатся каждый раз при переходе в чат. Так быть не должно. Из-за этого в чате с Датчем кажджый раз становется больше сообщений.
        //В чате с Сэди не сообщений вообще. Выяснить
      })

      let activeChatMessages = messages.value.filter((message) => message.chatId === chatId)

      activeChatMessages.forEach((msg) => {
        if (result[msg.createdAtDate]) {
          result[msg.createdAtDate].push(msg)
        } else {
          result[msg.createdAtDate] = [msg]
        }
      })

      msgGroups.value = result
    })
  }

  //Getters
  //Получение твоего никнейма для отображения в приветственном окне
  const getCurrentUser = computed(() => {
    const currentUserData = users.value.find((user) => user.id == currentUser.value)
    return currentUserData.nickname
  })

  const getChatHeaderInfo = computed(() => {
    return (chatId) => chatPreviews.value.find((chat) => chat.chatId === chatId)
  })

  return {
    //States
    chatPreviews,
    currentUser,
    msgGroups,

    //Getters
    getCurrentUser,
    getChatHeaderInfo,

    //Actions
    setCurrentUser,
    setChatPreviews,
    setMsgGroups
  }
})
