import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', () => {
  const currentUser = ref({
    userId: '1',
    nickname: 'Arthur'
  })
  const users = ref([
    {
      id: 1,
      avatar: 'https://vuesax.com/avatars/avatar-5.png',
      email: 'vuesax@gmail.com',
      nickname: 'Rustamka',
      password: 'pass1'
    },
    {
      id: 2,
      avatar: 'https://vuesax.com/avatars/avatar-4.png',
      email: 'peter@gmail.com',
      nickname: 'Peter',
      password: 'pass2'
    },
    {
      id: 3,
      avatar: 'https://vuesax.com/avatars/avatar-2.png',
      email: 'john@gmail.com',
      nickname: 'John',
      password: 'pass3'
    }
  ])

  const messages = ref([
    {
      id: 1,
      createdAtDate: '12.09.2023',
      createdAtTime: '14:30',
      recipientId: 1,
      senderId: 2,
      text: "Excited about the weekend, but I can't make it to the party. Catch up soon!"
    },

    {
      id: 2,
      createdAtDate: '12.09.2023',
      createdAtTime: '15:15',
      recipientId: 2,
      senderId: 3,
      text: "Unfortunately, party attendance is a no-go. Family reunion plans, but we'll meet soon!"
    },

    {
      id: 3,
      createdAtDate: '12.09.2023',
      createdAtTime: '16:00',
      recipientId: 3,
      senderId: 1,
      text: "Apologies, party isn't in the cards; family reunion takes precedence. We'll reconnect soon!"
    },

    {
      id: 4,
      createdAtDate: '12.09.2023',
      createdAtTime: '17:45',
      recipientId: 1,
      senderId: 3,
      text: "I regret missing the party; family reunion conflict, but let's schedule a meetup!"
    },

    {
      id: 5,
      createdAtDate: '12.09.2023',
      createdAtTime: '18:20',
      recipientId: 2,
      senderId: 1,
      text: "Count me out for the party, family reunion this weekend. Let's plan a get-together soon!"
    },

    {
      id: 6,
      createdAtDate: '12.09.2023',
      createdAtTime: '19:10',
      recipientId: 1,
      senderId: 3,
      text: "Party's a miss due to family reunion commitments. We must catch up soon!"
    },

    {
      id: 7,
      createdAtDate: '12.09.2023',
      createdAtTime: '20:05',
      recipientId: 1,
      senderId: 2,
      text: "I'm sorry, can't make it to the party. Family reunion this weekend, but let's meet up soon!"
    },

    {
      id: 8,
      createdAtDate: '12.09.2023',
      createdAtTime: '21:30',
      recipientId: 2,
      senderId: 3,
      text: "Change of plans, can't attend the party; family reunion is the priority. Let's connect later!"
    },

    {
      id: 9,
      createdAtDate: '12.09.2023',
      createdAtTime: '22:15',
      recipientId: 3,
      senderId: 2,
      text: "I won't be at the party; family reunion on the agenda, but we should plan a meetup soon!"
    },

    {
      id: 10,
      createdAtDate: '12.09.2023',
      createdAtTime: '23:00',
      recipientId: 1,
      senderId: 3,
      text: "Party canceled due to family reunion. Let's reschedule for a later meet!"
    },

    {
      id: 11,
      createdAtDate: '12.09.2023',
      createdAtTime: '09:30',
      recipientId: 1,
      senderId: 2,
      text: "Party's a miss; family reunion on the horizon, but we'll reconnect soon!"
    },

    {
      id: 12,
      createdAtDate: '12.09.2023',
      createdAtTime: '10:45',
      recipientId: 2,
      senderId: 3,
      text: "Sorry, can't attend the party; family reunion event, but let's arrange a meetup soon!"
    },

    {
      id: 13,
      createdAtDate: '12.09.2023',
      createdAtTime: '11:15',
      recipientId: 1,
      senderId: 2,
      text: "Regrets about the party; family reunion this weekend, but we'll reconnect soon!"
    },

    {
      id: 14,
      createdAtDate: '12.09.2023',
      createdAtTime: '13:00',
      recipientId: 2,
      senderId: 3,
      text: "Unfortunately, I can't make it to the party; family reunion planned. Let's catch up later!"
    },

    {
      id: 15,
      createdAtDate: '12.09.2023',
      createdAtTime: '14:45',
      recipientId: 1,
      senderId: 2,
      text: "Change of plans, I won't be at the party; family reunion is in the picture, but let's meet soon!"
    },

    {
      id: 16,
      createdAtDate: '12.09.2023',
      createdAtTime: '15:35',
      recipientId: 2,
      senderId: 1,
      text: "Apologies, can't make it to the party; family reunion this weekend. Let's catch up later!"
    },

    {
      id: 17,
      createdAtDate: '12.09.2023',
      createdAtTime: '16:55',
      recipientId: 1,
      senderId: 2,
      text: "Party plans disrupted by the family reunion; let's reschedule for another time!"
    },

    {
      id: 18,
      createdAtDate: '12.09.2023',
      createdAtTime: '17:25',
      recipientId: 1,
      senderId: 3,
      text: "I won't attend the party; family reunion conflict, but we should meet up soon!"
    },

    {
      id: 19,
      createdAtDate: '12.09.2023',
      createdAtTime: '18:10',
      recipientId: 1,
      senderId: 2,
      text: "Sorry, I won't make it to the party; family reunion plans, but let's connect soon!"
    },

    {
      id: 20,
      createdAtDate: '12.09.2023',
      createdAtTime: '19:20',
      recipientId: 1,
      senderId: 3,
      text: "Change of plans, can't attend the party; family reunion this weekend. Let's catch up later!"
    }
  ])

  // const count = ref(0)

  const getChatList = computed(() => {
    let noCurrentUserChatList = []
    noCurrentUserChatList = users.value.filter((user) => user.id != currentUser.value.userId)
    return noCurrentUserChatList
  })

  const getCurrentUser = computed(() => {
    return currentUser
  })

  // function increment() {
  //   count.value++
  // }

  return { getChatList, getCurrentUser }
})
