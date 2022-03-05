import {postRequest} from './AJAX';
import {server} from './settings';

export const LoginService = (username, password, checked, callback) => {
  const data = {
    username: username,
    password: password,
    checked: checked,
  };
  const url = server + 'login/';
  postRequest(url, data, callback);
};
export const GetUser = (username, callback) => {
  const data = {
    username: username,
  };
  const url = server + 'getuser/';
  postRequest(url, data, callback);
};
export const RegisterService = (
  username,
  password,
  usertype,
  email,
  callback,
) => {
  const data = {
    username: username,
    password: password,
    usertype: usertype,
    email: email,
  };
  const url = server + 'register/';
  postRequest(url, data, callback);
};
export const NameEditService = (userid, newname, callback) => {
  const data = {
    userid: userid,
    newname: newname,
  };
  console.log(data);
  const url = server + 'nameedit/';
  postRequest(url, data, callback);
};
export const AvatarEditService = (userid, imagedata, imagemime, callback) => {
  const data = {
    userid: userid,
    imagedata: imagedata,
    imagemime: imagemime,
  };
  const url = server + 'avataredit/';
  postRequest(url, data, callback);
};
// export const AvatarGetService = (username, callback) => {
//   const data = {
//     username: username,
//   };
//   const url = server + 'avatarget/';
//   postRequest(url, data, callback);
// };
//
// export const NicknameGetService = (username, callback) => {
//   const data = {
//     username: username,
//   };
//   const url = server + 'nicknameget/';
//   postRequest(url, data, callback);
// };
//
// export const EmailGetService = (username, callback) => {
//   const data = {
//     username: username,
//   };
//   const url = server + 'emailget/';
//   postRequest(url, data, callback);
// };
