// Initialiser la carte Leaflet
var map = L.map('map').setView([48.8566, 2.3522], 12); // Coordonnées centrées sur Paris

// Ajouter une couche de tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Charger les données GeoJSON à partir du fichier kepler.gl JSON
const geoJsonData = {
  "type": "FeatureCollection",
  "features": [
    // Vous pouvez copier les features extraites de votre fichier ici
    // Exemple d'un feature simplifié
    {
      "type": "Feature",
      "properties": {
        "Groupe": 351367,
        "Ind": 3
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [[[2.45204, 48.81567], [2.45177, 48.81746], [2.45448, 48.81764], [2.45475, 48.81586], [2.45204, 48.81567]]]
        ]
      }
    }
  ]
};

// Fonction pour créer une couche Deck.gl 3D
function add3DLayer(data) {
  const deckLayer = new deck.GeoJsonLayer({
    id: 'geojson-layer',
    data: data,
    extruded: true,
    filled: true,
    wireframe: true,
    getFillColor: [255, 140, 0, 160], // Couleur de remplissage
    getElevation: d => d.properties.Ind * 100, // Extrusion basée sur la propriété "Ind"
    getLineColor: [255, 255, 255]
  });

  L.deckGL({
    layers: [deckLayer],
    map
  }).addTo(map);
}

// Ajouter les données GeoJSON à la carte
add3DLayer(geoJsonData);
