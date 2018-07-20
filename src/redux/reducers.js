import keplerGlReducer, { combineUpdaters } from "kepler.gl/reducers";
import Processor from "kepler.gl/processors";
import KeplerGlSchema from "kepler.gl/schemas";

// import {
//   INIT,
//   SET_LOADING_METHOD,
//   LOAD_MAP_SAMPLE_FILE,
//   LOAD_REMOTE_FILE_DATA_SUCCESS,
//   SET_SAMPLE_LOADING_STATUS
// } from "./actions";

const LOAD_REMOTE_FILE_DATA_SUCCESS = "LOAD_DATA_SUCCESS";

// this can be moved into a action and call kepler.gl action
export const loadRemoteFileDataSuccess = (state, action) => {
  console.log("BREAK");
  const datasetId = action.map.id;
  const { dataUrl } = action.map;
  let processorMethod = Processor.processCsvData;

  if (dataUrl.includes(".json") || dataUrl.includes(".geojson")) {
    console.log("JSON!");
    processorMethod = Processor.processGeojson;
  }

  const datasets = {
    info: {
      id: datasetId
    },
    data: processorMethod(action.response)
  };

  const config = KeplerGlSchema.parseSavedConfig(action.config);

  const keplerGlInstance = combineUpdaters.addDataToMapComposed(
    state.keplerGl.map, // "map" is the id of your kepler.gl instance
    {
      payload: {
        datasets,
        config
      }
    }
  );

  return {
    ...state,
    app: {
      ...state.app,
      isMapLoading: false // we turn of the spinner
    },
    keplerGl: {
      ...state.keplerGl, // in case you keep multiple instances
      map: keplerGlInstance
    }
  };
};

const composedUpdaters = {
  [LOAD_REMOTE_FILE_DATA_SUCCESS]: loadRemoteFileDataSuccess
};

const composedReducer = (state, action) => {
  if (composedUpdaters[action.type]) {
    return composedUpdaters[action.type](state, action);
  }
  return keplerGlReducer(state, action);
};

// export default composedReducer;
export default keplerGlReducer;
