
// ADD MULTIPLE LAYERS/MAPS
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  'Street View': streets,
  'Satellite/Street View': satelliteStreets
};

// Create the earthquake layer for the map.
let eqs = new L.layerGroup();

// Define the object that contains the overlays.
let overlays = {
    "Earthquakes": eqs 
};

// Create the map object with center, zoom, and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// Earthquake Data URL
let eqData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// getRadius function
function getRadius(mag) {
    if (mag === 0) {
        return 1;
    }
    return mag * 4;
};
// getColor function
function getColor(mag) {
    if (mag > 5) {
        return "#ea2c2c";
    }
    if (mag > 4) {
        return "#ea822c";
    }
    if (mag > 3) {
        return "#ee9c00";
    }
    if (mag > 2) {
        return "#eecc00";
    }
    if (mag > 1) {
        return "#d4ee00";
    }
    return "#98ee00";
}

// Style function
// Make sure to pass object property in getRadius()
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
};


// Grabbing our GeoJSON data
d3.json(eqData).then(function(data) {
//   console.log(data);
  L.geoJSON(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
    },
    // set circleMarker style to styleInfo function.
    style: styleInfo,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(eqs);

  // Then add the earthquake layer to the map.
  eqs.addTo(map);
});

// Create a legend control object.
let legend = L.control({
    position: "bottomright"
});
// Add the details for the legend.
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];
    // Loop through intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
};
legend.addTo(map);




// Add console.log to check to see if our code is working.
console.log("working");