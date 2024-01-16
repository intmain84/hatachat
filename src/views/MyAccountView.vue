<script setup>
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

const storeChat = useChatStore()
const storeAuth = useAuthStore()

const router = useRouter()

const myFileInputValue = ref(null)
const uploadInput = ref(null)
const pic = ref('')
const result = reactive({
  dataURL: '',
  blobURL: ''
})

const display = ref('none')

const getFileInputValue = (e) => {
  pic.value = ''
  result.dataURL = ''
  result.blobURL = ''
  //get the file input value
  const files = e.target.files
  //assign it to our reactive reference value
  myFileInputValue.value = files[0]

  const reader = new FileReader()

  reader.readAsDataURL(myFileInputValue.value)

  reader.onload = () => {
    pic.value = String(reader.result)
    display.value = 'flex'
    if (!uploadInput.value) return
    uploadInput.value.value = ''
  }
}

//Finish cropping and sending image to the server
const getResult = async () => {
  if (!cropper) return
  const base64 = cropper.getDataURL()
  result.dataURL = base64
  await storeAuth.postAvatar(result.dataURL)
  display.value = 'none'
}

//Log Out of the app
const logout = async () => {
  await storeAuth.changeUserStatus(false)
  router.push({ name: 'home' })
  storeChat.logOut()
}
</script>

<template>
  <!-- Modal -->
  <div
    id="cropModal"
    class="cropModal"
    :style="{ display: display }"
    @click.self="display = 'none'"
  >
    <div class="cropModal-content">
      <span class="close" @click="display = 'none'">&times;</span>
      <VuePictureCropper
        :boxStyle="{
          width: '400px',
          backgroundColor: '#1e212a',
          margin: 'auto'
        }"
        :img="pic"
        :options="{
          viewMode: 1,
          dragMode: 'crop',
          aspectRatio: 1 / 1
        }"
      />
      <button class="btn mt-24" @click="getResult">Submit</button>
    </div>
  </div>
  <!--  -->
  <div class="myaccount">
    <form>
      <input
        ref="uploadInput"
        @change="getFileInputValue"
        type="file"
        name="file"
        id="fileInput"
        class="fileInput"
        accept="image/jpg, image/jpeg, image/png, image/gif"
      />
      <img v-if="storeChat.user.avatar" class="avatar" :src="storeChat.user.avatar" />
      <div v-else class="avatar" :style="{ backgroundColor: storeChat.user.avatarBg }">
        <!-- {{ Array.from(storeChat.user.nickname.toUpperCase())[0] }} -->
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

.uploadingProgress {
  color: #fff;
}

.email {
  color: #fff;
}
.icon {
  margin-left: 4px;
}

/* The Modal (background) */
.cropModal {
  justify-content: center;
  align-items: center;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(24, 26, 34); /* Fallback color */
  background-color: rgba(11, 12, 15, 0.8); /* Black w/ opacity */
}

/* Modal Content/Box */
.cropModal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2f3341;
  margin: 1% auto; /* 15% from the top and centered */
  padding: 20px;
  border-radius: 9px;
  width: 90%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
/* The Modal (background) End */
</style>
