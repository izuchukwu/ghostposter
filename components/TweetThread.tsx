import React from 'react'
import {Timeline, Avatar, Group} from '@mantine/core'
import {Profile, Tweet} from '@the-convocation/twitter-scraper'
import {Horizontal} from '../utils/layout/Horizontal'
import {Vertical} from '../utils/layout/Vertical'

/* --- Thread Board --- */

type ThreadBoardProps = {
	profile: Profile
	threads: Tweet[][]
}

export const ThreadBoard = ({profile, threads}: ThreadBoardProps) => (
	<Group align="flex-start" noWrap p={50} sx={{gap: 50}}>
		{threads.map((thread) => (
			<TweetThread key={thread[0].id} thread={thread} profile={profile} />
		))}
	</Group>
)

/* --- Thread --- */

type ThreadProps = {
	profile: Profile
	thread: Tweet[]
}

export const TweetThread = ({profile, thread}: ThreadProps) => {
	return (
		<Timeline
			active={1}
			bulletSize={24}
			lineWidth={2}
			color="gray"
			w={330}
			mih={330}
			className="inline-block flex-shrink-0"
			sx={{
				flexBasis: '300px'
			}}
		>
			{thread.map((tweet) => (
				<Timeline.Item
					key={tweet.id}
					bulletSize={45}
					bullet={
						<Avatar size={45} radius="xl" src={profile.avatar} />
					}
				>
					<Vertical ml={10}>
						<Horizontal gap={5}>
							<div className="text-slate-900 font-semibold">
								{profile.name}
							</div>
							<div className="text-slate-400">
								@{profile.username}
							</div>
						</Horizontal>
						<div className="text-slate-700">{tweet.text}</div>
					</Vertical>
				</Timeline.Item>
			))}
		</Timeline>
	)
}
