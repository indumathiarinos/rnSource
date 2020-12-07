import axios from 'axios';
import { fetchData, fetchSuccess, fetchError, } from "./Action";

const actionCreator1 = (url,data,config) => dispatch => {
  return new Promise(() => {
    axios
      .post(url,data,config)
      .then(response => {
        dispatch(fetchSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchError(error));
      });
  });
};

export default actionCreator1;