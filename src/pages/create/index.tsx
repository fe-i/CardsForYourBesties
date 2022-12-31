import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { NextPage } from "next";
import Layout from "../../../src/components/layout";
import CreateForm from "../../../src/components/createForm";
import Card from "../../../src/components/card";

const Create: NextPage = () => {
	const [card, setCard] = useState<{
		recipient: string;
		sender: string;
		message: string;
		image: string;
	}>({
		recipient: "recipient",
		sender: "sender",
		message: "your message here",
		image: "/image.png"
	});

	return (
		<Layout title="Card Builder">
			<Flex align="center" justify="center" p={6}>
				<Flex flexDir="row" flexWrap="wrap" fontSize="lg" gap={10}>
					<CreateForm card={card} setCard={setCard} />
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
