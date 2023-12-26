import { storage } from "./firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export const uploadImage = async (path, file) => {

    const imageRef = ref(storage, path)

    try {
        const uploaded = await uploadBytes(imageRef, file, {
            contentType: 'image/jpeg',
        })
        console.log('uploaded', uploaded);
    } catch(e) {
        console.log('uploaded failed', e)
    }
}

export const loadImage = async (path) => {
    try {
        const url = await getDownloadURL(ref(storage, path))

        return url
    } catch(e) {
        console.log("Cannot load image", e);
    }
}