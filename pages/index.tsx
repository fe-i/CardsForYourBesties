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
	Image,
	HStack
} from "@chakra-ui/react";
import { IoCreate } from "react-icons/io5";
import { useState } from "react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { image } from "googlethis";
import Link from "next/link";
import Layout from "../components/layout";

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
	bd: "https://hips.hearstapps.com/hmg-prod/images/birthday-cake-with-happy-birthday-banner-royalty-free-image-1656616811.jpg",
	cm: "https://www.history.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTY5MDk1MTE5MTgxMTI5NjEw/christmas-traditions-gettyimages-487756624.jpg"
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

	const { isOpen: SisOpen, onOpen: SonOpen, onClose: SonClose } = useDisclosure();

	return (
		<Layout title="Card Builder">
			<Modal isOpen={SisOpen} onClose={SonClose} size="xl">
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
			<Flex
				alignItems="center"
				justifyContent="center"
				flexDir="column"
				fontSize="lg"
				h="full"
				mx={6}
				my={15}>
				<Heading
					py={5}
					display="inline-block"
					fontSize="50px"
					bgGradient="linear(to-r, cyan.300, cyan.500)"
					backgroundClip="text">
					Send your besties a digital card!
				</Heading>
				<VStack
					alignItems="left"
					bgColor="white"
					borderRadius="xl"
					w="full"
					p={5}
					spacing="1vh">
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
						<FormLabel>Image URL</FormLabel>
						<InputGroup gap={5}>
							<Input
								placeholder="https://example.com/image.png"
								value={image}
								onChange={handleImage}
							/>
							<InputRightElement w="fit-content" mr={3} gap={3}>
								<Button h={8} onClick={SonOpen}>
									{image.match(/\.(jpeg|jpg|gif|png)$/) === null
										? "Find"
										: "Change"}
								</Button>
								{image.match(/\.(jpeg|jpg|gif|png)$/) !== null ? (
									<CheckIcon color="green.500" />
								) : (
									<CloseIcon color="red.500" />
								)}
							</InputRightElement>
						</InputGroup>
						<FormLabel>Message</FormLabel>
						<Textarea
							resize="none"
							h="15vh"
							placeholder="your message here"
							onChange={handleMessage}
							value={message}
						/>
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
							isDisabled={message.length > 500}
							w="full">
							<IoCreate size={20} />
							<Text ml={0.5}>Create Card</Text>
							{message.length > 500 ? (
								<Text>(Message is longer than 500 characters)</Text>
							) : null}
						</Button>
					)}
				</VStack>
			</Flex>
		</Layout>
	);
}
