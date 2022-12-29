import { Flex, Button, useClipboard } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../../src/components/card";
import Layout from "../../../src/components/layout";
import useFirebase from "../../hooks/useFirebase";

const decode = (str: string | string[] | undefined): string =>
	Buffer.from(new String(str), "base64").toString("binary");

const ViewCard: NextPage = () => {
	const { query } = useRouter();
	const { read } = useFirebase();
	const { onCopy, setValue, hasCopied } = useClipboard("");
	const [card, setCard] = useState<{
		recipient: string;
		sender: string;
		message: string;
		image: string;
	}>({
		recipient: "recipient",
		sender: "sender",
		message: "your message here",
		image: "image.png"
	});

	useEffect(() => {
		//if (query.id) setCard(read("i79CocXj5xIxEIBKv2VO")); //TODO: doesn't work
		setValue(window.location.toString());
	}, [query]);

	return (
		<Layout title="View Card">
			<Flex flexDir="column" align="center" justify="center" fontSize="lg" gap={5} py={8}>
				<Card
					recipient={card.recipient}
					sender={card.sender}
					message={card.message}
					image={card.image}
				/>
				<Button bgColor="white" w="auto" onClick={onCopy}>
					{hasCopied ? "Copied!" : "Copy Link To Share"}
				</Button>
			</Flex>
		</Layout>
	);
};

export default ViewCard;
