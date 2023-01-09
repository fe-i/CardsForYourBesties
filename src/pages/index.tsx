import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Layout from "../../src/components/layout";
import Link from "next/link";

const Home: NextPage = () => {
	return (
		<Layout title="Home">
			<Flex
				flexDir="column"
				align="center"
				justify="center"
				textAlign="center"
				gap={6}
				px={8}
				py="32vh">
				<Heading
					fontFamily="mono"
					fontWeight={600}
					fontSize={{ base: "5xl", md: "6xl" }}
					lineHeight="110%">
					Card making{" "}
					<Text as="span" color="green.400">
						made easy
					</Text>
				</Heading>
				<Text color="gray.500" fontSize="lg">
					Create and send your BFFs a personalized card for any occasion!
				</Text>
				<Button as={Link} href="/create" title="Card Builder" borderRadius={10} size="lg">
					Get Started
				</Button>
			</Flex>
		</Layout>
	);
};

export default Home;
