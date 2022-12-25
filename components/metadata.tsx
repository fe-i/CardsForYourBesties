import Head from "next/head";

const Metadata: React.FC<{
	title?: string | undefined;
	recipient?: string | string[] | undefined;
	image?: string | undefined;
}> = ({ title, recipient, image }) => {
	return (
		<Head>
			<title>{(title ? `${title} | ` : "") + "CFYB"}</title>
			<meta
				property="og:title"
				content={recipient ? `A digital card for ${recipient}!` : "Cards For Your Besties"}
			/>
			<meta property="og:type" content="website" />
			<meta property="og:image" content={image} />
			<meta
				property="og:description"
				content="Make and send custom digital cards for your besties!"
			/>
		</Head>
	);
};

export default Metadata;
