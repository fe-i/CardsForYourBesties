import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	deleteUser
} from "firebase/auth";
import {
	getFirestore,
	collection,
	doc,
	addDoc,
	setDoc,
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

const auth = getAuth();
const storage = getStorage();
const firestore = getFirestore();
const users = collection(firestore, "users");
const cards = collection(firestore, "cards");

const useFirebase = () => {
	const logIn = async (email: string, password: string) => {
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			const data = await read(users, user.uid);
			console.log(`Logged in as: ${data?.username}`);
			return data;
		} catch (e) {
			console.error(`Error logging in: ${e}`);
			return undefined;
		}
	};

	const logOut = () => {
		if (auth.currentUser !== null) {
			signOut(auth);
			console.log("Logged out!");
		} else console.error("Not logged in!");
		return undefined;
	};

	const signUp = async (username: string, email: string, password: string) => {
		try {
			const { user } = await createUserWithEmailAndPassword(auth, email, password);
			const id = await write(
				users,
				{
					username,
					email,
					password,
					cards: []
				},
				user.uid
			);
			console.log(`Signed up as: ${username}`);
			return id ? await read(users, id) : undefined;
		} catch (e) {
			console.error(`Error signing up: ${e}`);
			return undefined;
		}
	};

	const resetPassword = async (email: string) => {
		try {
			await sendPasswordResetEmail(auth, email);
			console.log("Password reset email sent!");
		} catch (e) {
			console.error(`Error sending password reset email: ${e}`);
		}
	};

	const deleteAccount = async () => {
		try {
			const { currentUser } = auth;
			if (currentUser) {
				await deleteUser(currentUser);
				await _delete(users, currentUser.uid);
				console.log(`Deleted user with ID: ${currentUser.uid}`);
			}
		} catch (e) {
			console.error(`Error deleting user: ${e}`);
		}
	};

	const write = async (colRef: CollectionReference<DocumentData>, data: object, id?: string) => {
		try {
			if (id) {
				await setDoc(doc(colRef, id), data);
				console.log(`Document written with ID: ${id}`);
				return id;
			} else {
				const docRef = await addDoc(colRef, data);
				console.log(`Document written with ID: ${docRef.id}`);
				return docRef.id;
			}
		} catch (e) {
			console.error(`Error adding document: ${e}`);
			return undefined;
		}
	};

	const read = async (colRef: CollectionReference<DocumentData>, id: string) => {
		const docSnap = await getDoc(doc(colRef, id));
		if (docSnap.exists()) {
			console.log(`Document found with ID: ${docSnap.id}`);
			return docSnap.data();
		} else {
			console.error("Document not found!");
			return undefined;
		}
	};

	const _delete = async (colRef: CollectionReference<DocumentData>, id: string) => {
		try {
			await deleteDoc(doc(colRef, id));
		} catch (e) {
			console.error("Document not found!");
		}
	};

	const upload = async (image: File) => {
		const storageRef = ref(storage, uuidv4());
		const storageSnap = await uploadBytes(storageRef, image);
		return await getDownloadURL(storageSnap.ref);
	};

	return {
		logIn,
		logOut,
		signUp,
		resetPassword,
		deleteAccount,
		write,
		read,
		_delete,
		upload,
		users,
		cards
	};
};

export default useFirebase;
