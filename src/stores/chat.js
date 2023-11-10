import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from '../firebase'
import { collection, query, where, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore'

export const useChatStore = defineStore('chat', () => {
  const currentUser = ref()
  const user = ref()
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
  const loadCurrentUser = async (currentUserId) => {
    const docRef = doc(db, 'users', currentUserId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      user.value = docSnap.data()
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!')
    }

    // return new Promise((resolve, reject) => {
    //   console.log('firebase ' + currentUserId)

    //   const docRef = doc(db, "users", currentUserId);
    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //   } else {
    //     // docSnap.data() will be undefined in this case
    //     console.log("No such document!");
    //   }

    //   resolve()
    // })
  }

  //Actions
  //Сохранение в store твоего айдишника
  const setCurrentUser = (currentUserId) => {
    currentUser.value = currentUserId
  }

  //Генерация массива для отображения превью в списке слева
  const setChatPreviews = async () => {
    let result = []
    // console.log(currentUser.value)
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

    console.log(chatId)

    const q = query(collection(db, 'messages'))

    onSnapshot(q, (snapshot) => {
      snapshot.forEach((message) => {
        messages.value.push({ ...message.data(), id: message.id })
        //Месседжи из базы пушатся каждый раз при переходе в чат. Так быть не должно. Из-за этого в чате с Датчем кажджый раз становется больше сообщений.
        //В чате с Сэди не сообщений вообще. Потому что нет chatId Сэди в messages в базе
      })

      console.log(messages.value)

      let activeChatMessages = messages.value.filter((message) => message.chatId === chatId)
      console.log(activeChatMessages)

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
    loadCurrentUser,
    setChatPreviews,
    setMsgGroups
  }
})
