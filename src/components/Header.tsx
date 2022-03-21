import React, { useEffect, useState } from 'react'
import Logo from '../resources/logo.svg'
import { IPokemonCards, PokemonCards } from './PokemonCard'


export const Header: React.FC<IPokemonCards> = ({ pokemons, updateState }: IPokemonCards) => {
    const onLogoClick: any = () => {
        updateState(<PokemonCards pokemons={pokemons} updateState={updateState}></PokemonCards>)
    }

    return (
        <div>
            <img src={Logo} alt="logo" onClick={onLogoClick} />
        </div>
    );
}
