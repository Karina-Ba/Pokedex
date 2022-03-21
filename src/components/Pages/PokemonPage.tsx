import { IPokemonCard } from '../PokemonCard'
import CSS from 'csstype';


export const PokemonPage: React.FC<IPokemonCard> = ({ pokemon, index, updateState }: IPokemonCard) => {

    enum Types {
        normal = '#A8A77A',
        fire = '#EE8130',
        water = '#6390F0',
        electric = '#F7D02C',
        grass = '#7AC74C',
        ice = '#96D9D6',
        fighting = '#C22E28',
        poison = '#A33EA1',
        ground = '#E2BF65',
        flying = '#A98FF3',
        psychic = '#F95587',
        bug = '#A6B91A',
        rock = '#B6A136',
        ghost = '#735797',
        dragon = '#6F35FC',
        dark = '#705746',
        steel = '#B7B7CE',
        fairy = '#D685AD',
    }

    const makeStats: any = () => {
        const statsArray = [] as JSX.Element[]
        let total = 0 as number
        if (pokemon.stats) {
            pokemon.stats.forEach(pokemonStat => {
                statsArray.push(<div key={pokemonStat.stat.name}>{pokemonStat.stat.name}: {pokemonStat.base_stat}</div>)
                total += pokemonStat.base_stat
            })
            statsArray.push(<div key='Total'>Total: {total}</div>)
        }
        return <div className='card-text small-text rows'>{statsArray}</div>
    }

    const makeTypes: any = () => {
        const typesArray = [] as JSX.Element[]
        if (pokemon.types) {
            pokemon.types.forEach(pokemonType => {
                const color: CSS.Properties = {
                    backgroundColor: Types[pokemonType as keyof typeof Types],
                };

                typesArray.push(<div key={pokemonType} className='card-text center-text middle type' style={color}>{pokemonType}</div>)
            })
        }
        return typesArray
    }

    return (
        <div className='page-card-container page-card'>
            <div className='card-container one-card'>
                <div className='card-text'>{index}</div>
                <img className='middle image-resize {' src={pokemon.image} alt="pokemon-image" />
                <div className='card-text center-text name-text middle'>{pokemon.name}</div>
                <div className='type-container'>{makeTypes()}</div>
            </div>
            <hr className="solid"></hr>
            <div className='card-container two-card'>
                <div className='card-text bold-text'>Description:</div>
                <div className='card-text small-text'>{pokemon.description}</div>
                <div className='card-text bold-text bottom'>Stats:</div>
                {makeStats()}
            </div>
        </div>
    )
}