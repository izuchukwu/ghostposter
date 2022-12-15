import {
	createGetInitialProps,
	createStylesServer,
	ServerStyles
} from '@mantine/next'
import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript
} from 'next/document'
import {emotionCache} from './_app'

const stylesServer = createStylesServer(emotionCache)

export default class _Document extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)

		return {
			...initialProps,
			styles: [
				initialProps.styles,
				<ServerStyles
					html={initialProps.html}
					server={stylesServer}
					key="styles"
				/>
			]
		}
	}

	render() {
		return (
			<Html>
				<Head>
					<meta
						name="description"
						content="Ghostposter writes Tweet threads in your style."
					/>
					<link rel="icon" href="/favicon.svg" />
					<link rel="preconnect" href="https://rsms.me/" />
					<link
						rel="stylesheet"
						href="https://rsms.me/inter/inter.css"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
