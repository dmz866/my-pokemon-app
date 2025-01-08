import { PokemonAPI } from "./pokemon-api"

export interface PokemonAPIResponse {
	count: number
	next: string
	previous: any
	results: PokemonAPI[]
}