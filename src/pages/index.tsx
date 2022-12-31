import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Layout from "../../src/components/layout";
import Link from "next/link";

const Home: NextPage = () => {
	return (
		<Layout title="Card Builder">
			<Flex flexDir="column" align="center" justify="center" gap={6} my={200}>
				<Heading
					fontFamily="mono"
					fontWeight={600}
					fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
					lineHeight="110%">
					Card making{" "}
					<Text as="span" color="green.400">
						made easy
					</Text>
				</Heading>
				<Text color="gray.500" fontSize="lg" maxW="5xl">
					Make and send your BFFs a custom card for any occasion!
				</Text>
				<Link href="/create" title="Card Builder">
					<Button borderRadius={10} size="lg">
						Get Started
					</Button>
				</Link>
			</Flex>
		</Layout>
	);
};

export default Home;
