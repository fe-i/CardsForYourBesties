import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Text,
	FormControl,
	InputGroup,
	Input,
	Button,
	useToast,
	FormLabel
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineInsertPhoto } from "react-icons/md";

const ImageModal: React.FC<{ isOpen: boolean; onClose: () => void; setImage: any }> = ({
	isOpen,
	onClose,
	setImage
}) => {
	const [loading, setLoading] = useState(false);

	const toastHook = useToast();
	const toast = (description: string, status: any) => {
		if (!toastHook.isActive("toast"))
			toastHook({
				id: "toast",
				title: "Image Selector",
				description,
				status,
				duration: 4000,
				position: "top-right",
				isClosable: true
			});
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { "image/*": [] },
		maxFiles: 1,
		onDrop: (acceptedFiles: any, fileRejections: any) => {
			if (!!fileRejections.length) return;
			setImage(acceptedFiles[0]);
		}
	});

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		try {
			const blob = await fetch(e.target[0].value).then((response) => response.blob());
			if (!blob.type.startsWith("image/")) throw new Error("Not an image!");
			setImage(e.target[0].value);
			toast("Image added from URL!", "success");
		} catch (e) {
			toast("Error getting image from URL!", "error");
		}
		setLoading(false);
	};

	useEffect(() => {
		if (isOpen) {
			document.onpaste = (e) => {
				const items = e.clipboardData?.items;
				if (!items) return;

				const image = Array.from(items).find((item) => item.type.startsWith("image/"));
				if (!image) return;

				const file = image.getAsFile();
				setImage(file);
				toast("Image added from clipboard!", "success");
			};
		} else {
			document.onpaste = null;
		}
	}, [isOpen]);

	return (
		<Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<ModalCloseButton />
				</ModalHeader>
				<ModalBody>
					<Tabs variant="line" isFitted>
						<TabList>
							<Tab>Upload Image</Tab>
							<Tab>Use Image URL</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<InputGroup
									justifyContent="center"
									borderWidth={2}
									borderRadius={10}
									borderStyle="dashed"
									px={12}
									py={20}
									{...getRootProps()}>
									<input type="image" {...getInputProps()} />
									<Text textAlign="center">
										{isDragActive
											? "drop the image here"
											: "drop or paste the image here or click to upload an image"}
									</Text>
								</InputGroup>
							</TabPanel>
							<TabPanel>
								<form onSubmit={handleSubmit}>
									<FormControl justifyContent="center" py={20} isRequired>
										<FormLabel>Image URL</FormLabel>
										<InputGroup>
											<Input
												type="url"
												placeholder="https://example.com/image.png"
											/>
											<Button
												type="submit"
												leftIcon={<MdOutlineInsertPhoto size={20} />}
												isLoading={loading}
												loadingText="Loading"
												spinnerPlacement="start"
												ml={1}>
												Add
											</Button>
										</InputGroup>
									</FormControl>
								</form>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default ImageModal;
