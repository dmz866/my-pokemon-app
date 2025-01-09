import { Pokemon } from "../../../models";

type PokemonDetailsProps = {
    pokemon: Pokemon,
    handleClose: () => void,
};

export const PokemonDetails = ({ pokemon, handleClose }: PokemonDetailsProps) => {
    return (
        <div className="py-3 px-10 justify-center flex-row bg-red-400">
            <p className="mx-auto font-bold text-4xl">{pokemon.name}</p>
            <img className="mx-auto" alt={pokemon.name} src={pokemon.photoUrl} height={100} width={100} />
            <div className="flex gap-10">
                <div>
                    <p className="font-bold text-xl">Abilities</p>
                    <div className="flex-row flex-wrap">
                        {pokemon.abilities.map(a => (<li key={a}>{a}</li>))}
                    </div>
                </div>
                <div>
                    <p className="font-bold text-xl">Forms</p>
                    <div className="flex flex-col h-44 overflow-auto">
                        {pokemon.forms.map(a => (<li key={a}>{a}</li>))}
                    </div>
                </div>
                <div>
                    <p className="font-bold text-xl">Moves</p>
                    <div className="flex flex-col h-44 overflow-auto">
                        {pokemon.moves.map(a => (<li key={a}>{a}</li>))}
                    </div>
                </div>                
            </div>
            <button className="bg-gray-200 mt-10 w-full border rounded-lg" onClick={handleClose}>Close</button>
        </div>
    );
}