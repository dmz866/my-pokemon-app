import { useState } from "react";
import { getAllPokemons } from '../../../api/repositories';

export const HomePage = () => {
    const [searchValue, setSearchValue] = useState(undefined);
    const handleSearch = async () => {
        const result = await getAllPokemons();
    }
    return (
        <>
            <div>
                <input value={searchValue}></input>
            </div>
            <div className="p-4">
                <button disabled={!searchValue} className="w-full border rounded-lg bg-green-200" onClick={handleSearch}>Search</button>
            </div>
        </>
    );
}