import { Flex, Button, useClipboard } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Card from "../../components/card";
import Layout from "../../components/layout";

const decode = (str: string | string[] | undefined): string =>
	Buffer.from(new String(str), "base64").toString("binary");

const ViewCard: NextPage = () => {
	const router = useRouter();
	const { onCopy, setValue, hasCopied } = useClipboard("");

	useEffect(() => {
		setValue(window.location.toString());
	}, []);

	return (
		<Layout title="View Card">
			<Flex flexDir="column" align="center" justify="center" fontSize="lg" gap={5} py={6}>
				<Card
					recipient={decode(router.query.to)}
					sender={decode(router.query.from)}
					message={decode(router.query.message)}
					image={router.query.image?.toString()}
				/>
				<Button bgColor="white" w="auto" onClick={onCopy}>
					{hasCopied ? "Copied!" : "Copy Link To Share"}
				</Button>
			</Flex>
		</Layout>
	);
};

export default ViewCard;
