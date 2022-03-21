import React, { useEffect, useState } from 'react'
import { Header } from '../Header'
import { PokemonCards } from '../PokemonCard'
import * as services from '../../services/app_services'

interface IHomePage {
}

export const HomePage: React.FC<IHomePage> = () => {
    const [pokemons, setPokemons] = useState<services.IPokemonData[]>()
    const [loading, setLoading] = useState<Boolean>(true)
    const [state, setState] = useState<JSX.Element>()
    const [currentPage, setCurrentPage] = useState<number>(1)
    // const [cardsPerPage, setCardsPerPage] = useState<number>(12)


    useEffect(() => {
        const fetchPokemons = async () => {
            const pokemonsData = await services.getPokemonsData()
            setPokemons(pokemonsData)
            setLoading(false)
            if (pokemons && !state)
                setState(<PokemonCards pokemons={pokemons} updateState={setState}></PokemonCards>)
        }

        fetchPokemons()

    }, [pokemons])

    return (
        <div className='App-container'>
            <Header updateState={setState} pokemons={pokemons}></Header>
            {state}
        </div>
    )
}
