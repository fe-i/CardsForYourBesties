import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { NextPage } from "next";
import Layout from "../../../src/components/layout";
import CardCreateForm from "../../components/forms/cardCreateForm";
import Card from "../../../src/components/card";

const Create: NextPage = () => {
	const [card, setCard] = useState<{
		recipient: string;
		sender: string;
		message: string;
		image: string;
	}>({
		recipient: "bob",
		sender: "joe",
		message: "i love you!",
		image: ""
	});

	return (
		<Layout title="Card Builder">
			<Flex align="center" justify="center" px={6} py={10}>
				<Flex flexWrap="wrap" gap={10}>
					<CardCreateForm card={card} setCard={setCard} />
					<Card
						recipient={card.recipient}
						sender={card.sender}
						message={card.message}
						image={card.image}
					/>
				</Flex>
			</Flex>
		</Layout>
	);
};

export default Create;
