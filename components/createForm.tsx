import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Select,
	Text,
	Textarea,
	useColorModeValue,
	useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone"; //TODO: UPLOAD IMAGE
import { IoCreate } from "react-icons/io5";

const options = [
	{
		name: "none",
		message: "",
		image: ""
	},
	{
		name: "birthday",
		message: "Wish you the happiest and sweetest birthday!",
		image: "https://hips.hearstapps.com/hmg-prod/images/birthday-cake-with-happy-birthday-banner-royalty-free-image-1656616811.jpg"
	},
	{
		name: "christmas",
		message:
			"Happy holidays! May the holiday season bring you joy and properity throughout the coming year.",
		image: "https://wallpaperaccess.com/full/788495.jpg"
	}
];

const CreateForm: React.FC<{ setCard: any }> = ({ setCard }) => {
	const [recipient, setRecipient] = useState<string | undefined>("joe");
	const [sender, setSender] = useState<string | undefined>("mama");
	const [message, setMessage] = useState<string | undefined>("This is a demo.");
	const [image, setImage] = useState<string | undefined>("image.png");

	const toastHook = useToast();
	const toast = (description: string, status: any) =>
		toastHook({
			title: "Card Builder",
			description,
			status,
			duration: 4000,
			position: "top-right",
			isClosable: true
		});

	return (
		<Flex
			flexDir="column"
			bg={useColorModeValue("white", "gray.900")}
			borderRadius="xl"
			boxShadow="2xl"
			w={{ base: "90vw", md: "450px" }}
			gap={2}
			px={6}
			py={6}>
			<FormControl isInvalid={!recipient || recipient.length > 50} isRequired>
				<FormLabel>Recipient Name</FormLabel>
				<Input
					placeholder="recipient"
					onChange={(e) => setRecipient(e.target.value)}
					value={recipient}
				/>
				{!recipient || recipient.length > 50 ? (
					<FormErrorMessage>Enter a valid recipient name.</FormErrorMessage>
				) : null}
			</FormControl>

			<FormControl isInvalid={!sender || sender.length > 50} isRequired>
				<FormLabel>Sender Name</FormLabel>
				<Input
					placeholder="sender"
					onChange={(e) => setSender(e.target.value)}
					value={sender}
				/>
				{!sender || sender.length > 50 ? (
					<FormErrorMessage>Enter a valid sender name.</FormErrorMessage>
				) : null}
			</FormControl>

			<FormControl>
				<FormLabel>Template</FormLabel>
				<Select
					onChange={(e) => {
						setMessage(options.find((o) => o.name === e.target.value)?.message);
						setImage(options.find((o) => o.name === e.target.value)?.image);
					}}>
					{options.map((_, i) => (
						<option key={i} value={_.name}>
							{_.name}
						</option>
					))}
				</Select>
			</FormControl>

			<FormControl isInvalid={!message || message.length > 500} isRequired>
				<FormLabel>Message</FormLabel>
				<Textarea
					placeholder="your message here"
					resize="none"
					h="15vh"
					onChange={(e) => setMessage(e.target.value)}
					value={message}
				/>
				{!message || message.length > 500 ? (
					<FormErrorMessage>
						Messages must be between 1 and 500 characters.
					</FormErrorMessage>
				) : null}
			</FormControl>

			<FormControl isInvalid={image?.match(/\.(jpeg|jpg|gif|png)$/) === null} isRequired>
				<FormLabel>Image</FormLabel>
				<InputGroup>
					<Input
						placeholder="upload an image or paste a url"
						onChange={(e) => setImage(e.target.value)}
						value={image}
					/>
					<InputRightElement w="fit-content" mr={3} gap={3}>
						<Button h="1.5rem">
							{image?.match(/\.(jpeg|jpg|gif|png)$/) === null ? "Upload" : "Change"}
						</Button>
						{image?.match(/\.(jpeg|jpg|gif|png)$/) === null ? (
							<CloseIcon color="red.500" />
						) : (
							<CheckIcon color="green.500" />
						)}
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<Button
				mt={5}
				onClick={() => {
					if (!recipient) toast("Recipient field is invalid.", "error");
					else if (!sender) toast("Sender field is invalid.", "error");
					else if (!message || message.length > 500)
						toast("Message must be between 1 and 500 characters.", "error");
					else if (image?.match(/\.(jpeg|jpg|gif|png)$/) === null)
						toast("Image field is invalid.", "error");
					else {
						toast("Your card has been made successfully.", "success");
						setCard({ recipient, sender, message, image });
					}
				}}>
				<IoCreate size={20} />
				<Text ml={0.5}>Create Card</Text>
			</Button>
		</Flex>
	);
};

export default CreateForm;
