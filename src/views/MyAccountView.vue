<script setup>
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { storage } from '@/firebase'
import { ref } from 'vue'
import { ref as fbRef, uploadBytes } from 'firebase/storage'

const storageRef = fbRef(storage, 'avatars')

const storeChat = useChatStore()
const storeAuth = useAuthStore()

const router = useRouter()

const myFileInputValue = ref(null)

const getFileInputValue = (e) => {
  //get the file input value
  const file = e.target.files
  //assign it to our reactive reference value
  myFileInputValue.value = file[0]
}

// uploadBytes(storageRef, myFileInputValue.value).then((snapshot) => {
//   console.log('Uploaded a blob or file!', snapshot)
// })

const logout = async () => {
  await storeAuth.changeUserStatus(false)
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="myaccount">
    <form>
      <input @change="getFileInputValue" type="file" name="file" id="fileInput" class="fileInput" />
      <img v-if="storeChat.user.avatar" class="avatar" :src="storeChat.user.avatar" />
      <div v-else class="avatar" :style="{ backgroundColor: storeChat.user.avatarBg }">
        {{ storeChat.user.nickname.charAt(0).toUpperCase() }}
      </div>
    </form>
    <h1 class="mb-16">{{ storeChat.getCurrentUserNickname }}</h1>
    <div class="email mb-24">{{ storeChat.user.email }}</div>
    <button class="btn" @click.prevent="logout">
      Logout <ArrowRightOnRectangleIcon class="icon icon24" />
    </button>
  </div>
</template>

<style scoped>
.myaccount {
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: var(--dark-elements);
  border-radius: var(--primary-radius);
  padding: 48px;
  height: 100%;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  width: 104px;
  height: 104px;
  border-radius: 100%;
  margin-bottom: 24px;
}

form {
  display: flex;
  position: relative;
}

form .fileInput {
  position: absolute;
  height: 100%;
  width: 100%;
}

form .fileInput:hover {
  cursor: pointer;
}

.email {
  color: #fff;
}
.icon {
  margin-left: 4px;
}
</style>
