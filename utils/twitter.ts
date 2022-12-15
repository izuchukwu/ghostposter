import {isProduction} from './is-production'
import {Profile, Tweet} from '@the-convocation/twitter-scraper'
import _ from 'lodash'

const APIURL = isProduction
	? 'https://api.ghostposter.ai'
	: 'http://localhost:19999'

const getTweetsFromUser = async (
	twitterName: string
): Promise<Tweet[] | undefined> => {
	const res = await fetch(`${APIURL}/tweets/${twitterName}`)
	const json = await res.json()
	if (json.error) console.error(json.error)
	return json.tweets
}

const getThreadsFromUser = async (
	twitterName: string
): Promise<Tweet[][] | undefined> => {
	const res = await fetch(`${APIURL}/threads/${twitterName}`)
	const json = await res.json()
	if (json.error) console.error(json.error)
	return json.threads
}

const getProfile = async (
	twitterName: string
): Promise<Profile | undefined> => {
	const res = await fetch(`${APIURL}/profile/${twitterName}`)
	const json = await res.json()
	if (json.error) console.error(json.error)
	return json.profile
}

export const Twitter = {
	getTweetsFromUser,
	getThreadsFromUser,
	getProfile
}
