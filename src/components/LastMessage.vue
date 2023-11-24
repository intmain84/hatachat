<script setup>
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
  lastMessage.value = await storeChat.getLastMessage(props.chat.id)
})
</script>

<template>
  <div>{{ lastMessage }}</div>
</template>

<style scoped></style>
