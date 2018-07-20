import axios from "axios";
import Amplify from "aws-amplify";

Amplify.configure({
  Storage: {
    bucket: "", //REQUIRED -  Amazon S3 bucket
    region: "XX-XXXX-X" //OPTIONAL -  Amazon service region
  }
});

const api = axios.create({
  baseURL: `http://wfc-pp2-tgs-001.uni.zillow.local:31323/getMetric?`
  // timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
  // transformResponse: [data => JSON.stringify(data.data)]
});

export const GetRegionData = ({ regionType, state, county, city }) => {
  console.log(regionType);
  return new Promise(async resolve => {
    const result = await api.get(
      `regionType=${regionType}&stateName=${state}&countyName=${county}&cityName=${city}`
    );
    resolve(result.data);
  });
};

export const GetMetricData = ({ metricID, regionType, state, county, city }) => {
  return new Promise(async resolve => {
    const result = await api.get(
      `metricID=${metricID}&regionType=${regionType}&stateName=${state}&countyName=${county}&cityName=${city}`
    );
    resolve(result.data);
  });
};
