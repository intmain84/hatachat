import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase'
import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref()
  //Actions
  const registerUser = async (userSignUpData) => {
    console.log(userSignUpData.nickname)
    try {
      console.log('1')
      const data = await createUserWithEmailAndPassword(
        auth,
        userSignUpData.email,
        userSignUpData.password
      )
      // Signed up
      user.value = data.user

      console.log(user.value.email)
    } catch (error) {
      console.log(error)
    }

    try {
      console.log('2')
      await setDoc(doc(db, 'users', user.value.uid), {
        avatar: '',
        email: user.value.email,
        nickname: userSignUpData.nickname
      })
    } catch (error) {
      console.log(error)
    }
  }

  const loginUser = (userLoginData) => {
    try {
      const data = signInWithEmailAndPassword(auth, userLoginData.email, userLoginData.password)
      user.value = data.user
    } catch (error) {
      // if (error.code) alert('Wrong email or password')
      // if (error.code === auth/too-many-requests) alert('Too many requests. Please try again later')
      console.log(error.code)
    }
  }

  //Getter

  return {
    //States
    //Getters
    //Actions
    registerUser,
    loginUser
  }
})
