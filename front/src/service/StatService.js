import {postRequest} from './AJAX';
import {server} from './settings';

export const WordStatService = (orderid, alltime, date1, date2, callback) => {
  const data = {
    orderid: orderid,
    alltime: alltime,
    date1: date1,
    date2: date2,
  };
  const url = server + 'statword/';
  postRequest(url, data, callback);
};
