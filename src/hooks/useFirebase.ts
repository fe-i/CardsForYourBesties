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
		await addDoc(docs, data)
			.then((doc: any) => {
				console.log(`Document ${doc.id} written successfully.`);
			})
			.catch((e: any) => {
				console.error(`Error writing to collection: ${e}`);
			});
	};

	const read = (id: string) => {
		//TOOD: doesn't work
		return getDoc(doc(docs, id))
			.then((doc: any) => {
				console.log(`Document ${doc.id} found successfully.`);
				return doc.data();
			})
			.catch((e: any) => {
				console.error(`Error reading from collection: ${e}`);
				return {
					recipient: "recipient",
					sender: "sender",
					message: "your message here",
					image: "image.png"
				};
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
