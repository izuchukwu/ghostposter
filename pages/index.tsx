import React, {useState} from 'react'
import {Box, Center, Group, LoadingOverlay} from '@mantine/core'
import Head from 'next/head'
import {ThreadBoard, TweetThread} from '../components/TweetThread'
import {TweetForm} from '../components/TweetForm'
import {Horizontal} from '../utils/layout/Horizontal'
import {Twitter} from '../utils/twitter'
import {Profile, Tweet} from '@the-convocation/twitter-scraper'
import {Vertical} from '../utils/layout/Vertical'

enum State {
	FetchingThreads,
	GeneratingThreads,
	Done
}

export default function Home() {
	const [state, setState] = useState<State>(State.Done)
	const [profile, setProfile] = useState<Profile>()
	const [threads, setThreads] = useState<Tweet[][]>()

	const onCreate = async (twitterName: string, prompt: string) => {
		console.log('Fetching thread...')
		// Update state
		setState(State.FetchingThreads)

		// Get profile
		const profile = await Twitter.getProfile(twitterName)
		setProfile(profile)
		console.log(profile)

		// Get threads
		const threads = await Twitter.getThreadsFromUser(twitterName)
		setThreads(threads)
		console.log(threads)

		// Update state
		setState(State.GeneratingThreads)
		console.log('Generating thread...')
	}

	return (
		<>
			<Head>
				<title>Ghostposter</title>
				<meta
					name="description"
					content="Ghostposter writes Tweet threads for you in your style."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Horizontal className="h-screen" v="center" fullWidth>
				<div className="h-full w-1/2 border-r border-slate-200 overflow-y-scroll">
					<TweetForm onCreate={onCreate} />
				</div>
				<div className="h-full w-1/2 bg-slate-50">
					<Box
						h="100vh"
						w="50vw"
						className="overflow-scroll relative"
					>
						{(state === State.FetchingThreads ||
							state === State.GeneratingThreads) && (
							<>
								<LoadingOverlay visible={true} />
								{profile &&
									threads &&
									state === State.GeneratingThreads && (
										<ThreadBoard
											profile={profile}
											threads={threads}
										/>
									)}
							</>
						)}
					</Box>
				</div>
			</Horizontal>
		</>
	)
}
