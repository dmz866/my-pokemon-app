import { useState } from "react";
import Modal from 'react-modal';
import { searchPokemons } from '../../../api/repositories';
import { Pokemon } from "../../../models";
import { PokemonCard, PokemonDetails } from "../../components";

export const HomePage = () => {
    const [searchValue, setSearchValue] = useState(undefined);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemonSelected, setPokemonSelected] = useState<Pokemon>();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [noPokemonFound, setNoPokemonFound] = useState<boolean>(false);

    const handleSelectPokemon = (pokemon: Pokemon) => {
        setPokemonSelected(pokemon);
        openModal();
    };
    const handleSearch = async (e: any) => {
        const result = await searchPokemons(searchValue);
        setPokemons(result);
        setNoPokemonFound(result?.length === 0);
    }
    const handleInput = (e: any) => {
        const fieldValue = e.nativeEvent.target.value;
        setSearchValue(fieldValue);
    }
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

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
                        return <PokemonCard key={p.name} pokemon={p} handlePokemonSelection={handleSelectPokemon} />
                    })}
                </div>
            </div>
            <Modal isOpen={modalIsOpen} style={modalStyles}>
                <PokemonDetails handleClose={closeModal} pokemon={pokemonSelected!} />
            </Modal>
        </div>
    );
}

const modalStyles = {
    content: {        
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        width: '500px',
    },
};