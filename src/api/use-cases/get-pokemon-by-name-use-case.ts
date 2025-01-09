import { Pokemon } from '../../models';
import { getPokemonByName } from '../repositories';

export const getPokemonByNameUseCase = async (name: string) => {
    const { data: result } = await getPokemonByName(name);
    const pokemon: Pokemon = {
        name: result.name,
        photoUrl: result.sprites?.front_default,
        abilities: result.abilities.map(a => a.ability.name),
        moves: result.moves.map(m => m.move.name),
        forms: result.forms.map(m => m.name),
    };

    return pokemon;
};