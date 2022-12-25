import Head from "next/head";

const Metadata: React.FC<{ title?: string | undefined }> = ({ title }) => {
	return (
		<Head>
			<title>{(title ? `${title} | ` : "") + "CFYB"}</title>
			<meta property="og:title" content="Cards For Your Besties" />
			<meta property="og:type" content="website" />
			<meta property="og:image" content="/info.png" />
			<meta
				property="og:description"
				content="Make and send custom digital cards for your besties!"
			/>
		</Head>
	);
};

export default Metadata;
