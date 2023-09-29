export type SteamGameData = {
  name: string
  is_free: boolean
  detailed_description: string
  short_description: string
  header_image: string
  categories: Category[]
  genres: Genre[]
  metacritic?: Metacritic
}

export type Genre = {
  id: number
  description: string
}

export type Category = {
  id: number
  description: string
}

export type Metacritic = {
  score: number
  url: string
}
