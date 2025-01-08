import { useState } from "react";
import { searchPokemons } from '../../../api/repositories';
import { Pokemon } from "../../../models";
import { PokemonCard } from "../../components";

export const HomePage = () => {
    const [searchValue, setSearchValue] = useState(undefined);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [noPokemonFound, setNoPokemonFound] = useState<boolean>(false);
    const handleSearch = async () => {
        const result = await searchPokemons(searchValue);
        setPokemons(result);
        setNoPokemonFound(result?.length == 0);
    }
    const handleInput = (e: any) => {
        const fieldValue = e.nativeEvent.target.value;
        setSearchValue(fieldValue);
    }

    return (
        <div className="w-[800px] mx-auto justify-center flex mt-10">
            <div className="w-full">
                <div className="mx-auto justify-center flex-row p-4">
                    <p className="text-3xl font-bold my-2">Pokemon App</p>
                    <div className="flex justify-items-center content-center">
                        <input name='searchValue' type="text" className="text-black w-2/3 py-1 px-2 border rounded-lg" onChange={handleInput} />
                        <button className="mx-2 border rounded-lg bg-green-200 w-1/3 p-0 py-1" onClick={handleSearch}>Search</button>
                    </div>
                </div>
                <div className="p-3 flex flex-wrap">
                    {noPokemonFound && <p>No Pokemons found</p>}
                    {pokemons?.map((p) => {
                        return <PokemonCard key={p.name} name={p.name} photoUrl={p.photoUrl} />
                    })}
                </div>
                <div className="p-4">

                </div>
            </div>
        </div>
    );
}