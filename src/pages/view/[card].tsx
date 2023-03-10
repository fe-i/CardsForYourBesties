import { Flex, Text, Spinner } from "@chakra-ui/react";
import { DocumentData } from "@firebase/firestore";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/card";
import Layout from "../../components/layout";
import useFirebase from "../../hooks/useFirebase";

const ViewCard: NextPage = () => {
	const { query } = useRouter();
	const { read, cards } = useFirebase();
	const [card, setCard] = useState<DocumentData | null | undefined>(undefined);

	useEffect(() => {
		if (query.id)
			read(cards, query.id.toString()).then((data: DocumentData | null | undefined) =>
				setCard(data)
			);
	}, [query]);

	return (
		<Layout title="View Card">
			<Flex flexDir="column" align="center" justify="center" fontSize="lg" py={10}>
				{card ? (
					<Card
						recipient={card.recipient}
						sender={card.sender}
						message={card.message}
						image={card.image}
					/>
				) : card === null ? (
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
