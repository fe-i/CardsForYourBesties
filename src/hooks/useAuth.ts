import { useEffect, useState } from "react";
import { DocumentData } from "@firebase/firestore";
import useFirebase from "./useFirebase";

const useAuth = () => {
	const { auth } = useFirebase();
	const [user, setUser] = useState<DocumentData | null>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) setUser(user);
			else setUser(null);
		});

		return () => unsubscribe();
	}, []);

	return { user };
};

export default useAuth;
