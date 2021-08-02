const limit = 20;
let offset = 20;

const getData = (limit=0, offset=0) => {
    console.log('l', limit);
    console.log('f', offset);
    
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then( (response) => response.json() )
        .then( (json) => {
            llenarDatos( json.results );
            paginacion(json.next, json.previous );
            console.log(json);
        })
        .catch( (error) => {
            console.log("Error", error);
        });
};

const llenarDatos = ( data =[] ) => {
    let html = '';

    data.forEach( (pj) => {
        html += `<div class="col mt-5">`;
        html += `<div class="card" style="width: 10rem;">`;
        // html += `<img src="${pj.image}" class="card-img-top" alt="${pj.name}"/>`;
        html += `<div class="card-body">`;
        html += `<h5 class="card-title">${pj.name}</h5>`;
        // html += `<p class="card-text">Estado: ${pj.status}</p>`;
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
