import { defineStore } from 'pinia'
import { db } from '../firebase'
import {
  query,
  and,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  addDoc,
  collection
} from 'firebase/firestore'
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

    querySnapshot.forEach((userFromBd) => {
      storeChat.user.id = userFromBd.id
      storeChat.user.email = userFromBd.data().email
      storeChat.user.nickname = userFromBd.data().nickname
      storeChat.user.avatarBg = userFromBd.data().avatarBg
      storeChat.user.avatar = userFromBd.data().avatar
    })
  }

  //Change user status
  const changeUserStatus = async (userStatus) => {
    await setDoc(doc(db, 'users', storeChat.user.id), { status: userStatus }, { merge: true })
  }

  //Sending status to DB
  const isUserTyping = async (isTyping) => {
    let docId = 'sdJHUisgdf' + 'sdfs7df67sg'
    await setDoc(doc(db, 'statuses', docId), { isTyping: isTyping }, { merge: true })
  }

  //Update user avatar
  const postAvatar = async (imageUrl) => {
    setDoc(doc(db, 'users', storeChat.user.id), { avatar: imageUrl }, { merge: true })

    const docRef = doc(db, 'users', storeChat.user.id)
    const docSnap = await getDoc(docRef)

    storeChat.user.avatar = docSnap.data().avatar
  }

  return {
    //ActionsDocumentSnapshot
    loginUser,
    registerUser,
    isUserTyping,
    changeUserStatus,
    postAvatar
  }
})
