import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
} from 'react-simple-maps';
import { scaleQuantize } from 'd3-scale';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json';

const USMap = () => {
  // Example data
  const data = [
    { state: 'CA', value: 100 },
    { state: 'TX', value: 200 },
    { state: 'NY', value: 300 },
    // Add more data here
  ];

  const colorScale = scaleQuantize()
    .domain([0, 300]) // Adjust domain based on your data
    .range([
      '#ffedea',
      '#ffcec5',
      '#ffad9f',
      '#ff8a75',
      '#ff5533',
      '#e2492d',
      '#be3d26',
      '#9a311f',
      '#782618',
    ]);

  return (
    <div className="us-map-container">
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const state = data.find((s) => s.state === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={state ? colorScale(state.value) : '#EEE'}
                  stroke="#FFF"
                />
              );
            })
          }
        </Geographies>
        {data.map((state) => (
          <Annotation
            key={state.state}
            subject={state}
            dx={-30}
            dy={-30}
            connectorProps={{
              stroke: '#FF5722',
              strokeWidth: 3,
              strokeLinecap: 'round',
            }}
          >
            <text
              x="-8"
              textAnchor="end"
              alignmentBaseline="middle"
              fill="#F53"
            >
              {state.value}
            </text>
          </Annotation>
        ))}
      </ComposableMap>
    </div>
  );
};

export default USMap;
