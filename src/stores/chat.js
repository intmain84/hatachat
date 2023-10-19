import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const currentUser = ref()

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
      email: 'petra@gmail.com',
      nickname: 'Petra',
      password: 'pass2'
    },
    {
      id: '3',
      avatar: 'https://vuesax.com/avatars/avatar-8.png',
      email: 'bell@gmail.com',
      nickname: 'Micah',
      password: 'pass3'
    }
  ])

  const chats = ref([
    {
      id: 1,
      users: ['1', '2'],
      lastMessage: {
        text: "If you continue to interrupt me, I'll kill you, boy",
        fromUser: '1',
        createdAtDate: '12.09.2023',
        createdAtTime: '20:05'
      }
    },
    {
      id: 2,
      users: ['2', '3'],
      lastMessage: {
        text: 'Very simple and regular text for message',
        fromUser: '3',
        createdAtDate: '12.09.2023',
        createdAtTime: '16:44'
      }
    },
    {
      id: 3,
      users: ['3', '1'],
      lastMessage: {
        text: "You ain't gonna get that gun, blacklung",
        fromUser: '3',
        createdAtDate: '12.09.2023',
        createdAtTime: '18:37'
      }
    }
  ])

  const messages = ref([
    {
      id: 1,
      chatId: 1,
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '14:30',
      toUser: 1,
      fromUser: 2,
      text: "Excited about the weekend, but I can't make it to the party. Catch up soon!"
    },
    {
      id: 2,
      chatId: 2,
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '15:15',
      toUser: 2,
      fromUser: 3,
      text: "Unfortunately, party attendance is a no-go. Family reunion plans, but we'll meet soon!"
    },
    {
      id: 3,
      chatId: 3,
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '16:00',
      toUser: 3,
      fromUser: 1,
      text: "Apologies, party isn't in the cards; family reunion takes precedence. We'll reconnect soon!"
    },
    {
      id: 4,
      chatId: 3,
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '17:45',
      toUser: 1,
      fromUser: 3,
      text: "I regret missing the party; family reunion conflict, but let's schedule a meetup!"
    },
    {
      id: 5,
      chatId: 1,
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '18:20',
      toUser: 2,
      fromUser: 1,
      text: "Count me out for the party, family reunion this weekend. Let's plan a get-together soon!"
    },
    {
      id: 6,
      chatId: 3,
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '19:10',
      toUser: 1,
      fromUser: 3,
      text: "Party's a miss due to family reunion commitments. We must catch up soon!"
    },
    {
      id: 7,
      chatId: 1,
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '20:05',
      toUser: 1,
      fromUser: 2,
      text: "I'm sorry, can't make it to the party. Family reunion this weekend, but let's meet up soon!"
    },
    {
      id: 8,
      chatId: 2,
      isRead: true,
      createdAtDate: '12.09.2023',
      createdAtTime: '21:30',
      toUser: 2,
      fromUser: 3,
      text: "Change of plans, can't attend the party; family reunion is the priority. Let's connect later!"
    }
    // {
    //   id: 9,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '22:15',
    //   toUser: 3,
    //   fromUser: 2,
    //   text: "I won't be at the party; family reunion on the agenda, but we should plan a meetup soon!"
    // },
    // {
    //   id: 10,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '23:00',
    //   toUser: 1,
    //   fromUser: 3,
    //   text: "Party canceled due to family reunion. Let's reschedule for a later meet!"
    // },
    // {
    //   id: 11,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '09:30',
    //   toUser: 1,
    //   fromUser: 2,
    //   text: "Party's a miss; family reunion on the horizon, but we'll reconnect soon!"
    // },
    // {
    //   id: 12,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '10:45',
    //   toUser: 2,
    //   fromUser: 3,
    //   text: "Sorry, can't attend the party; family reunion event, but let's arrange a meetup soon!"
    // },
    // {
    //   id: 13,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '11:15',
    //   toUser: 1,
    //   fromUser: 2,
    //   text: "Regrets about the party; family reunion this weekend, but we'll reconnect soon!"
    // },
    // {
    //   id: 14,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '13:00',
    //   toUser: 2,
    //   fromUser: 3,
    //   text: "Unfortunately, I can't make it to the party; family reunion planned. Let's catch up later!"
    // },
    // {
    //   id: 15,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '14:45',
    //   toUser: 1,
    //   fromUser: 2,
    //   text: "Change of plans, I won't be at the party; family reunion is in the picture, but let's meet soon!"
    // },
    // {
    //   id: 16,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '15:35',
    //   toUser: 2,
    //   fromUser: 1,
    //   text: "Apologies, can't make it to the party; family reunion this weekend. Let's catch up later!"
    // },
    // {
    //   id: 17,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '16:55',
    //   toUser: 1,
    //   fromUser: 2,
    //   text: "Party plans disrupted by the family reunion; let's reschedule for another time!"
    // },
    // {
    //   id: 18,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '17:25',
    //   toUser: 1,
    //   fromUser: 3,
    //   text: "I won't attend the party; family reunion conflict, but we should meet up soon!"
    // },
    // {
    //   id: 19,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '18:10',
    //   toUser: 1,
    //   fromUser: 2,
    //   text: "Sorry, I won't make it to the party; family reunion plans, but let's connect soon!"
    // }
    // {
    //   id: 20,
    //   isRead: true,
    //   createdAtDate: '12.09.2023',
    //   createdAtTime: '19:20',
    //   toUser: 1,
    //   fromUser: 3,
    //   text: "Change of plans, can't attend the party; family reunion this weekend. Let's catch up later!"
    // }
  ])

  //Actions
  //Сохранение в store твоего айдишника
  const setCurrentUser = (currentUserId) => {
    currentUser.value = currentUserId
  }

  const getChatRoom = (selectedUserId) => {
    let [selectedChat] = chats.value.filter(
      (chat) => chat.users.includes(selectedUserId) && chat.users.includes(currentUser.value)
    )
    return selectedChat
  }

  //Getters
  //Получение списка всех юзеров приложения кроме тебя
  const getChatList = computed(() => {
    let noCurrentUserChatList = []
    noCurrentUserChatList = chats.value.filter((chat) => chat.users.includes(currentUser.value))
    console.log(noCurrentUserChatList)
    return noCurrentUserChatList
  })

  //Получение твоего никнейма для отображения в приветственном окне
  const getCurrentUser = computed(() => {
    const currentUserData = users.value.find((user) => user.id == currentUser.value)
    return currentUserData.nickname
  })

  // function increment() {
  //   count.value++
  // }

  return {
    //Getters
    getChatList,
    getCurrentUser,

    //Actions
    setCurrentUser,
    getChatRoom
  }
})
