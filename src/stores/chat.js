import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from '../firebase'
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore'

export const useChatStore = defineStore('chat', () => {
  const currentUser = ref()
  const chatPreviews = ref([])
  const msgGroups = ref([])

  const users = ref([])
  const chats2 = ref([])
  const messages2 = ref([])

  // const users2 = ref([
  //   {
  //     id: '6SIiVN9PYroTfF1uoT4V',
  //     avatar: 'https://vuesax.com/avatars/avatar-9.png',
  //     email: 'vuesax@gmail.com',
  //     nickname: 'Arthur',
  //     password: 'pass1'
  //   },
  //   {
  //     id: '2',
  //     avatar: 'https://vuesax.com/avatars/avatar-3.png',
  //     email: 'sadie@gmail.com',
  //     nickname: 'Sadie',
  //     password: 'pass2'
  //   },
  //   {
  //     id: '3',
  //     avatar: 'https://vuesax.com/avatars/avatar-7.png',
  //     email: 'dutch@gmail.com',
  //     nickname: 'Dutch',
  //     password: 'pass3'
  //   }
  // ])

  const chats = ref([
    {
      chatId: '111',
      users: ['mxQ5P8SC6ucwFmlh7uBJ', 'y4n5AfmVfC5zwt1xTVY4'],
      lastMessage: {
        text: "Apart From My Jakey, You're The Best Man I Know",
        fromUser: 'y4n5AfmVfC5zwt1xTVY4',
        createdAtDate: '01.09.2023',
        createdAtTime: '20:05'
      }
    },
    {
      chatId: '222',
      users: ['mxQ5P8SC6ucwFmlh7uBJ', '6SIiVN9PYroTfF1uoT4V'],
      lastMessage: {
        text: null,
        fromUser: 'y4n5AfmVfC5zwt1xTVY4',
        createdAtDate: '12.09.2023',
        createdAtTime: '15:13'
      }
    },
    {
      chatId: '333',
      users: ['y4n5AfmVfC5zwt1xTVY4', '6SIiVN9PYroTfF1uoT4V'],
      lastMessage: {
        text: null,
        fromUser: 'y4n5AfmVfC5zwt1xTVY4',
        createdAtDate: '12.09.2023',
        createdAtTime: '19:05'
      }
    }
  ])

  const messages = ref([
    {
      id: '1',
      isRead: false,
      createdAtDate: '01.11.2023',
      createdAtTime: '14:30',
      chatId: '111',
      fromUser: 'mxQ5P8SC6ucwFmlh7uBJ',
      text: "Excited about the weekend, but I can't make it to the party. Catch up soon!"
    },
    {
      id: '2',
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '15:15',
      chatId: '111',
      fromUser: '2',
      text: "Unfortunately, party attendance is a no-go. Family reunion plans, but we'll meet soon!"
    },
    {
      id: '3',
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '16:00',
      chatId: '111',
      fromUser: '2',
      text: "Apologies, party isn't in the cards; family reunion takes precedence. We'll reconnect soon!"
    },
    {
      id: '4',
      isRead: true,
      createdAtDate: '13.09.2023',
      createdAtTime: '17:45',
      chatId: '111',
      fromUser: 'mxQ5P8SC6ucwFmlh7uBJ',
      text: "I regret missing the party; family reunion conflict, but let's schedule a meetup!"
    },
    {
      id: '5',
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '15:15',
      chatId: '222',
      fromUser: 'mxQ5P8SC6ucwFmlh7uBJ',
      text: " is a no-go. Family reunion plans, but we'll meet soon!"
    },
    {
      id: '6',
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '16:00',
      chatId: '222',
      fromUser: '3',
      text: "Apologies, party isn't nect soon!"
    },
    {
      id: '7',
      isRead: true,
      createdAtDate: '13.09.2023',
      createdAtTime: '17:45',
      chatId: '222',
      fromUser: 'mxQ5P8SC6ucwFmlh7uBJ',
      text: 'I edule a meetup!'
    }
  ])

  //Actions
  //Сохранение в store твоего айдишника
  const setCurrentUser = (currentUserId) => {
    currentUser.value = currentUserId
  }

  //Генерация массива для отображения превью в списке слева
const setChatPreviews = () => {
  let result = [];
  const q = query(collection(db, "users"));

  onSnapshot(q, (snapshot) => {
    snapshot.forEach((user) => {
      users.value.push({ ...user.data(), id: user.id });
    });


    for (let i = 0; i < users.value.length; i++) {
      for (let j = 0; j < chats.value.length; j++) {
        console.log(chats.value[j].users[users.value[i].id]);
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
              createdAtTime: chats.value[j].lastMessage.createdAtTime,
            },
          });
        }
      }
    }
    chatPreviews.value = result;
  });
};

  //Генерация массива сообщений для выбранного чата
  const setMsgGroups = (chatId) => {
    let result = {}

    let activeChatMessages = messages.value.filter((message) => message.chatId === chatId)

    activeChatMessages.forEach((message) => {
      if (result[message.createdAtDate]) {
        result[message.createdAtDate].push(message)
      } else {
        result[message.createdAtDate] = [message]
      }
    })
    msgGroups.value = result
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
