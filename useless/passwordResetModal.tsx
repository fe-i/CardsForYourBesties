import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Button,
	useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineSend } from "react-icons/md";
import useFirebase from "../hooks/useFirebase";

const PasswordResetModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
	isOpen,
	onClose
}) => {
	const { resetPassword } = useFirebase();
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState(false);

	const toastHook = useToast();
	const toast = (description: string, status: any) => {
		if (!toastHook.isActive("toast"))
			toastHook({
				id: "toast",
				title: "Account Manager",
				description,
				status,
				duration: 4000,
				position: "top-right",
				isClosable: true
			});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		try {
			await resetPassword(e.target[0].value).then((result) => {
				if (result === null) throw new Error("Not found!");
			});
			toast("Password reset email sent!", "success");
		} catch (e) {
			toast("Error sending password reset email!", "error");
		}
		setLoading(false);
	};

	return (
		<Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<ModalCloseButton />
				</ModalHeader>
				<ModalBody>
					<form onSubmit={handleSubmit}>
						<Flex flexDir="column" gap={3}>
							<FormControl isInvalid={email === ""} isRequired>
								<FormLabel>Email</FormLabel>
								<Input
									type="email"
									placeholder="email"
									maxLength={100}
									onChange={(e) => setEmail(e.target.value)}
									value={email ?? ""}
								/>
								<FormErrorMessage>Enter a valid email address.</FormErrorMessage>
							</FormControl>
							<Button
								type="submit"
								leftIcon={<MdOutlineSend size={20} />}
								isLoading={loading}
								loadingText="Loading"
								spinnerPlacement="start">
								Send Password Reset Email
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default PasswordResetModal;
