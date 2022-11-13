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
	center: [36.0, -86.2],
  zoomSnap: 0.1,
	zoom: 7.3,
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



// function loadCSVData() {
//   d3.csv("TN_DF_DASH.csv").then(function(data) {
//     data.forEach(function(coord) {
//       console.log(coord)
//       addMarker(coord);
//       addCircle(coord);
//     });
//   });
// };


// loadCSVData();

// d3.csv("data/TN_DF_DASH.csv").then(function(data) {
//     coord = data.filter(function(d) { return d.YR >= '1950' && d.YR < '1960'});
//     console.log(coord);
//     addMarker(coord)
// });


// // // 1950s

d3.csv("Dashboard/data/TN_DF_DASH.csv").then(function(data) {
    var coord = data.filter(function(d) { return d.YR >= '1950' && d.YR < '1960'});
    console.log(coord);
    coord.forEach(function(coord) {
        addMarker(coord);
        addCircle(coord);
  });

  function addMarker(coord) {
    L.polyline([[coord.SLAT, coord.SLON], [coord.ELAT, coord.ELON]], {
      color: getColor(coord.MAG)
    }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
      .addTo(y1950);
  };

  function addCircle(coord) {
    L.circle([coord.SLAT, coord.SLON], {
    color: getColor(coord.MAG),
    fillColor: getColor(coord.MAG),
    fillOpacity: 0.5,
    radius: 500
  }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
    .addTo(y1950);
  };

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
  };
});

y1950.addTo(map);


// // // 1960s

d3.csv("Dashboard/data/TN_DF_DASH.csv").then(function(data) {
    var coord = data.filter(function(d) { return d.YR >= '1960' && d.YR < '1970'});
    console.log(coord);
    coord.forEach(function(coord) {
        addMarker(coord);
        addCircle(coord);
  });

  function addMarker(coord) {
    L.polyline([[coord.SLAT, coord.SLON], [coord.ELAT, coord.ELON]], {
      color: getColor(coord.MAG)
    }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
      .addTo(y1960);
  };

  function addCircle(coord) {
    L.circle([coord.SLAT, coord.SLON], {
    color: getColor(coord.MAG),
    fillColor: getColor(coord.MAG),
    fillOpacity: 0.5,
    radius: 500
  }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
    .addTo(y1960);
  };

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
  };

});

y1960.addTo(map);


// // // 1970s

d3.csv("Dashboard/data/TN_DF_DASH.csv").then(function(data) {
    var coord = data.filter(function(d) { return d.YR >= '1970' && d.YR < '1980'});
    console.log(coord);
    coord.forEach(function(coord) {
        addMarker(coord);
        addCircle(coord);
  });

  function addMarker(coord) {
    L.polyline([[coord.SLAT, coord.SLON], [coord.ELAT, coord.ELON]], {
      color: getColor(coord.MAG)
    }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
      .addTo(y1970);
  };

  function addCircle(coord) {
    L.circle([coord.SLAT, coord.SLON], {
    color: getColor(coord.MAG),
    fillColor: getColor(coord.MAG),
    fillOpacity: 0.5,
    radius: 500
  }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
    .addTo(y1970);
  };

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
  };

});

y1970.addTo(map);


// // // 1980s

d3.csv("Dashboard/data/TN_DF_DASH.csv").then(function(data) {
    var coord = data.filter(function(d) { return d.YR >= '1980' && d.YR < '1990'});
    console.log(coord);
    coord.forEach(function(coord) {
        addMarker(coord);
        addCircle(coord);
  });

  function addMarker(coord) {
    L.polyline([[coord.SLAT, coord.SLON], [coord.ELAT, coord.ELON]], {
      color: getColor(coord.MAG)
    }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
      .addTo(y1980);
  };

  function addCircle(coord) {
    L.circle([coord.SLAT, coord.SLON], {
    color: getColor(coord.MAG),
    fillColor: getColor(coord.MAG),
    fillOpacity: 0.5,
    radius: 500
  }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
    .addTo(y1980);
  };

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
  };

});

y1980.addTo(map);


// // // 1990s

d3.csv("Dashboard/data/TN_DF_DASH.csv").then(function(data) {
    var coord = data.filter(function(d) { return d.YR >= '1990' && d.YR < '2000'});
    console.log(coord);
    coord.forEach(function(coord) {
        addMarker(coord);
        addCircle(coord);
  });

  function addMarker(coord) {
    L.polyline([[coord.SLAT, coord.SLON], [coord.ELAT, coord.ELON]], {
      color: getColor(coord.MAG)
    }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
      .addTo(y1990);
  };

  function addCircle(coord) {
    L.circle([coord.SLAT, coord.SLON], {
    color: getColor(coord.MAG),
    fillColor: getColor(coord.MAG),
    fillOpacity: 0.5,
    radius: 500
  }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
    .addTo(y1990);
  };

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
  };

});

y1990.addTo(map);


// // // 2000-2013

d3.csv("Dashboard/data/TN_DF_DASH.csv").then(function(data) {
    var coord = data.filter(function(d) { return d.YR >= '2000' && d.YR < '2013'});
    console.log(coord);
    coord.forEach(function(coord) {
        addMarker(coord);
        addCircle(coord);
  });

  function addMarker(coord) {
    L.polyline([[coord.SLAT, coord.SLON], [coord.ELAT, coord.ELON]], {
      color: getColor(coord.MAG),
    }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
      .addTo(y2000);
  };

  function addCircle(coord) {
    L.circle([coord.SLAT, coord.SLON], {
    color: getColor(coord.MAG),
    fillColor: getColor(coord.MAG),
    fillOpacity: 0.5,
    radius: 500
  }).bindPopup("<b>FID: " + coord.FID + " </b><br>Date: " + coord.DATE + " | Time: " + coord.TIME + "<hr><font size=2><b>Magnitude:</b> EF" + coord.MAG)
    .addTo(y2000);
  };

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
  };

});

y2000.addTo(map);

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
