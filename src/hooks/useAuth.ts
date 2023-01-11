import { DocumentData } from "@firebase/firestore";
import { useState } from "react";

const useAuth = () => {
	const [user, setUser] = useState<DocumentData | null>(null);

	return { user, setUser };
};

export default useAuth;
