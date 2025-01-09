import { AxiosResponse } from 'axios';
import { Pokemon, PokemonAPIDetail } from '../../models';
import { getAllPokemons, getPokemonByName } from '../repositories';

export const getAllPokemonsUseCase = async (page: number) => {
    const promisesList: Promise<AxiosResponse<PokemonAPIDetail>>[] = [];
    const result = await getAllPokemons(page);

    result?.data?.results.forEach(async (p) => {
        promisesList.push(getPokemonByName(p.name));
    });

    const pokemonDetails = await Promise.all(promisesList);
    const pokemonsFound = pokemonDetails.map(p => {
        const pokemon: Pokemon = {
            name: p.data.name,
            photoUrl: p.data.sprites?.front_default,
            abilities: p.data.abilities.map(a => a.ability.name),
            moves: p.data.moves.map(m => m.move.name),
            forms: p.data.forms.map(m => m.name),
        };

        return pokemon;
    });

    return pokemonsFound;
};