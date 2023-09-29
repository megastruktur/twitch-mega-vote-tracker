import Pocketbase from "pocketbase"
import { PUBLIC_POCKETBASE_URL } from "$env/static/public"

const pocketbaseUrl = PUBLIC_POCKETBASE_URL

export const pb = new Pocketbase(pocketbaseUrl)
pb.autoCancellation(false)
