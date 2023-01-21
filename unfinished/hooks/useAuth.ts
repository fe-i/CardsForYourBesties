/*import { useEffect, useState } from "react";
import { DocumentData } from "@firebase/firestore";
import useFirebase from "../../src/hooks/useFirebase";

const useAuth = () => {
	const { auth, read, users } = useFirebase();
	const [user, setUser] = useState<DocumentData | null>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) await read(users, user?.uid).then((data) => setUser(data));
			else setUser(null);
		});

		return () => unsubscribe();
	}, []);

	return { user };
};

export default useAuth;
*/
