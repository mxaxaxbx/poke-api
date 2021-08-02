const limit = 20;
let offset = 20;
let count = 0;

const getData = (limit=0, offset=0) => {
    
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then( (response) => response.json() )
        .then( (json) => {
            llenarDatos( json.results );
            setCount( json.count );
            paginacion(json.next, json.previous );
        })
        .catch( (error) => {
            console.log("Error", error);
        });
};

const setCount = (c=0) => {
    count = c;
}

const llenarDatos = ( data =[] ) => {
    let html = '';

    data.forEach( (pj) => {
        callImage(pj);
        html += `<div class="col mt-5">`;
        html += `<div class="card" style="width: 10rem;">`;
        // html += `<img src="${pj.image}" class="card-img-top" alt="${pj.name}"/>`;
        html += `<div class="card-body">`;
        html += `<h5 class="card-title">Nombre: ${pj.name}</h5>`;
        html += `<p class="card-text" id="pj-${pj.name}"></p>`;
        // html += `<p class="card-text">Especie: ${pj.species}</p>`;
        html += `</div>`;
        html += `</div>`;
        html += `</div>`;
    });

    document.getElementById("datosPersonajes").innerHTML = html;
}

const paginacion = ( next='', prev='' ) => {
    let prevDisabled = "";
    let nextDisabled = "";
    
    if( offset === 20 ) prevDisabled = "disabled";
    else prevDisabled = "";

    if( offset >= count ) nextDisabled = "disabled";
    else nextDisabled = "";

    let html = "";

    html += `<li class="page-item ${prevDisabled}"> <a class="page-link" onclick="getResults('minus')" href="#">Anterior</a> </li>`;

    html += `<li class="page-item ${nextDisabled}"> <a class="page-link" onclick="getResults('more')" href="#">Siguiente</a> </li>`;

    document.getElementById("paginacion").innerHTML = html;
};

getData(limit, offset);

const getResults = ( op = 'more') => {
    if( op === 'more') offset = offset + 20;
    else offset = offset - 20;
    getData(limit, offset);
}

const callImage = (pj) => {
    fetch(pj.url)
        .then( (response) => response.json() )
        .then( (json) => {
            let html = "";
            html += `<img src="${json.sprites.back_default}" alt="${pj.name}"/>`;
            document.getElementById(`pj-${pj.name}`).innerHTML = html;

        })
        .catch((err) => {
            console.log('error: ', err);
        });
}
