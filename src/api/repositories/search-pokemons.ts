import axios from "axios";
import { PokemonAPIResponse } from "../../models/api/pokemon-api-response";

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const searchPokemons = async (searchValue: string, page: number = 1, limit = 20) => {
    try {
        const offset = page * limit;
        const result = await axios.get<PokemonAPIResponse>(`${POKEMON_API_URL}?offset=${offset}&limit=${limit}`);

        return result.data.results;
    }
    catch (e) {
        return [];
    }
}