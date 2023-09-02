const nav = document.querySelector('nav');
const information = document.querySelector('#information')
let players;

const fetchPlayers = async()=>{
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players/');
    const json = await response.json();
    players = json.data.players;
    console.log(players);
    console.log(players[0].breed);
    render();
};

const render = () => {
    const hash = window.location.hash.slice(1)*1;
    let html = players.map(player=>{
        return `
            <a href='#${player.id !== hash ? player.id: ''}' class ='${player.id === hash ? 'selected': ''}'>
             ${player.name}
            </a>
        `;
    }).join('');
    nav.innerHTML = html;

    const player = players.find(player =>{
        return player.id === hash;
    });


    let breed = '';
    if(player){
        breed =`
        <div style='background-image:url(${player.imageUrl}'>
                <p>${player.breed}<br><p>
                <p><br><br><br>Status: ${player.status} <p>
        </div>
            `;
            console.log(breed);
    }    
    information.innerHTML = breed;
}

window.addEventListener('hashchange', ()=>{
    render();
})

fetchPlayers();