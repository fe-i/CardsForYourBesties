import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
	API_KEY,
	AUTH_DOMAIN,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID
} from "../../env";

initializeApp({
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID
});

const docs = collection(getFirestore(), "cards");
const storage = getStorage();

const useFirebase = () => {
	const write = async (data: object) => {
		try {
			const docRef = await addDoc(docs, data);
			console.log(`Document written with ID: ${docRef.id}`);
			return docRef.id;
		} catch (e) {
			console.error("Error adding document: ", e);
			return;
		}
	};

	const read = async (id: string) => {
		const docRef = doc(docs, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log(`Document found with ID: ${docSnap.id}`);
			return docSnap.data();
		} else {
			console.error("Document not found!");
			return;
		}
	};

	const upload = async (image: File) => {
		const storageRef = ref(storage, /*image.name*/ Math.random().toString(36).substring(2, 15)); //TODO: random image name
		const storageSnap = await uploadBytes(storageRef, image);
		return await getDownloadURL(storageSnap.ref);
	};

	return { write, read, upload };
};

export default useFirebase;
