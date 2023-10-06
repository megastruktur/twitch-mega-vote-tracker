import { pb } from "../pocketbase";
import type { GamesResponse } from "$lib/pocketbase-types";

export async function getAllGames(): Promise<GamesResponse[]>{
  
  let games: (GamesResponse & {weight?: number})[] = await pb.collection('games').getFullList({
    sort: '-votesTotal',
    expand: 'steam_game_data(game)',
  });

  let weightCounter = 1
  games = games.map((game) => {
    game.weight = weightCounter
    weightCounter++
    return game
  })

  return games
}
