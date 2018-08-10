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
const signedUrlExpireSeconds = 60 * 5; // expiry time in seconds.

const getRegionDataFilePath = ({ regionType, state, county, city }) => {
  switch (regionType) {
    case 1:
      return `states/${state}/${state}`;
    case 2:
      return `counties/${state}_${county}/${state}_${county}`;
    case 3:
      return `cities/${state}_${county}_${city}/${state}_${county}_${city}`;
    default:
      return `msa/msa_full`;
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
      return `msa/`;
  }
};

const getUrlFromKey = key => {
  return s3.getSignedUrl("getObject", {
    Bucket: myBucket,
    Key: "data/" + key,
    Expires: signedUrlExpireSeconds
  });
};

export const GetAvailableMetrics = path => {
  const filePath = "data/" + path;
  return new Promise(async resolve => {
    const { Contents } = await s3
      .listObjectsV2({
        Bucket: myBucket,
        MaxKeys: 2147483647,
        Prefix: filePath,
        StartAfter: filePath
      })
      .promise();

    let keys = [];
    Contents.forEach(file => {
      let key = file.Key.replace(filePath, "").replace(".csv", "");
      keys.push(key);
    });

    resolve(keys);
  });
};

export const GetRegionData = region => {
  return new Promise((resolve, reject) => {
    const filePath = getRegionDataFilePath(region);

    const regionKey = filePath + ".json";
    const metricsKey = getRegionMetricFilePath(region) + "metric_time_series/";

    const url = getUrlFromKey(regionKey);

    Promise.all([axios.get(url), GetAvailableMetrics(metricsKey)])
      .then(values => {
        resolve({ regionData: values[0].data, availableMetrics: values[1] });
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const GetMetricData = query => {
  return new Promise(resolve => {
    const { region, metric } = query;

    const filePath = getRegionMetricFilePath(region);
    const key = filePath + `metric_time_series/${metric}.csv`;
    const url = getUrlFromKey(key);

    axios.get(url, { responseType: "stream" }).then(result => {
      resolve(result.data);
    });
  });
};
