<script setup>
import { db } from '../firebase'
import { collection, query, limit, orderBy, and, or, where, onSnapshot } from 'firebase/firestore'
import { useChatStore } from '@/stores/chat'
import { ref, onMounted } from 'vue'

const storeChat = useChatStore()

const lastMessage = ref('')
const messageFromUser = ref('')

const props = defineProps(['chat'])

onMounted(async () => {
  const q = query(
    collection(db, 'messages'),
    and(
      or(where('fromUser', '==', storeChat.user.id), where('toUser', '==', storeChat.user.id)),
      or(where('fromUser', '==', props.chat.id), where('toUser', '==', props.chat.id))
    ),
    orderBy('dateStamp', 'desc'),
    limit(1)
  )

  onSnapshot(q, (snapshot) => {
    snapshot.forEach((message) => {
      lastMessage.value = message.data().text
      messageFromUser.value = message.data().fromUser
    })
  })
})
</script>

<template>
  <div v-if="!lastMessage">No messages yet</div>
  <div v-else>
    {{ messageFromUser === storeChat.user.id ? 'You' : props.chat.nickname }}: {{ lastMessage }}
  </div>
</template>

<style scoped></style>
