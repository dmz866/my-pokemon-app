type PokemonCardProps = {
    name: string,
    photoUrl: string
};

export const PokemonCard = ({ name, photoUrl }: PokemonCardProps) => {
    return (
        <div className="rounded-lg p-5 justify-center flex-row m-5 bg-green-300">
            <p className="font-bold text-xl">{name}</p>
            <img src={photoUrl} height={100} width={100} />
        </div>
    );
}