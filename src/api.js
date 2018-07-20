import axios from "axios";

const API = `http://wfc-pp2-tgs-001.uni.zillow.local:31323/getMetric?`;

export const GetRegionData = ({ regionType, state, county, city }) => {
  return new Promise(async resolve => {
    const result = await axios.get(
      API + `regionType=${regionType}&stateName=${state}&countyName=${county}&cityName=${city}`
    );
    resolve(result);
  });
};
