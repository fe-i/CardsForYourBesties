import { useEffect, useState } from "react";
import { DocumentData } from "@firebase/firestore";
import useFirebase from "./useFirebase";

const useAuth = () => {
	const { auth } = useFirebase();
	const [user, setUser] = useState<DocumentData | null>(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => (user ? setUser(user) : setUser(null)));
	}, []);

	return { user };
};

export default useAuth;
