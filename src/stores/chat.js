import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const currentUser = ref()
  const chatPreviews = ref([])
  const msgGroups = ref([])

  const users = ref([
    {
      id: '1',
      avatar: 'https://vuesax.com/avatars/avatar-9.png',
      email: 'vuesax@gmail.com',
      nickname: 'Arthur',
      password: 'pass1'
    },
    {
      id: '2',
      avatar: 'https://vuesax.com/avatars/avatar-3.png',
      email: 'sadie@gmail.com',
      nickname: 'Sadie',
      password: 'pass2'
    },
    {
      id: '3',
      avatar: 'https://vuesax.com/avatars/avatar-7.png',
      email: 'dutch@gmail.com',
      nickname: 'Dutch',
      password: 'pass3'
    }
  ])

  const chats = ref([
    {
      chatId: '111',
      users: ['1', '2'],
      lastMessage: {
        text: "Apart From My Jakey, You're The Best Man I Know",
        fromUser: '2',
        createdAtDate: '12.09.2023',
        createdAtTime: '20:05'
      }
    },
    {
      chatId: '222',
      users: ['1', '3'],
      lastMessage: {
        text: null,
        fromUser: '2',
        createdAtDate: '12.09.2023',
        createdAtTime: '15:13'
      }
    },
    {
      chatId: '333',
      users: ['2', '3'],
      lastMessage: {
        text: null,
        fromUser: '2',
        createdAtDate: '12.09.2023',
        createdAtTime: '19:05'
      }
    }
  ])

  const messages = ref([
    {
      id: 1,
      isRead: false,
      createdAtDate: '12.09.2023',
      createdAtTime: '14:30',
      chatId: '111',
      fromUser: '1',
      text: "Excited about the weekend, but I can't make it to the party. Catch up soon!"
    },
    {
      id: 2,
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '15:15',
      chatId: '111',
      fromUser: '2',
      text: "Unfortunately, party attendance is a no-go. Family reunion plans, but we'll meet soon!"
    },
    {
      id: 3,
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '16:00',
      chatId: '111',
      fromUser: '2',
      text: "Apologies, party isn't in the cards; family reunion takes precedence. We'll reconnect soon!"
    },
    {
      id: 4,
      isRead: true,
      createdAtDate: '13.09.2023',
      createdAtTime: '17:45',
      chatId: '111',
      fromUser: '1',
      text: "I regret missing the party; family reunion conflict, but let's schedule a meetup!"
    }
    // {
    //   id: 5,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '18:20',
    //   chatId: '2',
    //   fromUser: '1',
    //   text: "Count me out for the party, family reunion this weekend. Let's plan a get-together soon!"
    // },
    // {
    //   id: 6,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '19:10',
    //   chatId: '1',
    //   fromUser: '3',
    //   text: "Party's a miss due to family reunion commitments. We must catch up soon!"
    // },
    // {
    //   id: 7,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '20:05',
    //   chatId: '1',
    //   fromUser: '2',
    //   text: "I'm sorry, can't make it to the party. Family reunion this weekend, but let's meet up soon!"
    // },
    // {
    //   id: 8,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '21:30',
    //   chatId: '2',
    //   fromUser: '3',
    //   text: "Change of plans, can't attend the party; family reunion is the priority. Let's connect later!"
    // },
    // {
    //   id: 9,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '22:15',
    //   chatId: '3',
    //   fromUser: '2',
    //   text: "I won't be at the party; family reunion on the agenda, but we should plan a meetup soon!"
    // },
    // {
    //   id: 10,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '23:00',
    //   chatId: '1',
    //   fromUser: '3',
    //   text: "Party canceled due to family reunion. Let's reschedule for a later meet!"
    // },
    // {
    //   id: 11,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '09:30',
    //   chatId: '1',
    //   fromUser: '2',
    //   text: "Party's a miss; family reunion on the horizon, but we'll reconnect soon!"
    // },
    // {
    //   id: 12,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '10:45',
    //   chatId: '2',
    //   fromUser: '3',
    //   text: "Sorry, can't attend the party; family reunion event, but let's arrange a meetup soon!"
    // },
    // {
    //   id: 13,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '11:15',
    //   chatId: '1',
    //   fromUser: '2',
    //   text: "Regrets about the party; family reunion this weekend, but we'll reconnect soon!"
    // },
    // {
    //   id: 14,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '13:00',
    //   chatId: '2',
    //   fromUser: '3',
    //   text: "Unfortunately, I can't make it to the party; family reunion planned. Let's catch up later!"
    // },
    // {
    //   id: 15,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '14:45',
    //   chatId: '1',
    //   fromUser: '2',
    //   text: "Change of plans, I won't be at the party; family reunion is in the picture, but let's meet soon!"
    // },
    // {
    //   id: 16,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '15:35',
    //   chatId: '2',
    //   fromUser: '1',
    //   text: "Apologies, can't make it to the party; family reunion this weekend. Let's catch up later!"
    // },
    // {
    //   id: 17,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '16:55',
    //   chatId: '1',
    //   fromUser: '2',
    //   text: "Party plans disrupted by the family reunion; let's reschedule for another time!"
    // },
    // {
    //   id: 18,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '17:25',
    //   chatId: '1',
    //   fromUser: '3',
    //   text: "I won't attend the party; family reunion conflict, but we should meet up soon!"
    // },
    // {
    //   id: 19,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '18:10',
    //   chatId: '1',
    //   fromUser: '2',
    //   text: "Sorry, I won't make it to the party; family reunion plans, but let's connect soon!"
    // }
    // {
    //   id: 20,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '19:20',
    //   chatId: '1',
    //   fromUser: '3',
    //   text: "Change of plans, can't attend the party; family reunion this weekend. Let's catch up later!"
    // }
  ])

  //Actions
  //Сохранение в store твоего айдишника
  const setCurrentUser = (currentUserId) => {
    currentUser.value = currentUserId
  }

  //Генерация массива для отображения превью в списке слева
  const setChatPreviews = () => {
    let result = []
    for (let i = 0; i < users.value.length; i++) {
      for (let j = 0; j < chats.value.length; j++) {
        if (
          users.value[i].id !== currentUser.value &&
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
  }

  //Генерация массива сообщений для выбранного чата
  const setMsgGroups = (chatId) => {
    let result = []
    //let activeChat = chats.value.find((chat) => chat.chatId === chatId)
    //let chatUsers = activeChat.users
    let activeChatMessages = messages.value.filter((message) => message.chatId === chatId)
    for (let i = 0; i < activeChatMessages.length; i++) {
      if (result.length === 0) {
        result.push({
          date: activeChatMessages[i].createdAtDate,
          messages: []
        })
      }
      for (let j = 0; j < result.length; j++) {
        if (result[j].date === activeChatMessages[i].createdAtDate) {
          result[j].messages.push({
            id: activeChatMessages[i].id,
            isRead: activeChatMessages[i].isRead,
            createdAtTime: activeChatMessages[i].createdAtTime,
            fromUser: activeChatMessages[i].fromUser,
            text: activeChatMessages[i].text
          })
        } else {
          result.push({
            date: activeChatMessages[i].createdAtDate,
            messages: [
              {
                id: activeChatMessages[i].id,
                isRead: activeChatMessages[i].isRead,
                createdAtTime: activeChatMessages[i].createdAtTime,
                fromUser: activeChatMessages[i].fromUser,
                text: activeChatMessages[i].text
              }
            ]
          })
        }
      }
    }

    console.log('result', result)

    // {
    //     id: '1',
    //     date: '21.12.2015',
    //     messages: [
    //       {
    //         id: 1,
    //         isRead: false,
    //         createdAtDate: '12.09.2023',
    //         createdAtTime: '14:30',
    //         chatId: '111',
    //         fromUser: '1',
    //         text: "Excited about the weekend, but I can't make it to the party. Catch up soon!"
    //       },
    //       {
    //         id: 2,
    //         isRead: true,
    //         createdAtDate: '12.09.2023',
    //         createdAtTime: '15:15',
    //         chatId: '111',
    //         fromUser: '2',
    //         text: "Unfortunately, party attendance is a no-go. Family reunion plans, but we'll meet soon!"
    //       }
    //     ]
    //   }
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

    //Getters
    getCurrentUser,
    getChatHeaderInfo,

    //Actions
    setCurrentUser,
    setChatPreviews,
    setMsgGroups
  }
})
