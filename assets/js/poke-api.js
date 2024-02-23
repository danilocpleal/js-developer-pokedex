const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();

    pokemon.id = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonModal = (idPokemon) => { 
    const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`

    return fetch(urlPokemon)
                .then((response) => response.json())
                .then((response) => response)
}

pokeApi.getPokemonDetail = (pokemon) => { 
    return fetch(pokemon.url)
                .then((response) => response.json())
                .then((convertPokeApiDetailToPokemon))
}


pokeApi.getPokemon = (offset = 0, limit = 10) => {
       
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    
    // funciona como se fosse utilziar function () {}
    return fetch(url)
                .then((response) => response.json())
                .then((jsonBody) => jsonBody.results) 
                .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))  
                .then((detailRequests) => Promise.all(detailRequests))
                .then((pokemonDetails) => pokemonDetails)
                .catch((error) => console.error(error))         

}