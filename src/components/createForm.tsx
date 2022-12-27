import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	Select,
	Text,
	Textarea,
	useColorModeValue,
	useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCreate } from "react-icons/io5";
import useFirebase from "./hooks/useFirebase";

const options = [
	//TODO: template images need to become file objects
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
			"Happy holidays! May the holiday season bring you joy and prosperity throughout the coming year.",
		image: "https://wallpaperaccess.com/full/788495.jpg"
	}
];

const CreateForm: React.FC<{ setCard: any }> = ({ setCard }) => {
	const { write, upload } = useFirebase();
	const [recipient, setRecipient] = useState<string | undefined>("joe");
	const [sender, setSender] = useState<string | undefined>("mama");
	const [message, setMessage] = useState<string | undefined>("This is a demo.");
	const [image, setImage] = useState<File | null>(null);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { "image/*": [] },
		maxFiles: 1,
		onDrop: (acceptedFiles: any, fileRejections: any) => {
			if (!!fileRejections.length) return toast("That's not a valid image!", "error");
			setImage(acceptedFiles[0]);
		}
	});

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
						//setImage(options.find((o) => o.name === e.target.value).image);
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

			<FormControl isInvalid={image === null} isRequired>
				<FormLabel>Image</FormLabel>
				<Flex
					align="center"
					justify="center"
					borderWidth={image === null ? 2 : 1}
					borderColor={image === null ? "red.500" : "gray.200"}
					borderRadius="lg"
					fontSize="md"
					h="2.5rem"
					gap={2}
					pl={4}
					pr={2}>
					<InputGroup {...getRootProps()}>
						<input {...getInputProps()} />
						<Text textColor="gray.500">
							{isDragActive
								? "drop the image here"
								: image === null
								? "drag or click to upload an image"
								: `selected ` + image?.name}
						</Text>
					</InputGroup>
					{
						/*TODO: FIX UPLOAD WITH URL BUTTON*/ image === null && (
							<Button h="1.5rem" onClick={() => {}}>
								Use URL
							</Button>
						)
					}
					{image !== null && (
						<Button h="1.5rem" onClick={() => setImage(null)}>
							Remove
						</Button>
					)}
				</Flex>
				<FormErrorMessage>Select a valid image.</FormErrorMessage>
			</FormControl>

			<Button
				mt={5}
				onClick={async () => {
					if (!recipient) toast("Recipient field is invalid.", "error");
					else if (!sender) toast("Sender field is invalid.", "error");
					else if (!message || message.length > 500)
						toast("Message must be between 1 and 500 characters.", "error");
					else if (image === null) toast("Image field is invalid.", "error");
					else {
						const imageURL = await upload(image);
						await setCard({ recipient, sender, message, image: imageURL });
						//await write({ recipient, sender, message, image: imageURL }); //TODO: undo comment
						toast("Your card has been made successfully.", "success");
					}
				}}>
				<IoCreate size={20} />
				<Text ml={0.5}>Create Card</Text>
			</Button>
		</Flex>
	);
};

export default CreateForm;
