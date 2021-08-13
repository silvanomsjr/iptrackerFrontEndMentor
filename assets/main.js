const btnEnvia = document.querySelector('.search-btn');
const input = document.querySelector('.search-input');

/* Infos do card */
const ipAdress = document.querySelector(".ip-adress");
const locationInfo = document.querySelector(".location-info");
const timezone = document.querySelector(".timezone");
const ispInfo = document.querySelector(".isp");

var mymap;

var customIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize:     [51, 60], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


function criaMapa(lat,lng){
    if(mymap != undefined){
        mymap.off();
        mymap.remove();
    }
    mymap = L.map('map', { zoomControl: false}).setView([lat, lng], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZHh0eHoiLCJhIjoiY2tzOXIzejR1Mm80NTJwbzR1dHd5ODl5biJ9.i4pmlf8i_3vs3bXOTD-w9w'
    }).addTo(mymap);
    var marker = L.marker([lat, lng], {icon: customIcon}).addTo(mymap);
    
}


async function puxaApi(value){
    const recebe = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_KRrj2TebTAlSw0Lw0STuy6R7t82O8&ipAddress=${value}`);
    const recebeJson = await recebe.json();
    return recebeJson;
}

function changeInfo(json){
    ipAdress.innerHTML = json.ip;
    locationInfo.innerHTML = `${json.location.city}, ${json.location.region}`;
    timezone.innerHTML = `UTC ${json.location.timezone}`;
    ispInfo.innerHTML = json.isp;
}


async function handleFunctions(inputValue){
    const json = await puxaApi(inputValue);
    criaMapa(json.location.lat, json.location.lng);
    changeInfo(json);
}

btnEnvia.addEventListener('click', ()=>{
    if(input.value){
        handleFunctions(input.value);
    }
});

input.addEventListener('keypress', (e)=>{
    if(e.keyCode == 13){
        if(input.value){
            handleFunctions(input.value);
        }
    };
})


window.addEventListener('load', criaMapa(34.04915, -118.09462));