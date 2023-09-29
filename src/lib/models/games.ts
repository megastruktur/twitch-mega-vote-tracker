import { pb } from "../pocketbase";
import type { GamesResponse } from "$lib/pocketbase-types";

export async function getAllGames(): Promise<GamesResponse[]>{
  return await pb.collection('games').getFullList({
    sort: '-votesTotal'
  });
}
