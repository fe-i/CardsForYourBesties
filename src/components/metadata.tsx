import Head from "next/head";

const Metadata: React.FC<{ title?: string | undefined }> = ({ title }) => {
	return (
		<Head>
			<title>{(title ? `${title} | ` : "") + "CFYB"}</title>
			<meta property="og:title" content="Cards For Your Besties" />
			<meta
				property="og:description"
				content="Make and send custom digital cards to your besties!"
			/>
			<meta property="og:type" content="website" />
			<meta property="og:url" content="" />
			<meta property="og:image" content="/mail.png" />
			<meta name="twitter:card" content="summary_large_image" />
		</Head>
	);
};

export default Metadata;
