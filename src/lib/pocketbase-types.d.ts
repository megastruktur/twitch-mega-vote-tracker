/**
* This file was @generated using pocketbase-typegen
*/

import type { Url } from "url"

export enum Collections {
	Games = "games",
	Users = "users",
	Votes = "votes",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type GamesRecord = {
	name?: string
	steamLink: string
	votesTotal?: number
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

export type VotesRecord = {
	amount?: number
	game?: RecordIdString
	voter?: string
}

// Response types include system fields and match responses from the PocketBase API
export type GamesResponse<Texpand = unknown> = Required<GamesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type VotesResponse<Texpand = unknown> = Required<VotesRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	games: GamesRecord
	users: UsersRecord
	votes: VotesRecord
}

export type CollectionResponses = {
	games: GamesResponse
	users: UsersResponse
	votes: VotesResponse
}
