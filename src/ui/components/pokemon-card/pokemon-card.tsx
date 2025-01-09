import { Pokemon } from "../../../models";

type PokemonCardProps = {
    pokemon: Pokemon,
    handlePokemonSelection: (pokemon: Pokemon) => void
};

export const PokemonCard = ({ pokemon, handlePokemonSelection }: PokemonCardProps) => {
    return (
        <div className="rounded-lg p-5 justify-center flex-row m-5 bg-green-300" onClick={() => handlePokemonSelection(pokemon)}>
            <p className="font-bold text-xl">{pokemon.name}</p>
            <img alt={pokemon.name} src={pokemon.photoUrl} height={100} width={100} />
        </div>
    );
}