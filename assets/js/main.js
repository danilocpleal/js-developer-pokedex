
const pokemonList = document.getElementById('pokemonList');
const loadButtonProxPagina =  document.getElementById('loadButtonProxPagina');
const loadButtonAntPagina =  document.getElementById('loadButtonAntPagina');
const modal =  document.getElementById('modal');
const modalContent =  document.getElementById('modal_content');

const limit = 10;
let offset = 0;
let totalRegistros = 151;

function abrirModal(pokemon) {
    modal.style.display = 'block';
    modalContent.innerHTML = `
                <section class="modal_content">           
                    <ol class="detalhes_pokemon ${pokemon.types[0].type.name}">
                        <li class="detalhes">
                            <span class="nome_pokemon">${pokemon.name}</span>
                            <span class="id_pokemon">${pokemon.id}</span>

                            <ol class="tipos">
                                ${pokemon.types.map((pokemon) => `<li class="tipo ${pokemon.type.name}"> ${pokemon.type.name}</li>`).join('')}
                            </ol>
                            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">                            
                        </li>
                    </ol>    
                    <div class="status_detalhe">
                        <h4>Detalhes do Pokemon</h4>
                        <ol class="status">
                            ${pokemon.stats.map((pokemon) => `
                            <li class="tipo">${pokemon.stat.name} 
                                <span class="valor">${pokemon.base_stat}</span>
                            </li>`
                            ).join('')}
                        </ol>
                    </div>
                </section>
                `;
}

function fecharModal() {
    modal.style.display = 'none';
}

function loadPokemonItens(offset, limit){        
    pokeApi.getPokemon(offset, limit).then((pokemonAux = []) => {             
        const newHtml = pokemonAux.map((pokemon) => `
                    <li data-idPokemon="${pokemon.id}" class="pokemon ${pokemon.type}">
                        <span class="number">#${pokemon.id}</span>
                        <span class="name">${pokemon.name}</span>
            
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
                            </ol>
                            <img src="${pokemon.photo}"   
                                 alt="${pokemon.name}" />                            
                        </div>
                
                    </li>
                `
        ).join('');
        
        pokemonList.innerHTML = newHtml;
    })   
}

loadPokemonItens(offset, limit);

loadButtonProxPagina.addEventListener('click', () => {
    
    offset = offset + limit;

    const qtdRegistroProxPag = offset;

    if (qtdRegistroProxPag >= totalRegistros){
        offset = offset - limit;

        document.getElementById('loadButtonProxPagina').disable = true;
        document.getElementById('loadButtonAntPagina').disable = false;
    } else {
        loadPokemonItens(offset, limit); 
        document.getElementById('loadButtonAntPagina').disable = false;
    }       
})

loadButtonAntPagina.addEventListener('click', () => {
    offset = offset - limit;
    
    if (offset >= 0){
        loadPokemonItens(offset, limit);
        document.getElementById('loadButtonProxPagina').disable = true;
    } else {
        document.getElementById('loadButtonAntPagina').disable = true;
        document.getElementById('loadButtonProxPagina').disable = false;
        offset = offset + limit;
        
        // loadButtonAntPagina.parentElement.removeChild(loadButtonAntPagina);
    }

})

pokemonList.addEventListener('click', (event) => {
    const pokemonClick = event.target.closest('.pokemon');
    const idPokemon = pokemonClick.dataset.idpokemon;

    pokeApi.getPokemonModal(idPokemon).then((statusPokemon = []) => {
        abrirModal(statusPokemon);
    })

})

// imagemPokemon.addEventListener('click', () => {
//     const modal = document.querySelector('.modal');
//     const actualStyle = modal.style.display; 

//     if (actualStyle == 'block') {
//         modal.style.display = 'none';
//     } else {
//         modal.style.display = 'block';
//     }

//     // window.onclick = function(event) {
//     //     if (event == modal) {

//     //     }
//     // }
// })





// pokeApi.getPokemon(0,10).then((pokemonAux = []) => {
    
//     pokemonList.innerHTML += pokemonAux.map(convertPokemonToLi).join('');
    
//     // o codigo abaixo corresponde ao debaixo
//     // const listaPokemon = pokemonAux.map((pokemon) => convertPokemonToLi(pokemon));
     
//     // const novoHtml = listaPokemon.join('');

//     // pokemonList.innerHTML += novoHtml;

//     //o código acima, representa o mesmo código abaixo
//     // let id = 1;

//     // for (let i = 0; i < pokemonAux.length; i++) {
//     //     const pokemon = pokemonAux[i];
//     //     pokemonList.innerHTML += convertPokemonToLi(pokemon, id);              
//     //     id++;
//     // }

//     // console.log(listaPokemon);
    

// })
