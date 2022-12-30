import { Flex, Button, useClipboard, Spinner, Text } from "@chakra-ui/react";
import { DocumentData } from "@firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/card";
import Layout from "../../components/layout";
import useFirebase from "../../hooks/useFirebase";

const ViewCard: NextPage = () => {
	const { query } = useRouter();
	const { read } = useFirebase();
	const [card, setCard] = useState<DocumentData | null | undefined>(null);
	const { onCopy, setValue, hasCopied } = useClipboard("");

	useEffect(() => {
		if (query.id) read(query.id.toString()).then((data) => setCard(data));
		setValue(window.location.toString());
	}, [query]);

	return (
		<Layout title="View Card">
			<Flex flexDir="column" align="center" justify="center" fontSize="lg" gap={5} py={8}>
				{card ? (
					<>
						<Card
							recipient={card.recipient}
							sender={card.sender}
							message={card.message}
							image={card.image}
						/>
						<Button bgColor="white" w="auto" onClick={onCopy}>
							{hasCopied ? "Copied!" : "Copy Link To Share"}
						</Button>
					</>
				) : card === undefined ? (
					<Text fontSize="3xl">Card Not Found</Text>
				) : (
					<Flex flexDir="row" align="center" justify="center" gap={5}>
						<Spinner thickness="3px" size="xl" />
						<Text fontSize="3xl">Loading...</Text>
					</Flex>
				)}
			</Flex>
		</Layout>
	);
};

export default ViewCard;
