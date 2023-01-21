import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Select,
	Text,
	Textarea,
	useColorModeValue,
	useDisclosure,
	useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdOutlineAddPhotoAlternate, MdOutlinePhoto, MdOutlinePostAdd } from "react-icons/md";
import useFirebase from "../../hooks/useFirebase";
import ImageModal from "../imageModal";
//import useAuth from "../../../useless/hooks/useAuth";

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

const CardCreateForm: React.FC<{
	card: {
		recipient: string;
		sender: string;
		message: string;
		image: string;
	};
	setCard: any;
}> = ({ card, setCard }) => {
	const { push } = useRouter();
	//const { user } = useAuth();
	const { write, upload, cards } = useFirebase();
	const [recipient, setRecipient] = useState<string>(card.recipient);
	const [sender, setSender] = useState<string>(card.sender);
	const [message, setMessage] = useState<string>(card.message);
	const [image, setImage] = useState<File | string | undefined>(card.image);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [loading, setLoading] = useState(false);

	const toastHook = useToast();
	const toast = (description: string, status: any) => {
		if (!toastHook.isActive("toast"))
			toastHook({
				id: "toast",
				title: "Card Builder",
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

		let url;
		if (image instanceof File) url = await upload(image);
		else if (typeof image === "string" && image) url = image;
		else {
			setLoading(false);
			return toast("Please provide an image!", "error");
		}

		await write(cards, { recipient, sender, message, image: url }).then((id: string | null) => {
			if (id !== null) {
				push(`/view/card?id=${id}`);
				toast("Created successfully!", "success");
			} else toast("Unable to create card!", "error");
			setLoading(false);
		});
	};

	useEffect(() => {
		setCard({ recipient, sender, message, image });
	}, [recipient, sender, message, image]);

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
			<ImageModal isOpen={isOpen} onClose={onClose} setImage={setImage} />
			<Heading fontSize="4xl" textDecor="underline" pb={2}>
				Card Builder
			</Heading>
			<form onSubmit={handleSubmit}>
				<Flex flexDir="column" gap={2}>
					<FormControl>
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
						<FormErrorMessage>Enter a valid recipient name.</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={!sender} isRequired>
						<FormLabel>Sender Name</FormLabel>
						<Input
							placeholder="sender"
							maxLength={50}
							onChange={(e) => setSender(e.target.value)}
							value={sender}
						/>
						<FormErrorMessage>Enter a valid sender name.</FormErrorMessage>
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
						<FormErrorMessage>Enter a valid message.</FormErrorMessage>
					</FormControl>
					<FormControl isRequired>
						<FormLabel>Image</FormLabel>
						<Flex
							align="center"
							justify="space-between"
							borderWidth={!image ? 2 : 1}
							borderColor={!image ? "red.500" : "gray.200"}
							borderRadius="md"
							h="50px"
							pl={4}
							pr={1}>
							<Text textColor="gray.500" fontSize="md" overflow="hidden">
								{image
									? typeof image !== "string"
										? image.name
										: "image from url"
									: "no image selected"}
							</Text>
							<Button rounded="full" variant="ghost" onClick={onOpen}>
								{image ? (
									<MdOutlinePhoto size={20} />
								) : (
									<MdOutlineAddPhotoAlternate size={20} />
								)}
							</Button>
						</Flex>
						{!image && (
							<FormHelperText color="red.500">Include a valid image.</FormHelperText>
						)}
					</FormControl>
					<Button
						type="submit"
						leftIcon={<MdOutlinePostAdd size={20} />}
						isLoading={loading}
						loadingText="Loading"
						spinnerPlacement="start"
						mt={4}
						w="full">
						Create Card
					</Button>
				</Flex>
			</form>
		</Flex>
	);
};

export default CardCreateForm;
