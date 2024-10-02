// Initialiser la carte Leaflet
var map = L.map('map').setView([48.8566, 2.3522], 6); // Coordonnées centrées sur la France

// Ajouter la couche de base OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fonction pour charger le GeoJSON et ajouter une couche 3D avec Deck.gl
function add3DLayer(data) {
    const deckLayer = new deck.GeoJsonLayer({
        id: 'geojson-layer',
        data: data, // Les données GeoJSON
        extruded: true, // Active l'extrusion 3D
        filled: true,
        wireframe: true,
        getFillColor: [255, 140, 0, 160], // Couleur de remplissage
        getLineColor: [255, 255, 255], // Couleur des lignes de contour
        getElevation: d => d.properties.population_density * 10, // Extrusion basée sur la densité de population
        getRadius: 100,
        pointRadiusMinPixels: 5,
        pointRadiusScale: 2000,
    });

    // Ajouter la couche Deck.gl à Leaflet
    L.deckGL({
        layers: [deckLayer],
        map
    }).addTo(map);
}

// Charger le fichier GeoJSON contenant les données INSEE
fetch('data.geojson')
    .then(response => response.json())
    .then(data => add3DLayer(data))
    .catch(error => console.error('Erreur lors du chargement des données:', error));
