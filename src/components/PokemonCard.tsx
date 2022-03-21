import React, { useEffect, useState } from 'react'
import * as services from '../services/app_services'
import { getPokemonDesc } from '../services/app_services';
import { PokemonPage } from './Pages/PokemonPage'

export interface IPokemonCard {
    index: string
    pokemon: services.IPokemonData
    updateState: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>
}

export interface IPokemonCards {
    pokemons: services.IPokemonData[] | undefined
    updateState: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>
}

export const PokemonCard: React.FC<IPokemonCard> = ({ pokemon, index, updateState }: IPokemonCard) => {
    const onCardClick = async (event: any) => {
        event.preventDefault();
        // pokemon.description = await getPokemonDesc(pokemon.description)
    
        updateState(
            <PokemonPage index={index} pokemon={pokemon} updateState={updateState}></PokemonPage>)
    };


    return (
        <div className='card' onClick={onCardClick}>
            <div className='card-container'>
                <div className='card-text'>{index}</div>
                <img src={pokemon.image} alt="pokemon-image" />
                <div className='card-text center-text'>{pokemon.name}</div>
            </div>
        </div>
    )
}

export const PokemonCards: React.FC<IPokemonCards> = ({ pokemons, updateState }: IPokemonCards) => {
    const [pokemonsMap, setPokemonsMap] = useState<IPokemonCard[]>()

    useEffect(() => {
        let preindex = '#00' as string
        if ((!pokemonsMap || pokemonsMap?.length != pokemons?.length) && pokemons) {
            let mappedPokemons = [] as IPokemonCard[]
            pokemons.forEach((pokemonData: services.IPokemonData, index: number) => {
                if (index > 8 && index < 99) preindex = '#0'
                else if (index > 98) preindex = '#'
                const pokemonCard = { index: preindex + (index + 1), pokemon: pokemonData } as IPokemonCard
                mappedPokemons.push(pokemonCard)
            })

            setPokemonsMap(mappedPokemons)
        }
    })

    const makeCardsArray: any = () => {
        const cardsArray = [] as JSX.Element[]
        if (pokemonsMap) {
            pokemonsMap.forEach(pokemon => {
                cardsArray.push(
                    <PokemonCard key={pokemon.index} index={pokemon.index} pokemon={pokemon.pokemon} updateState={updateState}></PokemonCard>)
            })
        }
        return <div className='cards'>{cardsArray}</div>
    }

    return (
        makeCardsArray()
    )
}
