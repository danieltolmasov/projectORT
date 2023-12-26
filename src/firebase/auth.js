import { auth } from "./firebase"
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addLawyer } from "./lawyers";

export const signUp = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
      const user = userCredential.user;

      // await addLawyer(user.uid, {
      //   email: user.email
      // })
     return user
      
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message; 
  });
}

export const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
      
        return user

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
