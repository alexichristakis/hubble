import Processors from "kepler.gl/processors";
import { csvParseRows } from "d3-dsv";
import { range } from "d3-array";

import _ from "lodash";
import moment from "moment";

import AllMetrics from "./metrics/all-metrics";

const CITY = "locality";
const BOROUGH = "sublocality";
const COUNTY = "administrative_area_level_2";
const STATE = "administrative_area_level_1";

const REGION_TYPE = Object.freeze({ COUNTRY: 0, STATE: 1, COUNTY: 2, CITY: 3 });

export const formatMetricList = availableMetrics => {
  let metrics = [];
  if (availableMetrics.length !== 0) {
    AllMetrics.forEach(category => {
      const { options, label } = category;

      let availableOptions = [];
      options.forEach(option => {
        const found = availableMetrics.find(item => item === option.value);
        if (found !== undefined) availableOptions.push(option);
      });

      metrics.push({ label, options: availableOptions });
    });
  }
  return metrics;
};

export const generateComparision = ({ table1, table2 }) => {
  const SCALE_FACTOR_1 = 1;
  const SCALE_FACTOR_2 = 1;

  // console.log("table1: ", table1);
  // console.log("table2: ", table2);

  const { fields: fields1, rows: rows1 } = table1;
  const { fields: fields2, rows: rows2 } = table2;

  /* generate hashmap for table 1 */
  let map1 = new Map();
  rows1.forEach(row => {
    const region = row[0];
    if (map1.has(region)) map1.set(region, [...map1.get(region), row]);
    else map1.set(region, [row]);
  });

  /* generate hashmap for table 2 */
  let map2 = new Map();
  rows2.forEach(row => {
    const region = row[0];
    if (map2.has(region)) map2.set(region, [...map2.get(region), row]);
    else map2.set(region, [row]);
  });

  /* build new rows */
  let rows = [];
  map1.forEach((rows1, region) => {
    if (map2.has(region)) {
      const rows2 = map2.get(region);
      const len = Math.min(rows1.length, rows2.length);

      let i = 0,
        j = 0;
      while (i < len && j < len) {
        const row1 = rows1[i];
        const row2 = rows2[j];

        if (isNaN(row1[2])) {
          i++;
          continue;
        }
        if (isNaN(row2[2])) {
          j++;
          continue;
        }

        const time1 = new Date(row1[3]).getTime();
        const time2 = new Date(row2[3]).getTime();

        if (time1 === time2) {
          /* we good */
          const newRow = [
            row1[0],
            row1[1],
            (row1[2] * SCALE_FACTOR_1) / (row2[2] * SCALE_FACTOR_2),
            row1[3],
            row1[4],
            row1[5]
          ];
          rows.push(newRow);

          i++;
          j++;
        } else if (time1 < time2) {
          j++;
        } else {
          i++;
        }
      }
    }
  });

  /* build new table */
  let table3 = { fields: _.cloneDeep(fields1), rows: rows };
  table3.fields[2].name = fields1[2].name + " / " + fields2[2].name;
  table3.fields[2].type = "real";
  // console.log(table3);

  return table3;
};

export const buildRegionObject = ({ result, latLng }) => {
  let region = {
    latLng,
    state: "",
    county: "",
    city: "",
    regionType: 0
  };

  const components = result.address_components;
  components.forEach((component, index) => {
    const { types, long_name, short_name } = component;

    if (types.find(type => type === CITY || type === BOROUGH)) {
      region.city = long_name;
      if (index === 0) region.regionType = REGION_TYPE.CITY;
    } else if (types.find(type => type === COUNTY)) {
      region.county = long_name.replace(" County", "");
      if (index === 0) region.regionType = REGION_TYPE.COUNTY;
    } else if (types.find(type => type === STATE)) {
      region.state = short_name;
      if (index === 0) region.regionType = REGION_TYPE.STATE;
    }
  });

  return region;
};

const formatRegionLabel = ({ state, county, city, regionType }) => {
  switch (regionType) {
    case 1:
      return `${state} counties`;
    case 2:
      return `${county} County cities`;
    case 3:
      return `${city} neighborhoods`;
    default:
      return `MSAs in USA`;
  }
};

export const formatMap = ({ config, is3D = false, latLng, regionType }) => {
  const { lat, lng } = latLng;

  let zoom;
  switch (regionType) {
    case 1:
      zoom = 6.2;
      break;
    case 2:
      zoom = 9.5;
      break;
    case 3:
      zoom = 11;
      break;
    default:
      zoom = 3;
      break;
  }

  const mapState = {
    latitude: lat,
    longitude: lng,
    bearing: is3D ? 24 : 0,
    dragRotate: is3D ? true : false,
    pitch: is3D ? 50 : 0,
    isSplit: false,
    zoom
  };

  config.config.mapState = mapState;
};

export const getMetricKey = metricData => {
  if (!_.isEmpty(metricData)) return metricData.fields[2].name;
};

export const formatConfig = ({ config, region, metric }) => {
  const { regionType } = region;

  let metricKey = "";
  let metricType = "";
  if (!_.isEmpty(metric)) {
    metricKey = metric.fields[2].name;
    metricType = metric.fields[2].type;
  }

  let scale;
  switch (regionType) {
    case 0:
      scale = 20;
      break;
    case 1:
      scale = 19;
      break;
    case 2:
      scale = 3;
      break;
    case 3:
      scale = 0.5;
      break;
    default:
      scale = 0.5;
  }

  let metricConfig = config.config.visState.layers[0];

  metricConfig.config.label = metricKey;
  metricConfig.config.visConfig.worldUnitSize = scale;

  metricConfig.visualChannels.colorField.name = metricKey;
  metricConfig.visualChannels.colorField.type = metricType;

  metricConfig.visualChannels.sizeField.name = metricKey;
  metricConfig.visualChannels.sizeField.type = metricType;

  let regionConfig = config.config.visState.layers[1];

  regionConfig.config.label = formatRegionLabel(region);
};

const getSample = ({ fields, allData, sampleCount = 50 }) => {
  const total = Math.min(sampleCount, allData.length);
  const sample = range(0, total, 1).map(d => ({}));

  // collect sample data for each field
  fields.forEach((field, fieldIdx) => {
    // data counter
    let i = 0;
    // sample counter
    let j = 0;

    while (j < total) {
      if (i >= allData.length) {
        // if depleted data pool
        sample[j][field] = null;
        j++;
      } else if (allData[i][fieldIdx] !== null && allData[i][fieldIdx] !== undefined) {
        sample[j][field] = allData[i][fieldIdx];
        j++;
        i++;
      } else {
        i++;
      }
    }
  });

  return sample;
};

export const processMetricData = rawMetricData => {
  const [headerRow, ...rows] = csvParseRows(rawMetricData);

  if (!rows.length || !headerRow) {
    // looks like an empty file
    // resolve null, and catch them later in one place
    return null;
  }

  const sample = getSample({ fields: headerRow, allData: rows });

  const f = Processors.getFieldsFromData(sample, headerRow);
  f.forEach(Processors.parseCsvDataByFieldType.bind(null, rows));

  const newSample = getSample({ fields: headerRow, allData: rows });
  const fields = Processors.getFieldsFromData(newSample, headerRow);

  return { fields, rows };
};
