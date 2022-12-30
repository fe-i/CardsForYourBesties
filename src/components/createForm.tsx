import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Select,
	Text,
	Textarea,
	useColorModeValue,
	useDisclosure,
	useToast
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { IoCreate } from "react-icons/io5";
import useFirebase from "../hooks/useFirebase";
import ImageModal from "./imageModal";

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
			"Happy holidays! May the holiday season bring you joy and prosperity throughout the coming year.",
		image: "https://wallpaperaccess.com/full/788495.jpg"
	}
];

const CreateForm: React.FC<{
	card: {
		recipient: string;
		sender: string;
		message: string;
		image: string;
	};
	setCard: any;
}> = ({ setCard }) => {
	const { write, upload } = useFirebase();
	const [recipient, setRecipient] = useState<string>("");
	const [sender, setSender] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [image, setImage] = useState<File | string | null>("");

	const { isOpen, onOpen, onClose } = useDisclosure();

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

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!recipient || !sender || !message)
			return toast("Please fill in the required fields!", "error");

		let url;
		if (image instanceof File) url = await upload(image);
		else if (typeof image === "string" && image) url = image;
		else return toast("Please provide an image!", "error");

		await write({ recipient, sender, message, image: url }).then((id: any) =>
			alert("https://cfyb.vercel.app/view/" + id)
		);
		await setCard({ recipient, sender, message, image: url });
		toast("Created successfully!", "success");
	};

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
			<ImageModal isOpen={isOpen} onClose={onClose} setImage={setImage} />
			<form onSubmit={handleSubmit}>
				<FormControl pb={5}>
					<FormLabel>Template</FormLabel>
					<Select
						onChange={async (e) => {
							const option = options.find((o) => o.name === e.target.value);
							if (!option) return;
							setMessage(option.message);
							setImage(option.image);
						}}>
						{options.map((_, i) => (
							<option key={i} value={_.name}>
								{_.name}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl isInvalid={!recipient} isRequired>
					<FormLabel>Recipient Name</FormLabel>
					<Input
						placeholder="recipient"
						maxLength={50}
						onChange={(e) => setRecipient(e.target.value)}
						value={recipient}
					/>
				</FormControl>
				<FormControl isInvalid={!sender} isRequired>
					<FormLabel>Sender Name</FormLabel>
					<Input
						placeholder="sender"
						maxLength={50}
						onChange={(e) => setSender(e.target.value)}
						value={sender}
					/>
				</FormControl>
				<FormControl isInvalid={!message} isRequired>
					<FormLabel>Message</FormLabel>
					<Textarea
						placeholder="your message here"
						resize="none"
						h="15vh"
						maxLength={500}
						onChange={(e) => setMessage(e.target.value)}
						value={message}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Image</FormLabel>
					<Flex
						align="center"
						justify="space-between"
						borderWidth={!image ? 2 : 1}
						borderColor={!image ? "red.500" : "gray.200"}
						borderRadius="md"
						h="2.5rem"
						pl={4}
						pr={2}>
						<Text textColor="gray.500" fontSize="md">
							{image
								? typeof image !== "string"
									? image.name
									: "image from url"
								: "no image selected"}
						</Text>
						<Button h="1.5rem" onClick={onOpen}>
							{image ? "Change Image" : "Choose Image"}
						</Button>
					</Flex>
				</FormControl>
				<Button type="submit" leftIcon={<IoCreate size={20} />} mt={4} w="full">
					Create Card
				</Button>
			</form>
		</Flex>
	);
};

export default CreateForm;
