import { useState } from "react";
import { searchPokemons } from '../../../api/repositories';
import { Pokemon } from "../../../models";

export const HomePage = () => {
    const [searchValue, setSearchValue] = useState(undefined);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const handleSearch = async () => {
        if (!searchValue) return;

        const result = await searchPokemons(searchValue);
    }
    return (
        <>
            <div>
                <input value={searchValue}></input>
            </div>
            <div className="p-4">

            </div>
            <div className="p-4">
                <button disabled={!searchValue} className="w-full border rounded-lg bg-green-200" onClick={handleSearch}>Search</button>
            </div>
        </>
    );
}