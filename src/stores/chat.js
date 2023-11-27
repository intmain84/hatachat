import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from '../firebase'
import {
  collection,
  query,
  limit,
  orderBy,
  addDoc,
  and,
  or,
  where,
  onSnapshot
} from 'firebase/firestore'

export const useChatStore = defineStore('chat', () => {
  const user = ref({})
  const chatPreviews = ref([])
  const msgGroups = ref({})

  //Actions
  //Генерация массива для отображения превью в списке слева
  const setChatPreviews = async () => {
    //Get all users except me
    const q = query(collection(db, 'users'), where('email', '!=', user.value.email))

    onSnapshot(q, (snapshot) => {
      let users = []
      snapshot.forEach((user) => {
        users.push({ ...user.data(), id: user.id })
      })

      chatPreviews.value = users
    })
  }

  //Генерация массива сообщений для выбранного чата
  const setMsgGroups = async (chatId) => {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'asc'),
      and(
        or(where('fromUser', '==', user.value.id), where('toUser', '==', user.value.id)),
        or(where('fromUser', '==', chatId), where('toUser', '==', chatId))
      )
    )

    onSnapshot(q, (snapshot) => {
      let activeChatMessages = []
      let result = {}
      snapshot.forEach((message) => {
        activeChatMessages.push({ ...message.data(), id: message.id })
      })

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

  //Отправка сообщения
  const sendMessage = async (usertoUserId, message) => {
    const dateStamp = new Date()

    const timestamp = dateStamp.getTime()

    const hour = dateStamp.getHours() + ''
    const min = dateStamp.getMinutes() + ''
    const currentTime = `${hour.padStart(2, '0')}:${min.padStart(2, '0')}`

    const currentDay = dateStamp.getDate() + ''
    const currentMonth = dateStamp.getMonth() + 1 + ''
    const currentYear = dateStamp.getFullYear() + ''
    const currentDate = `${currentDay.padStart(2, '0')}.${currentMonth.padStart(
      2,
      '0'
    )}.${currentYear.padStart(2, '0')}`

    await addDoc(collection(db, 'messages'), {
      timestamp,
      dateStamp: dateStamp,
      createdAtDate: currentDate,
      createdAtTime: currentTime,
      fromUser: user.value.id,
      toUser: usertoUserId,
      text: message,
      isRead: false
    })

    await addDoc(collection(db, 'users'), {
      id: user.value.id,
      message
    })
  }

  //Logout
  const logOut = () => {
    user.value = {}
  }

  //Getters
  //Получение твоего никнейма для отображения в приветственном окне
  const getCurrentUserNickname = computed(() => {
    return user.value.nickname
  })

  //Получение последнего сообщения под ником юзера
  // const getLastMessage = computed(() => {
  //   return async (chatId) => {
  //     const q = query(
  //       collection(db, 'messages'),
  //       and(
  //         or(where('fromUser', '==', user.value.id), where('toUser', '==', user.value.id)),
  //         or(where('fromUser', '==', chatId), where('toUser', '==', chatId))
  //       ),
  //       orderBy('dateStamp', 'desc'),
  //       limit(1)
  //     )

  //     return new Promise((resolve, reject) => {
  //       onSnapshot(
  //         q,
  //         (snapshot) => {
  //           console.log(snapshot)
  //           let resultMessage = ''

  //           snapshot.forEach((message) => {
  //             resultMessage = message.data().text
  //           })

  //           resolve(resultMessage)
  //         },
  //         (error) => {
  //           reject(error)
  //         }
  //       )
  //     })
  //   }
  // })

  return {
    //States
    chatPreviews,
    user,
    msgGroups,

    //Getters
    getCurrentUserNickname,
    // getLastMessage,

    //Actions
    setChatPreviews,
    setMsgGroups,
    sendMessage,
    logOut
  }
})
