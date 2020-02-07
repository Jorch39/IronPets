
 const loadPage = ()=>{

  let coordinates = {
    lat : 19.435756,
    lng :  -99.1337437
};
    initMap(coordinates);
   
}

const showLocation= ()=>{
    let coordinates = {
        lat : 19.435756,
        lng :  -99.1337437
    };
    showMap(coordinates);
}
const initMap = (coordinates)=>{
   const map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates,
        zoom: 12
      });
    arrayRefugio.map( elem=>{
        console.log(elem.location);
        var coordenadas = {
            lat: elem.location.coordinates[0], 
            lng: elem.location.coordinates[1]
        };
        var marker = new google.maps.Marker({
            position: coordenadas,
            map: map
            });
        //mostrarPosicion(elem.location.coordinates);
    })
    
}

const mostrarPosicion = posicion =>{
   let pos = posicion;
   
  
  console.log('pos'+coordenadas.lat)
  mostrarMapa(coordenadas)
}

let showPines = (array) =>{
 
}
const mostrarMapa = (coordenadas) => {
  console.log("mostrar mapa")
  let map = new google.maps.Map($('#map')[0], {
  zoom: 7,
  center: coordenadas
  });
 
}
  showPines(arrayRefugio);


$(document).ready(loadPage);
