import axios from "axios";
import { PokemonAPIDetail } from "../../models/api/pokemon-api-detail";
import { PokemonAPIResponse } from "../../models/api/pokemon-api-response";

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getAllPokemons = async (page: number = 1, limit = 20) => {
    const offset = page * limit;
    return axios.get<PokemonAPIResponse>(`${POKEMON_API_URL}?offset=${offset}&limit=${limit}`)
}

export const getPokemonByName = async (name: string) => {
    return axios.get<PokemonAPIDetail>(`${POKEMON_API_URL}/${name}`);
}