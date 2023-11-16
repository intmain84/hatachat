import { defineStore } from 'pinia'
import { db } from '../firebase'
import { query, and, where, getDocs, setDoc, doc, addDoc, collection } from 'firebase/firestore'
import { useChatStore } from './chat'

export const useAuthStore = defineStore('auth', () => {
  const storeChat = useChatStore()

  //ACTIONS
  //Sign up
  const registerUser = async (userSignUpData) => {
    const q = query(collection(db, 'users'), where('email', '==', userSignUpData.email))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.size != 0) throw Error('This email is already registered')

    const avatarBg = '#' + Math.floor(Math.random() * 16777215).toString(16)
    console.log('#' + avatarBg)

    await addDoc(collection(db, 'users'), {
      avatar: '',
      email: userSignUpData.email,
      nickname: userSignUpData.nickname,
      password: userSignUpData.password,
      avatarBg,
      status: false
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

  //Change user status
  const changeUserStatus = async (userStatus) => {
    setDoc(doc(db, 'users', storeChat.user.id), { status: userStatus }, { merge: true })
  }

  //GETTERS

  return {
    //States
    //Getters
    //Actions
    loginUser,
    registerUser,
    changeUserStatus
  }
})
