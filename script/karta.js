function initMap() {
  
  var opcijeKarte = {
    center: new google.maps.LatLng(45.809992, 15.978466), 
    zoom: 11,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_CENTER,
      mapTypeIds: ["roadmap", "hybrid"]
    },
    styles: [
      {
          "featureType": "administrative",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#fcfcfc"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#fcfcfc"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#dddddd"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#dddddd"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#eeeeee"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "color": "#dddddd"
              }
          ]
      }
  ]
  };
  
  var map = new google.maps.Map(document.getElementById("map"), opcijeKarte);

  var image = {
    fixni: {
      url: "avd_ikona.png",
      scaledSize: new google.maps.Size(35, 35),
      anchor: new google.maps.Point(25, 50)
    },
    mobilni: {
      url: "kamion_ikona.png",
      scaledSize: new google.maps.Size(50, 50),
      anchor: new google.maps.Point(25, 50)
    },
    more: {
      url: "brod_ikona.png",
      scaledSize: new google.maps.Size(50, 50),
      anchor: new google.maps.Point(25, 50)
    }
  };

  var marker;

  for(var i=0; i<podaci.length; i++){
      marker = new google.maps.Marker({
      position: {lat: podaci[i].sirina, lng: podaci[i].duzina},
      map: map,
      title: podaci[i].ime,  
      icon: image[podaci[i].vrsta],
      adresa: podaci[i].adresa
    });
    marker.setOpacity(1);
    markerGrupa[podaci[i].vrsta].push(marker);
    marker.addListener("click", toggleBounce);
  }

  // GASI MARKER ANIMACIJE KLIKOM NA KARTU
  google.maps.event.addListener(map, 'click', function() {
    gasiSve();
    $(".alert").hide();
    // $(".alert").remove();
  });

  
  // load zupanije iz fajla
  document.getElementById("splitskodalmatinska").addEventListener("click", function(){

    var karta = $.ajax({
      url:"SplitskoDalmatinska.json",
      dataType: "json",
      error: function (xhr) {
        alert(xhr.statusText)
      }
    });

    $.when(karta).done(function() {
      var parsedData = JSON.parse(karta.responseText);
      var polygon = turf.polygon(parsedData["features"][0]["geometry"]["coordinates"][0]);
      var jsonCenter = turf.centerOfMass(polygon);
      var centerPoint = jsonCenter["geometry"]["coordinates"];
      map.setCenter({lat:centerPoint[1], lng:centerPoint[0]}); 
      map.setZoom(8);

      map.data.loadGeoJson("SplitskoDalmatinska.json");
    });
    
  });
 
  // JSON karta pocetak
  map.data.loadGeoJson("Hr.json");
  map.data.setStyle(function(feature) {
    var zupanijaPrisutna = feature.getProperty("zupanija");
    var strokeBoja = "#abacad";

    if (zupanijaPrisutna == "da") {
      strokeBoja = "#26b536";
    }
    
    return {
      strokeColor: strokeBoja,
      strokeWeight: 2,
      strokeOpacity: 1,
      fillOpacity: 0
    } 
  });
  // JSON karta kraj

};



function toggleBounce() {
  gasiSve();
  $(".alert").show();
 
  if (this.getAnimation() === null) {
    this.setAnimation(google.maps.Animation.BOUNCE);
  } else {
    this.setAnimation(null);
  }
}


// function prikazInfo(adresa, kordinate){
//   var infoPolje = document.getElementById("infoPolje");
//   while(infoPolje.firstChild){
//     infoPolje.removeChild(infoPolje.firstChild);
//   }
//   dodajElement("infoPolje", "div", "d-flex justify-content-between", "<h6 class='card-text flex-grow-1'>Adresa:</h6><h6>" +adresa + "</h6>");
//   dodajElement("infoPolje", "div", "d-flex justify-content-between", "<h6 class='card-text flex-grow-1'>Širina:</h6><h6>" +String(kordinate.lat()).substring(0, 9) + "</h6>");
//   dodajElement("infoPolje", "div", "d-flex justify-content-between", "<h6 class='card-text flex-grow-1'>Dužina:</h6><h6>" +String(kordinate.lng()).substring(0, 9) + "</h6>");
// }


function dodajElement(parentId, elementTag, elementKlasa, htmlKod) {
  var parent = document.getElementById(parentId);
  var noviElement = document.createElement(elementTag);
  noviElement.setAttribute("class", elementKlasa);
  noviElement.innerHTML = htmlKod;
  parent.appendChild(noviElement);
}

var aktivnost;

var markerGrupa = {
  fixni: [],
  mobilni: [],
  more: []
};


function gasiSve(){
  for (var prop in markerGrupa) {
        markerGrupa[prop].forEach(function(element){
        element.setAnimation(null);

      });
  }
}

function togglePrikaz(tip){
  for(var i=0; i<markerGrupa[tip].length; i++){
    if(!markerGrupa[tip][i].getVisible()){
      markerGrupa[tip][i].setVisible(true);
    } else {
      markerGrupa[tip][i].setVisible(false);
    }
  }
}

// html objekti
var toggleGumb = document.getElementById("sidebarCollapse");
var sideBar = document.getElementById("sidebar");
var content = document.getElementById("content");
var alert = document.getElementById("box");

toggleGumb.onclick = function(){
    sideBar.classList.toggle("active");
    content.classList.toggle("sidebarOn");
    alert.classList.toggle("on");
};


var prekidaci = document.querySelectorAll(".prekidac");
Array.from(prekidaci).forEach(function (prekidac) {
    prekidac.onclick = function(){
    let dijete = this.childNodes[0];    
    dijete.classList.toggle("fa-toggle-off");
    dijete.classList.toggle("fa-toggle-on");
    }
});

  

