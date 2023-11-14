import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from '../firebase'
import { collection, query, and, or, where, onSnapshot, doc, getDoc } from 'firebase/firestore'

export const useChatStore = defineStore('chat', () => {
  const user = ref()
  const chatPreviews = ref([])
  const msgGroups = ref({})

  const users = ref([])

  //Actions
  //Сохранение в store твоего айдишника
  const loadCurrentUser = async (currentUserId) => {
    const docRef = doc(db, 'users', currentUserId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      user.value = { ...docSnap.data(), id: currentUserId }
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }
  }

  //Actions

  //Генерация массива для отображения превью в списке слева
  const setChatPreviews = async () => {
    const q = query(collection(db, 'users'), where('email', '!=', user.value.email))

    onSnapshot(q, (snapshot) => {
      snapshot.forEach((user) => {
        users.value.push({ ...user.data(), id: user.id })
      })

      chatPreviews.value = users.value
    })
  }

  //Генерация массива сообщений для выбранного чата
  const setMsgGroups = async (chatId) => {
    let result = {}
    let activeChatMessages = []

    //Запрос в базу за сообщениями отсюда убрать и переместить в отдельную функцию???
    const q = query(
      collection(db, 'messages'),
      and(
        or(where('fromUser', '==', user.value.id), where('toUser', '==', user.value.id)),
        or(where('fromUser', '==', chatId), where('toUser', '==', chatId))
      )
    )

    onSnapshot(q, (snapshot) => {
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

  //Getters
  //Получение твоего никнейма для отображения в приветственном окне
  const getCurrentUserNickname = computed(() => {
    return user.value.nickname + '😀'
  })

  const getChatHeaderInfo = computed(() => {
    return (chatId) => chatPreviews.value.find((chat) => chat.id === chatId)
  })

  return {
    //States
    chatPreviews,
    user,
    msgGroups,

    //Getters
    getCurrentUserNickname,
    getChatHeaderInfo,

    //Actions
    loadCurrentUser,
    setChatPreviews,
    setMsgGroups
  }
})
