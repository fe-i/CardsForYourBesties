import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Text,
	useColorModeValue,
	useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { MdOutlineVisibility, MdOutlineVisibilityOff, MdOutlineLogin } from "react-icons/md";
import useFirebase from "../../hooks/useFirebase";
import PasswordResetModal from "../passwordResetModal";

const SignInForm: React.FC = () => {
	const { push } = useRouter();
	const { signIn } = useFirebase();
	const [email, setEmail] = useState<string | undefined>(undefined);
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleClick = () => setShow(!show);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		await signIn(e.target[0].value, e.target[1].value).then((res) => {
			if (res !== null) {
				push("/account");
			}
			setLoading(false);
		});
	};

	return (
		<Flex
			flexDir="column"
			bg={useColorModeValue("white", "gray.900")}
			borderRadius="xl"
			boxShadow="2xl"
			w={{ base: "90vw", md: "470px" }}
			gap={2}
			px={6}
			py={6}>
			<PasswordResetModal isOpen={isOpen} onClose={onClose} />
			<Heading fontSize="4xl" textDecor="underline" pb={2}>
				Sign In
			</Heading>
			<form onSubmit={handleSubmit}>
				<Flex flexDir="column" gap={2}>
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
					<FormControl isInvalid={password === ""} isRequired>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								type={show ? "text" : "password"}
								placeholder="password"
								minLength={8}
								maxLength={50}
								onChange={(e) => setPassword(e.target.value)}
								value={password ?? ""}
							/>
							<InputRightElement>
								<Button rounded="md" variant="ghost" p={0} onClick={handleClick}>
									{show ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
								</Button>
							</InputRightElement>
						</InputGroup>
						<FormErrorMessage>Enter a valid password.</FormErrorMessage>
					</FormControl>
					<Button
						type="submit"
						leftIcon={<MdOutlineLogin size={20} />}
						isLoading={loading}
						loadingText="Loading"
						spinnerPlacement="start"
						mt={4}
						w="full">
						Sign In
					</Button>
				</Flex>
			</form>
			<Flex flexDir="column" fontSize="sm">
				<Text>
					<Link title="Forgot Password?" textColor="blue.600" onClick={onOpen}>
						Forgot Password?
					</Link>
				</Text>
				<Text>
					Don&apos;t have an account?{" "}
					<Link href="/signup" title="Sign Up" textColor="blue.600">
						Sign Up
					</Link>
				</Text>
			</Flex>
		</Flex>
	);
};

export default SignInForm;
