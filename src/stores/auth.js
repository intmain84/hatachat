import { defineStore } from 'pinia'
import { db } from '../firebase'
import { query, and, where, getDocs, addDoc, doc, collection } from 'firebase/firestore'
import { useChatStore } from './chat'

export const useAuthStore = defineStore('auth', () => {
  const storeChat = useChatStore()

  //ACTIONS
  //Sign up
  const registerUser = async (userSignUpData) => {
    const q = query(collection(db, 'users'), where('email', '==', userSignUpData.email))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.size != 0) throw Error('This email is already registered')

    await addDoc(collection(db, 'users'), {
      avatar: '',
      email: userSignUpData.email,
      nickname: userSignUpData.nickname,
      password: userSignUpData.password
    })
  }
  //Login
  const loginUser = async (userLoginData) => {
    const q = query(
      collection(db, 'users'),
      and(
        where('email', '==', userLoginData.email),
        where('password', '==', userLoginData.password)
      )
    )

    const querySnapshot = await getDocs(q)

    if (querySnapshot.size == 0) throw Error('Invalid email or password')

    querySnapshot.forEach((doc) => {
      storeChat.user.id = doc.id
      storeChat.user.email = doc.data().email
      storeChat.user.nickname = doc.data().nickname
    })
  }

  //GETTERS

  return {
    //States
    //Getters
    //Actions
    loginUser,
    registerUser
  }
})
