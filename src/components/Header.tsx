import { MouseEventHandler } from 'react'
import Logo from '../resources/logo.svg'
import { IPokemonData } from '../services/app_services'
import { IPokemonCards, PokemonCards } from './PokemonCard'


export const Header: React.FC<IPokemonCards> = ({ pokemons, updateState }: IPokemonCards) => {
    const onLogoClick: any = () => {
        updateState(<PokemonCards pokemons={pokemons} updateState={updateState}></PokemonCards>)
    }

    const onSearchClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        const inputElement = document.getElementById("search") as HTMLInputElement;
        let filteredPokemons = [] as IPokemonData[] | undefined
        filteredPokemons = pokemons?.filter(pokemon => pokemon.name === inputElement.value.toLowerCase())
        pokemons?.forEach(pokemon => {
            pokemon.types.forEach(type => {
                if (type === inputElement.value.toLowerCase())
                    filteredPokemons?.push(pokemon)
            })
        })
        inputElement.value = ''
        if (filteredPokemons?.length !== 0)
            updateState(<PokemonCards pokemons={filteredPokemons} updateState={updateState}></PokemonCards>)
        
    }

    return (
        <div className='App-container'>
            <img className='logo' src={Logo} alt="logo" onClick={onLogoClick} />
            <form className='search-container'>
                <input className='search' type="text" id="search" name="search" />
                <button type='submit' className='search-button' onClick={onSearchClick}>Search</button>
            </form>
        </div>
    );
}
