import {adaptData} from '../model/adapter-data';

const SERVER_URL = `https://es.dump.academy/pixel-hunter/`;
const PATH_LOAD_DATA = `questions`;
const PATH_RESULTS = `stats`;
const DEFAULT_NAME = `guest`;
const APP_ID = 20090705;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => {
  const data = res.json();
  return data;
};

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/${PATH_LOAD_DATA}`).then(checkStatus).then(toJSON).then(adaptData);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/${PATH_RESULTS}/${APP_ID}-${name}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/${PATH_RESULTS}/${APP_ID}-${name}`, requestSettings).then(checkStatus);
  }
}
