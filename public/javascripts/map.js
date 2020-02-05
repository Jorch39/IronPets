 const loadPage = ()=>{
  let coordinates = {
    lat : 19.435756,
    lng :  -99.1337437
};
    initMap(coordinates);
   
}

const showPetLocations = (locationArray)=>{

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
        zoom: 17
      });
    
}

$(document).ready(loadPage);
