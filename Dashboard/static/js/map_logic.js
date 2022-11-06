// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// DELIVERABLE 3: 3rd TILE LAYER
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [36.0, -86.7],
	zoom: 7,
	layers: [dark]
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Dark Map": dark,
  "Night Map": night,
  "Light Map": light,  
};

// D1.1. Add a 2nd layer group for the tectonic plate data.
// D2.1. Add a 3rd layer group for the major earthquake data.
let y1950 = new L.LayerGroup();
let y1960 = new L.LayerGroup();
let y1970 = new L.LayerGroup();
let y1980 = new L.LayerGroup();
let y1990 = new L.LayerGroup();
let y2000 = new L.LayerGroup();


// D1.2. Add a reference to the tectonic plates group to the overlays object.
// D2.2. Add a reference to the major earthquake group to the overlays object.
let overlays = {
  "1950-1959": y1950,
  "1960-1969": y1960,
  "1970-1979": y1970,
  "1980-1989": y1980,
  "1990-1999": y1990,
  "2000-2013": y2000,
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// d3.json("Historical_Tornado_Tracks.geojson").then(function(data) {
//   console.log(data);
//   L.geoJSON(data).addTo(map)
// });



function loadCSVData() {
  d3.csv("TN_DF_DASH.csv")
  .then(function(data) {
    data.forEach(function(coord) {
      console.log(coord)
      addMarker(coord);
      addCircle(coord);
    });
  });
};

function addMarker(coord) {
  L.polyline([[coord.SLAT, coord.SLON], [coord.ELAT, coord.ELON]], {
    color: getColor(coord.MAG)
  }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
    .addTo(map);
};

loadCSVData();

function addCircle(coord) {
  L.circle([coord.SLAT, coord.SLON], {
  color: getColor(coord.MAG),
  fillColor: getColor(coord.MAG),
  fillOpacity: 0.5,
  radius: 500
}).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
  .addTo(map);
};

  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColor(magnitude) {
    if (magnitude == 5) {
      return "#de0014";
    }
    if (magnitude == 4) {
      return "#ff9900";
    }
    if (magnitude == 3) {
      return "#eecc00";
    }
    if (magnitude == 2) {
      return "#01b10c";
    }
    if (magnitude == 1) {
      return "#009eff";
    }
    return "#7a30a1";
  }

// // Retrieve the earthquake GeoJSON data.
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

//   // This function returns the style data for each of the earthquakes we plot on
//   // the map. We pass the magnitude of the earthquake into two separate functions
//   // to calculate the color and radius.
//   function styleInfo(feature) {
//     return {
//       opacity: 1,
//       fillOpacity: 0.7,
//       fillColor: getColor(feature.properties.mag),
//       color: "#000000",
//       radius: getRadius(feature.properties.mag),
//       stroke: true,
//       weight: 0.5
//     };
//   }

//   // This function determines the color of the marker based on the magnitude of the earthquake.
//   function getColor(magnitude) {
//     if (magnitude > 5) {
//       return "#ea2c2c";
//     }
//     if (magnitude > 4) {
//       return "#ea822c";
//     }
//     if (magnitude > 3) {
//       return "#ee9c00";
//     }
//     if (magnitude > 2) {
//       return "#eecc00";
//     }
//     if (magnitude > 1) {
//       return "#d4ee00";
//     }
//     return "#98ee00";
//   }

//   // This function determines the radius of the earthquake marker based on its magnitude.
//   // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
//   function getRadius(magnitude) {
//     if (magnitude === 0) {
//       return 1;
//     }
//     return magnitude * 4;
//   }

//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//     	// We turn each feature into a circleMarker on the map.
//     	pointToLayer: function(feature, latlng) {
//       		// console.log(data);
//       		return L.circleMarker(latlng);
//         },
//       // We set the style for each circleMarker using our styleInfo function.
//     style: styleInfo,
//      // We create a popup for each circleMarker to display the magnitude and location of the earthquake
//      //  after the marker has been created and styled.
//      onEachFeature: function(feature, layer) {
//       layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + 
//       "<hr><p>" + new Date(feature.properties.time) + "</p>");
//     }
//   }).addTo(allEarthquakes);
 
//   // Then we add the earthquake layer to our map.
//   allEarthquakes.addTo(map);
// // D2.3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
// let majEqUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"
// d3.json(majEqUrl).then(function(data) {

//   // D2.4. Use the same style as the earthquake data.
//   function styleInfo(feature) {
//     return {
//       opacity: 1,
//       fillOpacity: 0.7,
//       fillColor: getColor(feature.properties.mag),
//       color: "#000000",
//       radius: getRadius(feature.properties.mag),
//       stroke: true,
//       weight: 0.5
//     };
//   }s

//   // D2.5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
//   function getColor(magnitude){
//     if (magnitude > 6) {
//       return "#C1074E";
//     }
//     if (magnitude >= 5) {
//       return "#ea2c2c";
//     }
//     if (magnitude < 5) {
//       return "#ea822c";
//     }
//     return "#000000"
//   }

//   // D2.6. Use the function that determines the radius of the earthquake marker based on its magnitude.
//   function getRadius(magnitude) {
//     if (magnitude < 4.5) {
//       return 1;
//     }
//     return magnitude * 4;
//   }

// // D2.7. Creating a GeoJSON layer with the retrieved data that adds a circle to the map 
// // sets the style of the circle, and displays the magnitude and location of the earthquake
// //  after the marker has been created and styled.
// L.geoJson(data, {
//   pointToLayer: function(feature, latlng) {
//     return L.circleMarker(latlng);
//   },
//   style: styleInfo,
//   onEachFeature: function(feature, layer) {
//     layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place + 
//     "<hr><p>" + new Date(feature.properties.time) + "</p>");
//   }
// }).addTo(majEqs);
// // D2.8. Add the major earthquakes layer to the map.
// majEqs.addTo(map);
// // D2.9. Close the braces and parentheses for the major earthquake data.
// });


// let line = [
//     [36.58, -82.42],
//     [36.48, -82.15]
// ];

// L.polyline(line, {
//     color: "red"
// }).addTo(map);


// var circle = L.circle([36.58, -82.42], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 5000
// }).addTo(map);

// var circle = L.circle([36.48, -82.15], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 5000
// }).addTo(map);

// // // // PLOTTING POINTS WITHOUT GEOJSON
// var points = [{
//     "latitud": 43.526523590087891,
//     "longitud": -5.6150951385498047
// }, {
//     "latitud": 43.511680603027344,
//     "longitud": -5.6671133041381836
// },
// // 
// // More Lat-Lng Points
// // 
// {
//     "latitud": 43.526451110839844,
//     "longitud": -5.6140098571777344
// }];

// for (var i in points) {
// var latlng = L.latLng({ lat: points[i].latitud, lng: points[i].longitud });

// L.marker( latlng ).addTo(map);
// }



  // Here we create a legend control object.
let legend = L.control({
  position: "bottomleft"
});

// Then add all the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#7a30a1",
    "#009eff",
    "#01b10c",
    "#eecc00",
    "#ff9900",
    "#de0014",
  ];

// Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    // console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      "EF" + magnitudes[i] + (magnitudes[i + 1] ? "<br>" : "+");
    }
    return div;
  };

  // Finally, we our legend to the map.
  legend.addTo(map);

//   let tPlateData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
//   // 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
//   d3.json(tPlateData).then(function(data) {
//     console.log(data);
//     L.geoJSON(data, {
//       color: "red",
//       weight: 2
//     })
//     .addTo(tPlates);
//   })
//   tPlates.addTo(map);
// });