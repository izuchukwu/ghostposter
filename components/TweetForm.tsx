/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
	Badge,
	Box,
	Button,
	Center,
	Divider,
	Textarea,
	TextInput
} from '@mantine/core'
import {useHover} from '@mantine/hooks'
import _ from 'lodash'
import {useState} from 'react'
import {Vertical} from '../utils/layout/Vertical'
import {Twitter} from '../utils/twitter'

type TweetFormProps = {
	onCreate?: (twitterName: string, prompt: string) => void
}

export const TweetForm = ({onCreate}: TweetFormProps) => {
	const {hovered: isGhostHovered, ref: ghostRef} =
		useHover<HTMLImageElement>()
	const [twitterName, setTwitterName] = useState<string>('')
	const [prompt, setPrompt] = useState<string>('')

	const debugFetch = async (type: 'tweets' | 'threads' | 'profile') => {
		if (!twitterName) {
			console.error('No Twitter name provided')
			return
		}
		console.log(`Fetching @${twitterName}'s ${type}...`)

		try {
			let res
			switch (type) {
				case 'tweets':
					res = await Twitter.getTweetsFromUser(twitterName)
					break
				case 'threads':
					res = await Twitter.getThreadsFromUser(twitterName)
					break
				case 'profile':
					res = await Twitter.getProfile(twitterName)
					break
			}
			console.log(res)
		} catch (e) {
			console.error('Fetch failed')
			console.error(e)
		}
	}

	return (
		<Center h="100vh">
			<Vertical h="center" gap={20}>
				<img
					src={isGhostHovered ? '/ghost-anim.png' : '/ghost.png'}
					width={80}
					height={80}
					alt="The Ghostposter"
					ref={ghostRef}
				/>
				<TextInput
					placeholder="fableml"
					icon={
						<Box pl={20} pr={5} className="text-slate-600">
							@
						</Box>
					}
					iconWidth={30}
					size="lg"
					radius="md"
					classNames={{
						input: '!bg-slate-50 !text-slate-900',
						icon: 'opacity-100'
					}}
					w={300}
					mt={10}
					value={twitterName}
					onChange={(e) => setTwitterName(e.currentTarget.value)}
				/>
				<Textarea
					placeholder="Tweet about..."
					size="lg"
					radius="md"
					w={300}
					autosize
					classNames={{
						input: '!bg-slate-50 !text-slate-900'
					}}
					value={prompt}
					onChange={(e) => setPrompt(e.currentTarget.value)}
				/>
				<Button
					w={300}
					radius="md"
					size="lg"
					onClick={() => onCreate?.(twitterName, prompt)}
				>
					Create Thread →
				</Button>
				<Divider w={300} />
				<Vertical gap={10}>
					{['tweets', 'threads', 'profile'].map((type) => (
						<Button
							key={type}
							w={300}
							radius="md"
							color="gray"
							onClick={() =>
								debugFetch(
									type as 'tweets' | 'threads' | 'profile'
								)
							}
						>
							<Badge color="gray" mr={8} size="xs">
								Debug
							</Badge>{' '}
							Fetch {_.capitalize(type)}
						</Button>
					))}
				</Vertical>
			</Vertical>
		</Center>
	)
}
