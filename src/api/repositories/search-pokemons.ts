import axios, { AxiosResponse } from "axios";
import { Pokemon } from "../../models";
import { PokemonAPIDetail } from "../../models/api/pokemon-api-detail";
import { PokemonAPIResponse } from "../../models/api/pokemon-api-response";

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const searchPokemons = async (searchValue?: string, page: number = 1, limit = 20) => {
    try {
        if (!searchValue) {
            const promisesList: Promise<AxiosResponse<PokemonAPIDetail>>[] = [];
            const offset = page * limit;
            const result = await axios.get<PokemonAPIResponse>(`${POKEMON_API_URL}?offset=${offset}&limit=${limit}`);

            result?.data?.results.forEach(async (p) => {
                promisesList.push(axios.get<PokemonAPIDetail>(`${POKEMON_API_URL}/${p.name}`));
            });

            const pokemonDetails = await Promise.all(promisesList);

            const pokemonsFound = pokemonDetails.map(p => {
                const pokemon: Pokemon = {
                    name: p.data.name,
                    photoUrl: p.data.sprites?.front_default,
                    abilities: p.data.abilities.map(a => a.ability.name),
                    moves: p.data.moves.map(m => m.move.name),
                };

                return pokemon;
            });

            return pokemonsFound;
        }

        const { data: result } = await axios.get<PokemonAPIDetail>(`${POKEMON_API_URL}/${searchValue}`);

        if (result) {
            const pokemon: Pokemon = {
                name: result.name,
                photoUrl: result.sprites?.front_default,
                abilities: result.abilities.map(a => a.ability.name),
                moves: result.moves.map(m => m.move.name),
            };

            return [pokemon];
        }

        return [];
    }
    catch (e) {
        return [];
    }
}