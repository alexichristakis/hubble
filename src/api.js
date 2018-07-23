import axios from "axios";

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
// const myKey = "TEST_TEXAS.csv";
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
    axios.get(url).then(result => resolve(result.data));
  });
};
//////////////////

const getRegionDataFilePath = ({ regionType, state, county, city }) => {
  switch (regionType) {
    case 1:
      return `states/${state}/${state}`;
    case 2:
      return `counties/${state}_${county}/${state}_${county}`;
    case 3:
      return `cities/${state}_${county}_${city}/${state}_${county}_${city}`;
    default:
      return "national/";
  }
};

const getRegionMetricFilePath = ({ regionType, state, county, city }) => {
  switch (regionType) {
    case 1:
      return `states/${state}/`;
    case 2:
      return `counties/${state}_${county}/`;
    case 3:
      return `cities/${state}_${county}_${city}/`;
    default:
      return "national/";
  }
};

const getUrlFromKey = key => {
  return s3.getSignedUrl("getObject", {
    Bucket: myBucket,
    Key: key,
    Expires: signedUrlExpireSeconds
  });
};

export const GetRegionData = region => {
  return new Promise(resolve => {
    const filePath = getRegionDataFilePath(region);
    const key = filePath + ".json";
    const url = getUrlFromKey(key);
    console.log("GeoJson request: " + url); 
    axios.get(url).then(result => resolve(result.data));
  });
};

export const GetMetricData = query => {
  return new Promise(resolve => {
    const { region, metric } = query;
    const { state, county, city, regionType } = region;

    let suffix;
    switch (regionType) {
      case 1:
        suffix = state;
        break;
      case 2:
        suffix = county;
        break;
      case 3:
        suffix = city;
        break;
      default:
        suffix = "US";
    }

    const filePath = getRegionMetricFilePath(region);
    const key = filePath + `metric_time_series/${metric}.csv`;
    const url = getUrlFromKey(key);

    axios.get(url).then(result => resolve(result.data));
  });
};

