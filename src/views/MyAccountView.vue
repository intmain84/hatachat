<script setup>
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { storage } from '@/firebase'
import { ref, onMounted } from 'vue'
import { ref as fbRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const storeChat = useChatStore()
const storeAuth = useAuthStore()

const router = useRouter()

let storageRef = null

onMounted(() => {
  storageRef = fbRef(storage, `avatars/avatar${storeChat.user.id}`)
})

const myFileInputValue = ref(null)
const uploadingProgress = ref({
  progress: 0
})
const uploadTask = ref(null)

const getFileInputValue = (e) => {
  //get the file input value
  const file = e.target.files
  //assign it to our reactive reference value
  myFileInputValue.value = file[0]

  uploadTask.value = uploadBytesResumable(storageRef, myFileInputValue.value)

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.value.on(
    'state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      uploadingProgress.value.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      switch (snapshot.state) {
        case 'paused':
          uploadingProgress.value.status = 'Paused'
          break
        case 'running':
          console.log('Upload')
          uploadingProgress.value.status = 'Uploading...'
          break
      }
    },
    (error) => {
      alert(error)
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.value.snapshot.ref).then((downloadURL) => {
        storeAuth.postAvatar(downloadURL)
      })
    }
  )
}

const logout = async () => {
  await storeAuth.changeUserStatus(false)
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="myaccount">
    <form>
      <input
        @change="getFileInputValue"
        type="file"
        name="file"
        id="fileInput"
        class="fileInput"
        accept=".jpg, .png"
      />
      <img v-if="storeChat.user.avatar" class="avatar" :src="storeChat.user.avatar" />
      <div v-else class="avatar" :style="{ backgroundColor: storeChat.user.avatarBg }">
        {{ storeChat.user.nickname.charAt(0).toUpperCase() }}
      </div>
    </form>
    <!-- <div class="uploadingProgress">
      {{
        uploadingProgress.progress === 0 || uploadingProgress.progress === 100
          ? ''
          : Math.round(uploadingProgress.progress)
      }}
      {{
        uploadingProgress.progress === 0 || uploadingProgress.progress === 100
          ? ''
          : uploadingProgress.status
      }}
    </div> -->
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

.uploadingProgress {
  color: #fff;
}

.email {
  color: #fff;
}
.icon {
  margin-left: 4px;
}
</style>
