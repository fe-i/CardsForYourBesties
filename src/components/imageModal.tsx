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
	InputGroup,
	InputLeftAddon,
	Input,
	Button
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";

const isURL = (str: string): boolean => {
	const regex = /^[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
	return regex.test(str);
};

const imageFromURL = async (url: string) => {
	const response = await fetch(`https://${url}`).catch(() => {});
	if (!response) return null;

	const blob = await response.blob();
	if (!blob.type.startsWith("image/")) return null;

	const file = new File([blob], `image.${blob.type.split("/")[1]}`, { type: blob.type });
	return file;
};

const ImageModal: React.FC<{ isOpen: boolean; onClose: () => void; setImage: any }> = ({
	isOpen,
	onClose,
	setImage
}) => {
	useEffect(() => {
		document.onpaste = (e) => {
			const items = e.clipboardData?.items;
			if (!items) return;

			const image = Array.from(items).find((item) => item.type.startsWith("image/"));
			if (!image) return;

			const file = image.getAsFile();
			setImage(file);
		};
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: { "image/*": [] },
		maxFiles: 1,
		onDrop: (acceptedFiles: any, fileRejections: any) => {
			if (!!fileRejections.length) return;
			setImage(acceptedFiles[0]);
		}
	});

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
							<Tab>Draw</Tab>
							<Tab>Upload Image</Tab>
							<Tab>Use Image URL</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<Text>DRAW coming soon ;)</Text>
								<InputGroup
									justifyContent="center"
									borderWidth={2}
									borderRadius={10}
									borderStyle="dashed"
									px={12}
									py={20}></InputGroup>
							</TabPanel>
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
											: "drop the image here or click to upload an image"}
									</Text>
								</InputGroup>
							</TabPanel>
							<TabPanel>
								<form
									onSubmit={async (e: any) => {
										e.preventDefault();

										const url = e.target[0].value?.replace(/^https?:\/\//, "");
										if (isURL(url) && (await imageFromURL(url)))
											setImage(`https://${url}`);
									}}>
									<InputGroup justifyContent="center" py={10}>
										<InputLeftAddon>https://</InputLeftAddon>
										<Input type="string" placeholder="image url" />
										<Button type="submit" ml={1}>
											Save
										</Button>
									</InputGroup>
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
