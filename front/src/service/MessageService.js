import {postRequest} from './AJAX';
import {server} from './settings';

export const SendService = (message, callback) => {
  const data = {
    username: 'testu',
    msg: message,
  };
  const url = server + 'sendMsgByApp/';
  postRequest(url, data, callback);
};

export const DiceService = (message, callback) => {
  const data = {
    username: 'testu',
    msg: message,
  };
  console.log('dice');
  const url = server + 'diceByApp/';
  postRequest(url, data, callback);
};
