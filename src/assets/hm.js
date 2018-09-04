      import Map from 'ol/Map.js';
      import View from 'ol/View.js';
      import GeoJSON from 'ol/format/GeoJSON.js';
      import {Heatmap as HeatmapLayer, Tile as TileLayer} from 'ol/layer.js';
      import Stamen from 'ol/source/Stamen.js';
      import VectorSource from 'ol/source/Vector.js';
      import req from 'http'
      // fix me
      //TODO load from service
      var dummyobj = {
        "type": "FeatureCollection",
        "name": "Magnitude 5",
        "crs": {
          "type": "name",
          "properties": {
            "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
          }
        },
        "features": [
          {
            "type": "Feature",
            "properties": {
              "Name": "M 5.9 - 2012 Jan 15, SOUTH SHETLAND ISLANDS",
              "description": null
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                450, 630
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "Name": "M 5.9 - 2012 Jan 19, OFF W. COAST OF S. ISLAND, N.Z.",
              "description": null
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                880,500
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "Name": "M 5.9 - 2012 Jan 28, KERMADEC ISLANDS, NEW ZEALAND",
              "description": null
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                1019,829
              ]
            }
          }
        ]
      };
      var blurV = 50;
      var radiusV = 35;

      //



      var vectorSource = new VectorSource({
        features: (new GeoJSON()).readFeatures(dummyobj)
      });
      var vector = new HeatmapLayer({
        source: vectorSource,
        blur: blurV,
        radius: radiusV
      });

      vector.getSource().on('addfeature', function(event) {
        // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
        // standards-violating <magnitude> tag in each Placemark.  We extract it from
        // the Placemark's name instead.
        var name = event.feature.get('name');
        var magnitude = parseFloat(name.substr(2));
        event.feature.set('weight', magnitude - 5);
      });

      var raster = new TileLayer({
        source: new Stamen({
          layer: 'toner'
        })
      });

      export default{
        layers:[raster, vector],
      }
