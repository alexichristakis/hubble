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
// const myKey = "zillow_state_zhvi.csv";
const myKey = "TEST_TEXAS.csv";
const signedUrlExpireSeconds = 60 * 5; // your expiry time in seconds.

///* TESTING *///
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
//////////////////

const getGeoURL = ({ regionType, state, county, city }) => {
  switch (regionType) {
    case "state":
      console.log("STATE: ", state, county, city);
      return urlFromKey(`states/${state}/poly.json`);
    case "county":
      console.log("COUNTY: ", state, county, city);
      return urlFromKey(`counties/${state}_${county}/poly.json`);
    case "city":
      console.log("CITY: ", state, county, city);
      return urlFromKey(`cities/${state}_${county}_${city}/poly.json`);
  }
};

const getMetricURL = ({ isTimeSeries, regionType, state, county, city }) => {};

const urlFromKey = key => {
  return s3.getSignedUrl("getObject", {
    Bucket: myBucket,
    Key: key,
    Expires: signedUrlExpireSeconds
  });
};

export const GetRegionData = query => {
  return new Promise(resolve => {
    const url = getGeoURL(query);
    axios
      .get(url)
      .then(result => resolve(result.data))
      .catch(error => console.log(error));
  });
};

export const GetMetricData = query => {
  return new Promise(resolve => {
    const url = getMetricURL(query);
    axios.get(url).then(result => resolve(result.data));
  });
};

// export const GetMetricData = ({ metricID, regionType, state, county, city }) => {
//   return new Promise(async resolve => {
//     const result = await api.get(
//       `metricID=${metricID}&regionType=${regionType}&stateName=${state}&countyName=${county}&cityName=${city}`
//     );
//     resolve(result.data);
//   });
// };
