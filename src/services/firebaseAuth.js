import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from './firebaseConfig'

async function registerUser(email, password) {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        return {status: 201, user: userCredential.user}
    })
    .catch((error) => {
        return {status: 400, err:{"code": error.code, "message": error.message}}
    })

    return response
}

async function loginUser(email, password) {
    const response = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        return {status: 200, user: userCredential.user}
    })
    .catch((error) => {
        return {status: 400, err: {"code": error.code, "message": error.message}}
    })

    return response
}

export {registerUser, loginUser}