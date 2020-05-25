let loadPage = ()=>{
    const coordenadas = {
        lat: 19.3436999,
        lng: -99.1557735
    };
      showMap(coordenadas)
  /*   $("#get-location").click(obtainUbitacion);
    show(shelterLocation);
    $("form").submit(search);
    $(document).on ("click", ".seach" , changeLocation);
     */
}

let showMap = coordinates =>{
    const map = new google.maps.Map($('#map')[0],{
        zoom: 14,
        center:coordinates
    });
    const marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        
    })
}

$(document).ready(loadPage);
