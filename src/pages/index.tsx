import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import Layout from "../../src/components/layout";
import CreateForm from "../../src/components/createForm";
import Card from "../../src/components/card";

export default function Home() {
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
			<Flex flexDir="column" align="center" justify="center" gap={6} pb={8}>
				<Heading
					display="inline-block"
					fontSize="50px"
					bgGradient="linear(to-r, cyan.300, cyan.500)"
					backgroundClip="text"
					pb={6}>
					Send your besties a digital card!
				</Heading>
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
}
