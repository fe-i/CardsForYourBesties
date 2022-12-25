import { Button, Flex, useClipboard } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DigitalCard from "../components/digitalCard";
import Layout from "../components/layout";

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
			<Flex alignItems="center" justifyContent="center" fontSize="lg" flexDir="column" p={8}>
				<DigitalCard
					recipient={decode(router.query.to)}
					sender={decode(router.query.from)}
					message={decode(router.query.message)}
					image={router.query.image?.toString()}
				/>
				<Button bgColor="gray.300" w="full" onClick={onCopy} mt={5}>
					{hasCopied ? "Copied!" : "Copy Link To Share"}
				</Button>
			</Flex>
		</Layout>
	);
};

export default ViewCard;
