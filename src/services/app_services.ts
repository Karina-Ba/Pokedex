import React from 'react'

export interface IPokemon {
    name: string
    url: string
}

export interface IPokemonData {
    name: string
    image: string
    types: Array<string>
    description: string
    stats: Array<any>
}

export async function getPokemonsData(): Promise<IPokemonData[]> {
    const pokemonsBases = await getPokemonsBase()

    const pokemons = await Promise.all(pokemonsBases.map(async (pokemonBase) => {
        const pokemon = await getPokemonData(pokemonBase.url)
        pokemon.description = await getPokemonDesc(pokemon.description)
        return pokemon
    }))

    return pokemons
}

async function getPokemonsBase(): Promise<IPokemon[]> {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
    const json_res = await res.json()
    return json_res.results as IPokemon[]
}

async function getPokemonData(url: string): Promise<IPokemonData> {
    const res = await fetch(<RequestInfo>url)
    const json_res = await res.json()
    const { name, sprites, stats, species, types } = json_res
    const pokemon = {
        name,
        image: sprites.front_default,
        stats,
        description: species.url,
        types: []
    } as IPokemonData

    types.forEach((poke_type: any) => {
        pokemon.types.push(poke_type.type.name)
    })

    return pokemon
}

async function getPokemonDesc(url: string): Promise<string> {
    const res = await fetch(<RequestInfo>url)
    const json_res = await res.json()

    return json_res.flavor_text_entries[0].flavor_text
}

