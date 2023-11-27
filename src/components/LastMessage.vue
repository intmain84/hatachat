<script setup>
import { db } from '../firebase'
import { collection, query, limit, orderBy, and, or, where, onSnapshot } from 'firebase/firestore'
import { useChatStore } from '@/stores/chat'
import { ref, onMounted } from 'vue'

const storeChat = useChatStore()

const lastMessage = ref('')

const props = defineProps(['chat'])
// Здесь реализуем получение последнего сообщения
// 1) Сюда пропсами можно передать айдишник этого юзера, свой айдишник достать из глобального стейта
// 2) Нужно здесь как-то запросить последнее сообщение из базы через пинью. Наверно вызывать функцию из Пиньи отсюда в onMounted
// 3) Там эта функция будет содержать запрос в базу с фильтрацией и onSnapshot
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

  return new Promise((resolve, reject) => {
    onSnapshot(
      q,
      (snapshot) => {
        console.log(snapshot)

        snapshot.forEach((message) => {
          lastMessage.value = message.data().text
        })

        resolve()
      },
      (error) => {
        reject(error)
      }
    )
  })
})
</script>

<template>
  <div>{{ lastMessage }}</div>
</template>

<style scoped></style>
