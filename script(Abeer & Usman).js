var map;

function initMap() {
    map = L.map('map').setView([30, 70], 4); // Center the map at (30, 70) with zoom level 4 for Pakistan
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add initial markers for Canada, USA, France, and Pakistan
    var canadaMarker = L.marker([56.1304, -106.3468]).bindPopup('Canada').addTo(map);
    var usaMarker = L.marker([37.7749, -122.4194]).bindPopup('USA').addTo(map);
    var franceMarker = L.marker([46.6035, 1.8883]).bindPopup('France').addTo(map);
    var pakistanMarker = L.marker([30.3753, 69.3451]).bindPopup('Pakistan').addTo(map);

    // Create a layer group for clustering
    var markers = L.layerGroup([canadaMarker, usaMarker, franceMarker, pakistanMarker]);

    // Add clustering layer
    var clusterLayer = L.markerClusterGroup();
    clusterLayer.addLayer(markers);
    map.addLayer(clusterLayer);
}

function showMapDialog() {
    var dialog = document.getElementById('mapDialog');
    dialog.style.display = 'block';
}

function showSelectedMap() {
    var dialog = document.getElementById('mapDialog');
    var selectedMap = document.getElementById('mapDropdown').value;

    // Hide the dialog
    dialog.style.display = 'none';

    // Perform specific function based on the selected map type
    if (selectedMap === 'heatmap') {
        performHeatmap();
    } else if (selectedMap === 'choropleth') {
        performChoropleth();
    } else if (selectedMap === 'clustering') {
        performClustering();
    }
}

function performHeatmap() {
    // Add heatmap layer
    var heatLayer = L.heatLayer([
        [56.1304, -106.3468, 1], // Canada
        [37.7749, -122.4194, 1], // USA
        [46.6035, 1.8883, 1],    // France
        [30.3753, 69.3451, 1]     // Pakistan
        // Add more data points as needed
    ]).addTo(map);
}

function performChoropleth() {
    // Add choropleth layer (Example using GeoJSON data)
    var geoJsonData = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-106.3468, 56.1304] // Canada
                },
                properties: {
                    value: 50
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [-122.4194, 37.7749] // USA
                },
                properties: {
                    value: 75
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [1.8883, 46.6035] // France
                },
                properties: {
                    value: 30
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [69.3451, 30.3753] // Pakistan
                },
                properties: {
                    value: 60
                }
            }
            // Add more features as needed
        ]
    };

    L.geoJSON(geoJsonData, {
        style: function(feature) {
            return {
                fillColor: 'green',
                weight: 2,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7
            };
        }
    }).addTo(map);
}

function performClustering() {
    // Add cluster layer
    var clusterLayer = L.markerClusterGroup();
    clusterLayer.addLayer(L.marker([56.1304, -106.3468]).bindPopup('Canada'));
    clusterLayer.addLayer(L.marker([37.7749, -122.4194]).bindPopup('USA'));
    clusterLayer.addLayer(L.marker([46.6035, 1.8883]).bindPopup('France'));
    clusterLayer.addLayer(L.marker([30.3753, 69.3451]).bindPopup('Pakistan'));
    map.addLayer(clusterLayer);
}

// Initialize the map when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    initMap();
});
