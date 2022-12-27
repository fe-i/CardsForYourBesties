import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import Layout from "../components/layout";
import CreateForm from "../components/createForm";
import Card from "../components/card";

const encode = (str: string): string => Buffer.from(str, "binary").toString("base64");

export default function Home() {
	const [card, setCard] = useState({
		recipient: "joe",
		sender: "mama",
		message: "This is a demo.",
		image: "image.png"
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
					<CreateForm setCard={setCard} />
					<Card
						recipient={card?.recipient}
						sender={card?.sender}
						message={card?.message}
						image={card?.image}
					/>
				</Flex>
			</Flex>
		</Layout>
	);
}
