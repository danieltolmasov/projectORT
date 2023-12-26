import {db} from "./firebase"

import {collection, getDocs, updateDoc, query, doc, setDoc, getDoc} from "firebase/firestore"
import { loadImage, uploadImage } from "./storage"

import {deleteDoc } from "firebase/firestore";

const lawyersCollection = collection(db, "lawyers")


export const addLawyer = async (id, lawyer) => {
    try {
        const dbDoc = await setDoc(doc(db, 'lawyers', id), lawyer)
        console.log("insert in db", dbDoc);
        
        return dbDoc
    } catch(e) {
        console.error('Cant add lawyer to db: ' + e)
    }
}
export const deleteLawyer = async (lawyerId) => {
    try {
      await deleteDoc(doc(db, "lawyers", lawyerId));
    } catch (error) {
      throw error;
    }
  };
export const updateLawyer = async (userId, lawyer) => {
    if(lawyer.photo) {
        const lawyerPhoto = lawyer.photo
        delete lawyer.photo
        await uploadImage(`images/${userId}.jpg`, lawyerPhoto)
    }

    const dbDoc = await updateDoc(doc(db, 'lawyers', userId), lawyer)
    
    console.log("update in db", dbDoc);
    return dbDoc
}

export const getLawyers = async () => {
    const lawyers = (await getDocs(query(lawyersCollection))).docs

    const parsedLawyers = []

    for(let lawyer of lawyers) {
        const lawyerId = lawyer.id
        const parsedLawyer = lawyer.data()
        parsedLawyer.photo = await loadImage(`images/${lawyerId}.jpg`)
        parsedLawyer.id = lawyerId
        parsedLawyers.push(parsedLawyer)
    }

    console.log({parsedLawyers});
    return parsedLawyers
}

export const getLawyer = async (id) => {
    const lawyer = await getDoc(doc(db, 'lawyers', id))

    const parsedLawyer = lawyer.data()
    parsedLawyer.photo = await loadImage(`images/${id}.jpg`)

    return parsedLawyer
}

