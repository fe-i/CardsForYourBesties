import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, DocumentReference } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
	API_KEY,
	AUTH_DOMAIN,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID
} from "../../../env";

initializeApp({
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID
});

const db = collection(getFirestore(), "cards");
const storage = getStorage();

const useFirebase = () => {
	const write = async (data: object) => {
		await addDoc(db, data)
			.then((ref: any) => {
				console.log(`Document ${ref.id} written successfully.`);
			})
			.catch((e: any) => {
				console.error(`Error writing to cards: ${e}`);
			});
	};

	const read = async (ref: DocumentReference) => {
		//TODO: make viewcard page work
		await getDoc(ref)
			.then((ref: any) => {
				console.log(`Document ${ref}.`);
			})
			.catch((e: any) => {
				console.error(`Error reading from cards: ${e}`);
			});
	};

	const upload = async (image: File) => {
		const reference = ref(storage, /*image.name*/ Math.random().toString(36).substring(2, 15)); //TODO: random image name
		const snapshot = await uploadBytes(reference, image);
		return await getDownloadURL(snapshot.ref);
	};

	return { write, read, upload };
};

export default useFirebase;
