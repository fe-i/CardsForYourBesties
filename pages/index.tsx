import {
	Flex,
	Text,
	Button,
	VStack,
	Heading,
	Input,
	Textarea,
	FormControl,
	FormLabel,
	Select,
	InputGroup,
	InputRightElement,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Image
} from "@chakra-ui/react";
import { IoCreate } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import { image } from "googlethis";

const findImages: any = async (query: string) => {
	const images = await image(query, { safe: true }).catch((e) => []);
	return images;
};

const defaultMessages: any = {
	"": "",
	bd: "Wish you the happiest and sweetest birthday!",
	cm: "Happy holidays and may this season be filled with laughter and joy."
};

const defaultImages: any = {
	"": "https://unsplash.com/photos/gdTxVSAE5sk/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8ZmlyZXdvcmtzfGVufDB8fHx8MTY3MTk3ODM4OQ&force=true&w=1920",
	bd: "https://unsplash.com/photos/Hli3R6LKibo/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjcxOTc4NDc5&force=true&w=1920",
	cm: "https://unsplash.com/photos/VDXtVYJVj7A/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjcxOTc5NDcy&force=true&w=1920"
};

const encode = (str: string): string => Buffer.from(str, "binary").toString("base64");

export default function Home() {
	const [recipient, setRecipient] = useState("");
	const [sender, setSender] = useState("");
	const [message, setMessage] = useState("");
	const [image, setImage] = useState("");
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);

	const handleRecipient = (e: any) => setRecipient(e.target.value);
	const handleSender = (e: any) => setSender(e.target.value);
	const handleMessage = (e: any, useTemplate?: boolean) =>
		setMessage(() => (useTemplate ? defaultMessages[e.target.value] : e.target.value));
	const handleImage = (e: any, useTemplate?: boolean) =>
		setImage(() => (useTemplate ? defaultImages[e.target.value] : e.target.value));
	const handleSearch = (e: any) => setSearch(e.target.value);

	const { isOpen: PisOpen, onOpen: PonOpen, onClose: PonClose } = useDisclosure();
	const { isOpen: FisOpen, onOpen: FonOpen, onClose: FonClose } = useDisclosure();

	return (
		<Layout title="Card Builder">
			<Modal isOpen={PisOpen} onClose={PonClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textDecor="underline" fontSize="3xl">
						Image Preview
					</ModalHeader>
					<ModalCloseButton size="3xl" p={5} />
					<ModalBody py={0}>
						{image !== "" ? (
							<Image src={image} alt="Image" borderRadius="lg" fit="scale-down" />
						) : null}
					</ModalBody>
					<ModalFooter />
				</ModalContent>
			</Modal>
			<Modal isOpen={FisOpen} onClose={FonClose} size="xl">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textDecor="underline" fontSize="3xl">
						Google Images
					</ModalHeader>
					<ModalCloseButton size="3xl" p={5} />
					<ModalBody py={0}>
						<FormControl isRequired>
							<FormLabel>Search Query</FormLabel>
							<Input placeholder="ex: cats" onChange={handleSearch} />
							<Button
								onClick={async () => {
									const images = await findImages(search);
									setResults(images?.map((image: any) => image.url));
								}}>
								Search
							</Button>
						</FormControl>
						<VStack>
							{results?.map((result) => (
								<Text>{result}</Text>
							))}
						</VStack>
					</ModalBody>
					<ModalFooter />
				</ModalContent>
			</Modal>
			<Flex alignItems="center" justifyContent="center" flexDir="column" h="100%" p={8}>
				<Heading
					py={3}
					display="inline-block"
					fontSize="50px"
					bgGradient="linear(to-r, cyan.300, cyan.500)"
					backgroundClip="text">
					Send your besties a digital card!
				</Heading>
				<VStack
					alignItems="left"
					spacing="1vh"
					w="40vw"
					borderRadius="xl"
					p={5}
					bgColor="white">
					<FormControl isRequired>
						<FormLabel>Recipient Name</FormLabel>
						<Input placeholder="joe" onChange={handleRecipient} />
						<FormLabel>Sender Name</FormLabel>
						<Input placeholder="mama" onChange={handleSender} />
						<FormLabel>Template</FormLabel>
						<Select
							placeholder="None"
							onChange={(e) => {
								handleMessage(e, true);
								handleImage(e, true);
							}}>
							<option value="bd">Birthday</option>
							<option value="cm">Christmas</option>
						</Select>
						<FormLabel>Message</FormLabel>
						<Textarea
							resize="none"
							h="15vh"
							placeholder="your message here"
							onChange={handleMessage}
							value={message}
						/>
						<FormLabel>Image URL</FormLabel>
						<InputGroup>
							<Input
								placeholder="https://example.com/image.png"
								value={image}
								onChange={handleImage}
								isDisabled
							/>
							<InputRightElement w="fit-content" mr={2} gap={1}>
								{image !== "" ? (
									<Button h="1.75rem" onClick={PonOpen}>
										Show
									</Button>
								) : null}
								<Button h="1.75rem" onClick={FonOpen}>
									{image === "" ? "Add" : "Change"}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>
					{recipient === "" || sender === "" || message === "" || image === "" ? (
						<Button isLoading loadingText="Awaiting input..." colorScheme="yellow" />
					) : (
						<Button
							as={Link}
							href={{
								pathname: "/card",
								query: {
									to: encode(recipient),
									from: encode(sender),
									message: encode(message),
									image: image
								}
							}}
							isDisabled={message.length > 300}
							width="full"
							gap={1}>
							<IoCreate size={20} />
							<Text ml="0.3rem">Generate Card</Text>
							{message.length > 300 ? (
								<Text>(Message is longer than 300 characters)</Text>
							) : null}
						</Button>
					)}
				</VStack>
			</Flex>
		</Layout>
	);
}
