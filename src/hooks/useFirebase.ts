import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword,
	signOut as signOutOfAccount,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	deleteUser
} from "firebase/auth";
import {
	getFirestore,
	collection,
	doc,
	setDoc,
	addDoc,
	getDoc,
	deleteDoc,
	CollectionReference,
	DocumentData
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
	API_KEY,
	AUTH_DOMAIN,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID
} from "../../env";
import { v4 as uuidv4 } from "uuid";

initializeApp({
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID
});

const useFirebase = () => {
	const auth = getAuth();
	const firestore = getFirestore();
	const storage = getStorage();
	const cards = collection(firestore, "cards");
	/*const users = collection(firestore, "users");

	const signIn = async (email: string, password: string) => {
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			console.log(`[signIn] Signed in! ID: ${user.uid}`);
			return user;
		} catch (e) {
			console.error(`[signIn] Error: ${e}`);
			return null;
		}
	};

	const signOut = () => {
		const { currentUser } = auth;
		if (currentUser !== null) {
			signOutOfAccount(auth);
			console.log(`[signOut] Signed out! ID: ${currentUser.uid}`);
		} else console.error("[signOut] Not signed in!");
	};

	const signUp = async (name: string, email: string, password: string) => {
		try {
			const { user } = await createUserWithEmailAndPassword(auth, email, password);
			await write(users, { name, email, password, cards: [] }, user.uid);
			console.log(`[signUp] Signed up! ID: ${user.uid}`);
			return user;
		} catch (e) {
			console.error(`[signUp] Error: ${e}`);
			return null;
		}
	};

	const resetPassword = async (email: string) => {
		try {
			await sendPasswordResetEmail(auth, email);
			console.log("[resetPassword] Email sent!");
		} catch (e) {
			console.error(`[resetPassword] Error: ${e}}`);
			return null;
		}
	};

	const deleteAccount = async () => {
		try {
			const { currentUser } = auth;
			if (currentUser) {
				await deleteUser(currentUser);
				await _delete(users, currentUser.uid);
				console.log(`[deleteAccount] Deleted user! ID: ${currentUser.uid}`);
			}
		} catch (e) {
			console.error(`[deleteAccount] Error: ${e}`);
		}
	};*/

	const write = async (colRef: CollectionReference<DocumentData>, data: object, id?: string) => {
		try {
			if (id) {
				await setDoc(doc(colRef, id), data);
				console.log(`[write] Document written! ID: ${id}`);
				return id;
			} else {
				const { id } = await addDoc(colRef, data);
				console.log(`[write] Document written! ID: ${id}`);
				return id;
			}
		} catch (e) {
			console.error(`[write] Error: ${e}`);
			return null;
		}
	};

	const read = async (colRef: CollectionReference<DocumentData>, id: string) => {
		const docSnap = await getDoc(doc(colRef, id));
		if (docSnap.exists()) {
			console.log(`[read] Document found! ID: ${docSnap.id}`);
			return docSnap.data();
		} else {
			console.error("[read] Document not found!");
			return null;
		}
	};

	const _delete = async (colRef: CollectionReference<DocumentData>, id: string) => {
		try {
			await deleteDoc(doc(colRef, id));
			console.log("[delete] Document deleted!");
		} catch (e) {
			console.error("[delete] Document not found!");
		}
	};

	const upload = async (image: File) => {
		const storageRef = ref(storage, uuidv4());
		const storageSnap = await uploadBytes(storageRef, image);
		return await getDownloadURL(storageSnap.ref);
	};

	return {
		auth,
		firestore,
		storage,
		cards,
		/*users,
		signIn,
		signOut,
		signUp,
		resetPassword,
		deleteAccount,*/
		write,
		read,
		_delete,
		upload
	};
};

export default useFirebase;
