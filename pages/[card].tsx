import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import DigitalCard from "../components/digitalCard";
import Layout from "../components/layout";

const decode = (str: string | string[] | undefined): string =>
	Buffer.from(new String(str), "base64").toString("binary");

const ViewCard: NextPage = () => {
	const router = useRouter();

	return (
		<Layout title="View Card" recipient={decode(router.query.to)}>
			<Flex justifyContent="center" fontSize="lg" h="100%" p={8}>
				<DigitalCard
					recipient={decode(router.query.to)}
					sender={decode(router.query.from)}
					message={decode(router.query.message)}
					image={router.query.image?.toString()}
				/>
			</Flex>
		</Layout>
	);
};

export default ViewCard;
