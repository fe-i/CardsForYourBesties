import { Flex, Text, Spinner, Button, useClipboard } from "@chakra-ui/react";
import { DocumentData } from "@firebase/firestore";
import Fireworks from "@fireworks-js/react";
import type { FireworksHandlers } from "@fireworks-js/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
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

	const ref = useRef<FireworksHandlers>(null);

	const toggle = () => {
		if (!ref.current) return;
		if (ref.current.isRunning) {
			ref.current.stop();
		} else {
			ref.current.start();
		}
	};

	return (
		<Layout title="View Card">
			<Flex pointerEvents="none">
				<Fireworks
					ref={ref}
					options={{ opacity: 0.2, traceSpeed: 5, intensity: 40 }}
					style={{
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						position: "fixed"
					}}
				/>
			</Flex>
			<Flex flexDir="column" align="center" justify="center" fontSize="lg" gap={5} py={8}>
				<Button onClick={toggle}>Toggle Fireworks</Button>
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
