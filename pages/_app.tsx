import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {createEmotionCache, MantineProvider} from '@mantine/core'

// https://mantine.dev/theming/emotion-cache/#server-side-rendering-with-custom-cache
export const emotionCache = createEmotionCache({key: 'mantine'})

function MyApp({Component, pageProps}: AppProps) {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				/** Put your mantine theme override here */
				colorScheme: 'light',
				colors: {}
			}}
			emotionCache={emotionCache}
		>
			<Component {...pageProps} />
		</MantineProvider>
	)
}

export default MyApp
