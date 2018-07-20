import axios from "axios";
import Amplify, { Storage } from "aws-amplify";

const AWS = require("aws-sdk");

const ACCESS_KEY = process.env.REACT_APP_S3_ACCESSKEY;
const SECRET_KEY = process.env.REACT_APP_S3_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY
});

const s3 = new AWS.S3();

const myBucket = "hubble-viz-stage";
const myKey = "zillow_state_zhvi.csv";
const signedUrlExpireSeconds = 60 * 5; // your expiry time in seconds.

// const getGeoURL

const url = s3.getSignedUrl("getObject", {
  Bucket: myBucket,
  Key: myKey,
  Expires: signedUrlExpireSeconds
});

export const Test = () => {
  console.log(url);
  return new Promise(async resolve => {
    axios.get(url).then(result => resolve(result));
  });
};

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
