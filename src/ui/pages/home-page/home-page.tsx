import { useCallback, useState } from "react";
import Modal from 'react-modal';
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { getAllPokemonsUseCase } from "../../../api/use-cases/get-all-pokemons-use-case";
import { getPokemonByNameUseCase } from '../../../api/use-cases/get-pokemon-by-name-use-case';
import { IS_USER_AUTHTENTICATED, LOGIN_PATH } from "../../../constants";
import { Pokemon } from "../../../models";
import { removeLocalItem } from "../../../utils";
import { PokemonCard, PokemonDetails } from "../../components";

export const HomePage = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState(undefined);
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemonSelected, setPokemonSelected] = useState<Pokemon>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showCurrentPage, setShowCurrentPage] = useState(false);
    const [noPokemonFound, setNoPokemonFound] = useState<boolean>(false);
    const openModal = useCallback(() => setIsOpen(true), [setIsOpen]);
    const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

    const handleSignOut = useCallback(() => {
        removeLocalItem(IS_USER_AUTHTENTICATED);
        navigate(LOGIN_PATH);
    }, [navigate]);
    const handleSelectPokemon = useCallback((pokemon: Pokemon) => {
        setPokemonSelected(pokemon);
        openModal();
    }, [setPokemonSelected, openModal]);

    const handleSearch = useCallback(async () => {
        let result: Pokemon[] = [];

        setIsLoading(true);

        if (searchValue) {
            result = [await getPokemonByNameUseCase(searchValue)];
            setShowCurrentPage(false);
        }
        else {
            result = await getAllPokemonsUseCase(currentPage);
            setShowCurrentPage(true);
        }

        setPokemons(result);
        setNoPokemonFound(result?.length === 0);
        setIsLoading(false);
    }, [currentPage, searchValue, setShowCurrentPage, setIsLoading, setPokemons, setNoPokemonFound]);



    const handleInput = (e: any) => {
        const fieldValue = e.nativeEvent.target.value;
        setSearchValue(fieldValue);
    }
    const previousPage = () => {
        setCurrentPage(prev => prev - 1);
        handleSearch();
    };
    const nextPage = () => {
        setCurrentPage(prev => prev + 1);
        handleSearch();
    };

    return (
        <div className="flex-row">
            <button className="float-end border rounded-lg text-black mr-5 px-3" onClick={handleSignOut}>Sign out</button>
            <div className="w-[800px] mx-auto justify-center flex mt-10">
                <div className="w-full">
                    <p className="text-3xl font-bold my-2">Pokemon App</p>
                    <div className="mx-auto justify-center flex-row p-4">
                        <div className="flex justify-items-center content-center gap-x-4 mt-2">
                            <p className="font-semibold">Search By Name:</p>
                            <input name='searchValue' type="text" className="text-black w-2/4 py-1 px-2 border rounded-lg" onChange={handleInput} />
                            <button className="px-2 mx-2 border rounded-lg bg-green-200 py-1" onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                    {
                        showCurrentPage &&
                        <div className="p-3">
                            <p className="mb-4">Current Page: {currentPage}</p>
                            <button disabled={currentPage === 1} className="disabled:bg-gray-200 border rounded-lg text-blue-400 mr-5 px-3" onClick={previousPage}>Previous Page</button>
                            <button className="border rounded-lg text-blue-400 mr-5 px-3" onClick={nextPage}>Next Page</button>
                        </div>
                    }
                    <div className="flex justify-center">
                        {
                            isLoading &&
                            <ClipLoader
                                loading={isLoading}
                                size={150}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        }
                    </div>
                    <div className="p-3 flex flex-wrap">
                        {noPokemonFound && <p>No Pokemons found</p>}
                        {pokemons?.map((p) => {
                            return <PokemonCard key={p.name} pokemon={p} handlePokemonSelection={handleSelectPokemon} />
                        })}
                    </div>
                </div>
                <Modal isOpen={modalIsOpen} style={modalStyles} ariaHideApp={false}>
                    <PokemonDetails handleClose={closeModal} pokemon={pokemonSelected!} />
                </Modal>
            </div>
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
        width: '550px',
    },
};