
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
        let coordenadas = {
            lat: elem.location.coordinates[0], 
            lng: elem.location.coordinates[1]
        };
        let marker = new google.maps.Marker({
            position: coordenadas,
            map: map
            });
    })
    
}


$(document).ready(loadPage);
